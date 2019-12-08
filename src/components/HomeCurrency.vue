<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{ $t("Exchange Rates") }}</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>{{ $t("Currency") }}</th>
              <th>{{ $t("Course") }}</th>
              <th>{{ $t("Date") }}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="cur in rates" :key="cur.currencies_name">
              <td>{{ cur.currencies_name }}</td>
              <td>{{ cur.sell }}</td>
              <td>{{ formatData(cur.exchange_rate_date) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  props: ["rates"],
  date: () => ({}),
  methods: {
    formatData(data) {
      return moment(data)
        .locale(this.$i18n ? this.$i18n.locale : navigator.language)
        .format("DD MMMM YYYY");
    }
  }
};
</script>
