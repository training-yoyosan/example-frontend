<template>
    <router-view />
</template>
<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('user', ['getState'])
  },
  mounted () {
    // get user state
    this.getState()
  }
}
</script>
