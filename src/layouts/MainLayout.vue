<template>
  <div>
    <Loader v-if="loading" />
    <div class="app-main-layout" v-else>
      <Navbar v-model="isOpen" @menu="isOpen = !isOpen" />
      <Sidebar v-model="isOpen" />

      <main class="app-content" :class="{ full: !isOpen }">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn" v-tooltip="'Add new category'">
        <router-link class="btn-floating btn-large blue" to="/record">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Message } from "@/utils/message";

//@ts-ignore
import Navbar from "@/components/app/Navbar";
//@ts-ignore
import Sidebar from "@/components/app/Sidebar";
import Vue from "vue";

export default Vue.extend({
  name: "main-layout",
  data: () => ({
    isOpen: true,
    loading: true
  }),
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch("fetchInfo");
    }
    this.loading = false;
  },
  components: {
    Navbar,
    Sidebar
  },

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
