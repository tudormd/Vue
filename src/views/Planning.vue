<template>
  <div>
    <div class="page-title">
      <h3>{{ $t("Planning") }}</h3>
      <h4>
        {{
          info.bill | currency({ currencies_name: "MDL", lang: $i18n.location })
        }}
      </h4>
    </div>
    <Loader v-if="loading" />
    <p class="center" v-if="!categories.length">
      {{ $t("Not found categories") }},
      <router-link to="/categories">{{ $t("Go to Categories") }}</router-link>
    </p>
    <section v-else>
      <div v-for="cat of categories" :key="cat.id">
        <p>
          <strong>{{ cat.title }}:</strong>
          {{
            cat.spend
              | currency({ currencies_name: "MDL", lang: $i18n.location })
          }}
          {{ $t("of") }} {{ cat.limit | currency({ currencies_name: "MDL" }) }}
        </p>
        <div class="progress" v-tooltip="cat.tooltip">
          <div
            class="determinate"
            :class="[cat.progressColor]"
            :style="{ width: cat.progressPercent + '%' }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import Vue from "vue";
import currency from "@/filters/currency.filter";
export default Vue.extend({
  name: "planing",
  data: () => ({
    loading: true,
    categories: []
  }),

  computed: {
    ...mapGetters(["info"])
  },
  async mounted() {
    const records = (await this.$store.dispatch("getRecords")) as {
      title: string;
      limit: number;
      categoryId: string;
      ammount: number;
      type: string;
    }[];
    const categories = await this.$store.dispatch("getCategories");

    this.categories = categories.map(
      (category: { title: string; limit: number; id: string }) => {
        const spend = records
          .filter(record => record.categoryId === category.id)
          .filter(e => e.type === "outcome")
          .reduce((ac, cv) => ac + +cv.ammount, 0);

        const percent = (100 * spend) / category.limit;
        const progressPercent = percent > 100 ? 100 : percent;
        const progressColor =
          percent < 60 ? "green" : percent < 100 ? "yellow " : "red";
        const tooltipValue = category.limit - spend;
        const tooltip = `${
          tooltipValue < 100 ? this.$t("exceeded") : this.$t("remained")
        } ${currency(Math.abs(tooltipValue), { currencies_name: "MDL" })} `;

        return { ...category, progressPercent, progressColor, spend, tooltip };
      }
    );
    this.loading = false;
  }
});
</script>
