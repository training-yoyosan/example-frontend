<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions("user", ["getState"])
  },
  mounted() {
    // get user state
    this.getState();
  }
};
// window.csrfToken = document.querySelector('meta[name="csrf-token"]').content;
</script>
