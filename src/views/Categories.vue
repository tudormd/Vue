<template>
  <div>
    <div class="page-title">
      <h3>{{ $t("Categories") }}</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div class="row" v-else>
        <CategoryCreate @created="addNewCategory" />

        <CategoryEdit
          v-if="categories.length"
          :categories="categories"
          :key="categories.length + updatedCount"
          @updated="updatedCategories"
        />
        <p v-else class="center">{{ $t("Not found categories") }}</p>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
// @ts-ignore
import CategoryCreate from "@/components/CategoryCreate";
// @ts-ignore
import CategoryEdit from "@/components/CategoryEdit";

export default Vue.extend({
  name: "categries",
  data: () => ({
    categories: [] as { title: string; limit: number; id: string }[],
    loading: true,
    updatedCount: 0
  }),
  async mounted() {
    this.categories = await this.$store.dispatch("getCategories");
    this.loading = false;
  },
  components: {
    CategoryCreate,
    CategoryEdit
  },
  methods: {
    addNewCategory(category: { title: string; limit: number; id: string }) {
      this.categories.push(category);
    },
    updatedCategories(category: { title: string; limit: number; id: string }) {
      const index = this.categories.findIndex(c => (c.id = category.id));
      this.categories[index].title = category.title;
      this.categories[index].limit = category.limit;
      this.updatedCount++;
    }
  }
});
</script>
