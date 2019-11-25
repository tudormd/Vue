<template>
  <div class="app-main-layout">
    <Navbar v-model="isOpen" @menu="isOpen = !isOpen" />
    <Sidebar v-model="isOpen" />

    <main class="app-content" :class="{ full: !isOpen }">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue" to="/record">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
//@ts-ignore
import Navbar from "@/components/app/Navbar";
//@ts-ignore
import Sidebar from "@/components/app/Sidebar";
import Vue from "vue";
export default Vue.extend({
  name: "main-layout",
  data: () => ({
    isOpen: true
  }),
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch("fetchInfo");
    }
  },
  components: {
    Navbar,
    Sidebar
  }
});
</script>
