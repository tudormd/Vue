<template>
  <ul class="sidenav app-sidenav" :class="{ open: value }">
    <router-link
      v-for="link in links"
      :key="link.url"
      tag="li"
      active-class="active"
      :to="link.url"
      :exact="link.exact"
    >
      <a href="#">{{ $t(link.name) }}</a>
    </router-link>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["value"],
  data: () => ({
    links: [
      { name: "Bill", url: "/", exact: true },
      { name: "History", url: "/history" },
      { name: "Planning", url: "/planning" },
      { name: "New entry", url: "/record" },
      { name: "Categories", url: "/categories" }
    ]
  })
});
</script>
