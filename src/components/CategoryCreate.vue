<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ $t("Create") }}</h4>
      </div>

      <form @submit.prevent="submit">
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{ invalid: $v.title.$dirty && !$v.title.required }"
          />
          <label for="name">{{ $t("Title") }}</label>
          <span
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid"
            >{{ $t("Enter the title") }}</span
          >
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{ invalid: $v.limit.$dirty && !$v.limit.minValue }"
          />
          <label for="limit">{{ $t("Limit") }}</label>
          <span
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            class="helper-text invalid"
            >{{ $t("Minimum value") }} {{ $v.limit.$params.minValue.min }}</span
          >
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{ $t("Create") }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { required, minValue } from "vuelidate/lib/validators";
import M from "materialize-css";
import Vue from "vue";

export default Vue.extend({
  data: () => ({
    title: "",
    limit: 100
  }),

  validations: {
    title: { required },
    limit: { minValue: minValue(100) }
  },

  mounted() {
    M.updateTextFields();
  },

  methods: {
    async submit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        const category = await this.$store.dispatch("createCategory", {
          title: this.title,
          limit: this.limit
        });
        (this.title = ""), (this.limit = 100);
        this.$v.$reset();
        // @ts-ignore
        this.$message(this.$t("Category created"));
        this.$emit("created", category);
      } catch (error) {
        throw error;
      }
    }
  }
});
</script>
