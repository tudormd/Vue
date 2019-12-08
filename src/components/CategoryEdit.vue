<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ $t("Edit") }}</h4>
      </div>

      <form @submit.prevent="submit">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option
              v-for="category of categories"
              :key="category.id"
              :value="category.id"
              >{{ category.title }}</option
            >
          </select>
          <label>{{ $t("Select a category") }}</label>
        </div>

        <div class="input-field">
          <input
            type="text"
            id="name"
            v-model="name"
            :class="{ invalid: $v.name.$dirty && !$v.name.required }"
          />
          <label for="name">{{ $t("Title") }}</label>
          <span
            v-if="$v.name.$dirty && !$v.name.required"
            class="helper-text invalid"
            >{{ $t("Title is required") }}</span
          >
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model="limit"
            :class="{ invalid: $v.limit.$dirty && !$v.limit.minValue }"
          />
          <label for="limit">{{ $t("Limit") }}</label>
          <span
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            class="helper-text invalid"
          >
            {{ $t("Minimum limit is") }}
            {{ $v.limit.$params.minValue.min }},
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{ $t("Refresh") }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { required, minValue } from "vuelidate/lib/validators";
import Vue from "vue";
import M from "materialize-css";
import { mapGetters } from "vuex";

export default Vue.extend({
  name: "edit-category",

  props: {
    categories: {
      required: true,
      default: () => [] as { id: string; title: string; limit: number }[]
    }
  },
  computed: {
    ...mapGetters(["info"])
  },
  data: () => ({
    select: {},
    name: "",
    limit: 100,
    current: ""
  }),

  validations: {
    name: { required },
    limit: { minValue: minValue(100) }
  },

  watch: {
    current(categoryId: string) {
      const { title, limit } = this.categories.find(
        c => c.id === categoryId
      ) as { id: string; title: string; limit: number };
      (this.name = title), (this.limit = limit);
    }
  },

  created() {
    const { id, title, limit } = this.categories[0];
    this.current = id;
    (this.name = title), (this.limit = limit);
  },

  mounted() {
    this.select = M.FormSelect.init(this.$refs.select as Element);
    setTimeout(() => {
      M.updateTextFields();
    });
  },

  destroyed() {
    if (this.select && (this.select as { destroy: () => undefined }).destroy) {
      (this.select as { destroy: () => undefined }).destroy();
    }
  },

  methods: {
    async submit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      if (this.limit <= this.info.bill) {
        try {
          await this.$store.dispatch("updateCategory", {
            id: this.current,
            title: this.name,
            limit: this.limit
          });
          // @ts-ignore
          this.$message(this.$t("Category updated"));
          setTimeout(() => {
            M.updateTextFields();
          });
          this.$emit("updated", {
            id: this.current,
            title: this.name,
            limit: this.limit
          });
        } catch (error) {
          throw error;
        }
      } else {
        // @ts-ignore
        this.$message(
          this.$t("Insufficient means in your  account, your bill") +
            " - " +
            this.info.bill
        );
      }
    }
  }
});
</script>
