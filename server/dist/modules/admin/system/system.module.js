"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const admin_constants_1 = require("../admin.constants");
const sys_department_entity_1 = require("../../../entities/admin/sys-department.entity");
const sys_login_log_entity_1 = require("../../../entities/admin/sys-login-log.entity");
const sys_menu_entity_1 = require("../../../entities/admin/sys-menu.entity");
const sys_role_department_entity_1 = require("../../../entities/admin/sys-role-department.entity");
const sys_role_menu_entity_1 = require("../../../entities/admin/sys-role-menu.entity");
const sys_role_entity_1 = require("../../../entities/admin/sys-role.entity");
const sys_task_log_entity_1 = require("../../../entities/admin/sys-task-log.entity");
const sys_task_entity_1 = require("../../../entities/admin/sys-task.entity");
const sys_user_role_entity_1 = require("../../../entities/admin/sys-user-role.entity");
const sys_user_entity_1 = require("../../../entities/admin/sys-user.entity");
const root_role_id_provider_1 = require("../core/provider/root-role-id.provider");
const dept_controller_1 = require("./dept/dept.controller");
const dept_service_1 = require("./dept/dept.service");
const log_controller_1 = require("./log/log.controller");
const log_service_1 = require("./log/log.service");
const menu_controller_1 = require("./menu/menu.controller");
const menu_service_1 = require("./menu/menu.service");
const role_controller_1 = require("./role/role.controller");
const role_service_1 = require("./role/role.service");
const user_controller_1 = require("./user/user.controller");
const user_service_1 = require("./user/user.service");
const bull_1 = require("@nestjs/bull");
const task_controller_1 = require("./task/task.controller");
const task_service_1 = require("./task/task.service");
const config_1 = require("@nestjs/config");
const task_processor_1 = require("./task/task.processor");
const online_controller_1 = require("./online/online.controller");
const online_service_1 = require("./online/online.service");
const ws_module_1 = require("../../ws/ws.module");
const sys_config_entity_1 = require("../../../entities/admin/sys-config.entity");
const param_config_controller_1 = require("./param-config/param-config.controller");
const param_config_service_1 = require("./param-config/param-config.service");
const serve_controller_1 = require("./serve/serve.controller");
const serve_service_1 = require("./serve/serve.service");
let SystemModule = class SystemModule {
};
SystemModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                sys_user_entity_1.default,
                sys_department_entity_1.default,
                sys_user_role_entity_1.default,
                sys_menu_entity_1.default,
                sys_role_menu_entity_1.default,
                sys_role_entity_1.default,
                sys_role_department_entity_1.default,
                sys_user_role_entity_1.default,
                sys_login_log_entity_1.default,
                sys_task_entity_1.default,
                sys_task_log_entity_1.default,
                sys_config_entity_1.default,
            ]),
            bull_1.BullModule.registerQueueAsync({
                name: admin_constants_1.SYS_TASK_QUEUE_NAME,
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    redis: {
                        host: configService.get('redis.host'),
                        port: configService.get('redis.port'),
                        password: configService.get('redis.password'),
                        db: configService.get('redis.db'),
                    },
                    prefix: admin_constants_1.SYS_TASK_QUEUE_PREFIX,
                }),
                inject: [config_1.ConfigService],
            }),
            ws_module_1.WSModule,
        ],
        controllers: [
            user_controller_1.SysUserController,
            role_controller_1.SysRoleController,
            menu_controller_1.SysMenuController,
            dept_controller_1.SysDeptController,
            log_controller_1.SysLogController,
            task_controller_1.SysTaskController,
            online_controller_1.SysOnlineController,
            param_config_controller_1.SysParamConfigController,
            serve_controller_1.SysServeController,
        ],
        providers: [
            (0, root_role_id_provider_1.rootRoleIdProvider)(),
            user_service_1.SysUserService,
            role_service_1.SysRoleService,
            menu_service_1.SysMenuService,
            dept_service_1.SysDeptService,
            log_service_1.SysLogService,
            task_service_1.SysTaskService,
            task_processor_1.SysTaskConsumer,
            online_service_1.SysOnlineService,
            param_config_service_1.SysParamConfigService,
            serve_service_1.SysServeService,
        ],
        exports: [
            admin_constants_1.ROOT_ROLE_ID,
            typeorm_1.TypeOrmModule,
            user_service_1.SysUserService,
            menu_service_1.SysMenuService,
            log_service_1.SysLogService,
            online_service_1.SysOnlineService,
        ],
    })
], SystemModule);
exports.SystemModule = SystemModule;
//# sourceMappingURL=system.module.js.map