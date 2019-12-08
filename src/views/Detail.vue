<template>
  <div>
    <Loader v-if="loading" />
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <a href="/history" class="breadcrumb">{{ $t("History") }}</a>
        <a @click.prevent class="breadcrumb">{{ $t(record.type) }}</a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
            class="card"
            :class="[record.type === 'income' ? 'green' : 'red']"
          >
            <div class="card-content white-text">
              <p>{{ $t("Description") }}: {{ record.description }}</p>
              <p>
                {{ $t("Amount") }}:
                {{
                  record.ammount
                    | currency({ currencies_name: "MDL", lang: $i18n.locale })
                }}
              </p>
              <p>{{ $t("Category") }}: {{ record.categoryName }}</p>
              <small>{{ formatData(record.data) }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>
      {{ $t("Not found this record id") }} {{ route.params.id }}
    </p>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import moment from "moment";

export default Vue.extend({
  name: "detail",
  data: () => ({
    record: null,
    loading: true
  }),
  async mounted() {
    const record = await this.$store.dispatch(
      "getRecordById",
      this.$route.params.id
    );
    const category = await this.$store.dispatch(
      "getCategoryById",
      record.categoryId
    );
    this.record = { ...record, categoryName: category.title };
    this.loading = false;
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
