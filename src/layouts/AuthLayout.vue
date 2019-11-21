<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script lang="ts">
//@ts-ignore
import { Message } from "@/utils/message";
import Vue from "vue";

export default Vue.extend({
  computed: {
    error() {
      return this.$store.getters.error;
    }
  },
  watch: {
    error(fBerror) {
      //@ts-ignore
      this.$message(Message[fBerror.code] || fBerror.message);
    }
  }
});
</script>
