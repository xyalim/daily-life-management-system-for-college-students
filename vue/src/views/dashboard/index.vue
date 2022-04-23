<template>
  <div class="dashboard-container">{{ content }}</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { ref, onMounted } from '@vue/composition-api'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['name'])
  },
  setup(props, ctx) {
    console.log(props, ctx)
    const content = ref('this is  admin')

    onMounted((props, ctx) => {
      console.log(props, ctx)
      content.value = 123
    })
    return { content }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  margin: 20px;
  h4,
  h5 {
    img {
      margin-left: 10px;
      vertical-align: middle;
    }
  }
}
</style>
