<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>{{ $t("Amount") }}</th>
        <th>{{ $t("Date") }}</th>
        <th>{{ $t("Category") }}</th>
        <th>{{ $t("Type") }}</th>
        <th>{{ $t("Open") }}</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(record, idx) of records" :key="record.id">
        <td>{{ idx + 1 }}</td>
        <td>{{ record.ammount | currency({ currencies_name: "MDL" }) }}</td>
        <td>{{ formatData(record.data) }}</td>
        <td>{{ record.categoryName }}</td>
        <td>
          <span class="white-text badge" :class="[record.typeClass]">{{
            $t(record.typeText)
          }}</span>
        </td>
        <td>
          <button
            v-tooltip="'Show record'"
            class="btn-small btn"
            @click="$router.push('/detail/' + record.id)"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from "vue";
import moment from "moment";

export default Vue.extend({
  name: "HistoryTable",
  props: {
    records: {
      required: true
    }
  },
  methods: {
    formatData(data: string) {
      return moment(data)
        .locale(this.$i18n ? this.$i18n.locale : navigator.language)
        .format("DD MMMM YYYY");
    }
  }
});
</script>
