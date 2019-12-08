<template>
  <div>
    <div class="page-title">
      <h3>{{ $t("Entry History") }}</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>
    <Loader v-if="loading" />
    <p class="center" v-else-if="!records.length">
      {{ $t("Not found entry") }},
      <router-link to="/record">{{ $t("Go to Entry") }}</router-link>
    </p>
    <section v-else>
      <HistoryTable :records="items" />
      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="changePage"
        :prev-text="$t('Prev')"
        :next-text="$t('Next')"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script lang="ts">
import { Pie } from "vue-chartjs";
//@ts-ignore
import HistoryTable from "@/components/HistoryTable";
import paginationMixin from "@/mixins/pagination.mixin";
import Vue from "vue";

export default Vue.extend({
  name: "history",
  extends: Pie,
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: [] as {
      title: string;
      limit: number;
      categoryId: string;
      ammount: number;
      type: string;
    }[]
  }),
  async mounted() {
    this.records = (await this.$store.dispatch("getRecords")) as {
      title: string;
      limit: number;
      categoryId: string;
      ammount: number;
      type: string;
    }[];

    const categories = await this.$store.dispatch("getCategories");
    this.setup(categories);
    this.loading = false;
  },

  methods: {
    setup(categories: any[]) {
      //@ts-ignore
      this.setupPagination(
        this.records.map(record => ({
          ...record,
          categoryName: (categories.find(
            (category: any) => category.id === record.categoryId
          ) as {
            title: string;
            limit: number;
            id: string;
          }).title,
          typeClass: record.type === "income" ? "green" : "red",
          typeText: record.type
        }))
      );
      //@ts-ignore
      this.renderChart({
        labels: categories.map(category => category.title),
        datasets: [
          {
            data: categories.map((category, i) => {
              return this.records.reduce((ac, cv) => {
                if (cv.categoryId === category.id && cv.type === "outcome") {
                  ac += +cv.ammount;
                }
                return ac;
              }, 0);
            }),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      });
    }
  },
  components: {
    HistoryTable
  }
});
</script>
