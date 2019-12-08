<template>
  <div>
    <div class="page-title">
      <h3>{{ $t("Bill") }}</h3>
      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <Loader v-if="loading" />
    <div v-else class="row">
      <HomeBill :rates="currency" />
      <HomeCurrency :rates="currency" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
//@ts-ignore
import HomeBill from "@/components/HomeBill";
//@ts-ignore
import HomeCurrency from "@/components/HomeCurrency";
export default Vue.extend({
  name: "home",
  data: () => ({
    loading: true,
    currency: null
  }),

  async mounted() {
    this.currency = await this.$store.dispatch("fetchCurrency");
    this.loading = false;
  },
  methods: {
    async refresh() {
      this.loading = true;
      this.currency = await this.$store.dispatch("fetchCurrency");
      this.loading = false;
    }
  },
  components: {
    HomeBill,
    HomeCurrency
  }
});
</script>
