<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">{{ $t("Currency Account") }}</span>
        <p
          v-for="cur of rates"
          :key="cur.currencies_name"
          class="currency-line"
        >
          <span>{{ getCurrency(cur.sell) | currency(cur, $i18n.locale) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["rates"],
  computed: {
    base() {
      return this.$store.getters.info.bill;
    }
  },
  methods: {
    getCurrency(ammount) {
      return Math.floor(this.base / ammount);
    }
  }
};
</script>
