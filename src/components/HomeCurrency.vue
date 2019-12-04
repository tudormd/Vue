<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Курс валют</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Валюта</th>
              <th>Курс</th>
              <th>Дата</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="cur in rates" :key="cur">
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
  methods: {
    formatData(data) {
      return moment(data)
        .locale(navigator.language)
        .format("DD MMMM YYYY");
    }
  }
};
</script>
