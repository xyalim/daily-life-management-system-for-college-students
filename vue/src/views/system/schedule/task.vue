<template>
  <div class="sys-schedule-task-container">
    <table-layout>
      <s-table
        ref="taskTable"
        :data-request="getTaskList"
        show-pagination
        row-key="id"
        :border="false"
      >
        <template v-slot:prepend>
          <el-button
            size="mini"
            type="primary"
            :disabled="!$auth('sys.task.add')"
            @click="handleAdd"
          >新增</el-button>
        </template>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" class="task-detail-table-expand">
              <el-form-item label="任务编号">
                <span># {{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="执行次数">
                <span>{{
                  props.row.limit > 0
                    ? `仅 ${props.row.limit} 次`
                    : '无次数限制'
                }}</span>
              </el-form-item>
              <el-form-item v-if="props.row.type === 1" label="执行间隔">
                <span>每 {{ props.row.every }} 毫秒执行一次</span>
              </el-form-item>
              <el-form-item v-else label="Cron表达式">
                <el-tooltip content="秒 分 小时 日期 月份 星期 年(可选)">
                  <span>{{ props.row.cron }}</span>
                </el-tooltip>
              </el-form-item>
              <el-form-item v-if="props.row.type === 0" label="执行时间段">
                <span>{{ parseExecTime(props.row) }}</span>
              </el-form-item>
              <el-form-item label="执行操作">
                <warning-confirm-button
                  :closed="handleRefresh"
                  content="确认手动执行一次该任务吗"
                  :disabled="!$auth('sys.task.once')"
                  @confirm="
                    o => {
                      handleOnce(props.row, o)
                    }
                  "
                ><i class="el-icon-magic-stick op-m-5" />仅一次</warning-confirm-button>
                <warning-confirm-button
                  :closed="handleRefresh"
                  content="确认运行该任务吗"
                  :disabled="!$auth('sys.task.start') || !(props.row.status === 0)"
                  @confirm="
                    o => {
                      handleStart(props.row, o)
                    }
                  "
                ><i class="el-icon-caret-right op-m-5" />运行</warning-confirm-button>
                <warning-confirm-button
                  :closed="handleRefresh"
                  content="确认停止该任务吗"
                  :disabled="!$auth('sys.task.stop') || !(props.row.status === 1)"
                  @confirm="
                    o => {
                      handleStop(props.row, o)
                    }
                  "
                ><i class="el-icon-switch-button op-m-5" />停止</warning-confirm-button>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          show-overflow-tooltip
          label="任务名称"
          align="center"
          width="240"
        />
        <el-table-column prop="status" label="状态" width="120" align="center">
          <template slot-scope="scope">
            <span class="badge-status">
              <span
                :class="{ dot: true, processing: scope.row.status === 1 }"
                :style="{
                  '--color': getStatusColor(scope.row.status)
                }"
              />
              <span class="tip">{{ getStatusInfo(scope.row.status) }}</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型" width="100" align="center">
          <template slot-scope="scope">
            <el-tag type="small" effect="light">{{
              scope.row.type === 1 ? 'Interval' : 'Cron'
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="service"
          show-overflow-tooltip
          label="调用服务"
          width="350"
          align="center"
        />
        <el-table-column
          prop="data"
          show-overflow-tooltip
          label="执行参数"
          width="450"
          align="center"
        />
        <el-table-column
          prop="remark"
          show-overflow-tooltip
          label="备注"
          width="250"
          align="center"
        />
        <el-table-column label="操作" width="150" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              :disabled="!$auth('sys.task.update')"
              @click="handleEdit(scope.row)"
            >编辑</el-button>
            <warning-confirm-button
              :closed="handleRefresh"
              :disabled="!$auth('sys.task.delete')"
              @confirm="
                o => {
                  handleDelete(scope.row, o)
                }
              "
            >删除</warning-confirm-button>
          </template>
        </el-table-column>
      </s-table>
    </table-layout>
    <system-schedule-task-form-dialog ref="taskFormDialog" @save-success="handleRefresh" />
  </div>
</template>

<script>
import SystemScheduleTaskFormDialog from './components/task-form-dialog'
import TableLayout from '@/layout/components/TableLayout'
import WarningConfirmButton from '@/components/WarningConfirmButton'
import STable from '@/components/Table'

export default {
  name: 'SystemScheduleTask',
  components: {
    TableLayout,
    STable,
    WarningConfirmButton,
    SystemScheduleTaskFormDialog
  },
  methods: {
    async getTaskList({ page, limit }) {
      const { data } = await this.$api.sys.task.page({ page, limit })
      return data
    },
    handleRefresh() {
      this.$refs.taskTable.refresh()
    },
    handleAdd() {
      this.$refs.taskFormDialog.open()
    },
    handleEdit(row) {
      this.$refs.taskFormDialog.open(row.id)
    },
    async handleDelete(row, { done, close }) {
      try {
        await this.$api.sys.task.delete({ id: row.id })
        close()
      } catch {
        done()
      }
    },
    async handleOnce(row, { done, close }) {
      try {
        await this.$api.sys.task.once({ id: row.id })
        close()
      } catch {
        done()
      }
    },
    async handleStart(row, { done, close }) {
      try {
        await this.$api.sys.task.start({ id: row.id })
        close()
      } catch {
        done()
      }
    },
    async handleStop(row, { done, close }) {
      try {
        await this.$api.sys.task.stop({ id: row.id })
        close()
      } catch {
        done()
      }
    },
    getStatusInfo(status) {
      switch (status) {
        case 0:
          return '停止'
        case 1:
          return '运行'
      }
    },
    getStatusColor(status) {
      switch (status) {
        case 0:
          return '#d9d9d9'
        case 1:
          return '#52c41a'
      }
    },
    parseExecTime(row) {
      if (!row.startTime && !row.endTime) {
        return '无时段限制'
      }
      if (!row.startTime && row.endTime) {
        return `无开始时间限制 - ${row.endTime}`
      }
      if (row.startTime && !row.endTime) {
        return `${row.startTime} - 长期有效`
      }
      return `${row.startTime} - ${row.endTime}`
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes DotStatusProcessing {
  0% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  100% {
    transform: scale(2.4);
    opacity: 0;
  }
}

.sys-schedule-task-container {
  .task-detail-table-expand {
    padding-left: 40px;

    .op-m-5 {
      margin-left: 5px;
      margin-right: 5px;
    }
  }

  .badge-status {
    position: relative;
    line-height: inherit;
    vertical-align: baseline;
    display: inline-block;

    .dot {
      top: -1px;
      display: inline-block;
      width: 6px;
      height: 6px;
      vertical-align: middle;
      border-radius: 50%;
      background-color: #{'var(--color)'};
    }

    .processing {
      position: relative;
      background-color: #{'var(--color)'};

      &::after {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 1px solid #{'var(--color)'};
        border-radius: 50%;
        animation: DotStatusProcessing 1.2s infinite ease-in-out;
        content: '';
      }
    }

    .tip {
      margin-left: 6px;
    }
  }
}
</style>

<style lang="scss">
.sys-schedule-task-container {
  .task-detail-table-expand {
    label {
      width: 90px;
      color: #99a9bf;
    }
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
</style>
