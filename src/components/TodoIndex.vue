<template>
  <div class="container">
    <TodoHeader />
    <TodoContents />
    <TodoFooter />
  </div> 
</template>

<script>
import TodoHeader from '~/components/TodoHeader.vue'
import TodoContents from '~/components/TodoContents.vue'
import TodoFooter from '~/components/TodoFooter.vue'

export default {
  components: {
      TodoHeader,
      TodoContents,
      TodoFooter
  }
}
</script>

<style lang="scss">
.container{
  background-color:#e07990;  
}
</style>