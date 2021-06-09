<template>
  <compnent :is="componentAtual"/>
</template>

<script>

import Postman from './components/Postman.vue'

export default {
  
  name: 'App',

  data(){
    return {
      componentAtual:"Postman"
    }
  },

  components: {
    Postman
  }

}
</script>

