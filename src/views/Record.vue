<template>
  <div>
    <div class="page-title">
      <h3>{{ $t("New entry") }}</h3>
    </div>
    <Loader v-if="loading" />
    <p class="center" v-else-if="!categories.length">
      {{ $t("Not found entry") }}
      <router-link to="/record">{{ $t("Go to Entry") }}</router-link>
    </p>

    <form class="form" v-else @submit.prevent="submit">
      <div class="input-field">
        <select ref="select" v-model="category">
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
            >{{ category.title }}</option
          >
        </select>
        <label>{{ $t("Select a category") }}</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            v-model="type"
            value="income"
          />
          <span>{{ $t("income") }}</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>{{ $t("outcome") }}</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="ammount"
          :class="{ invalid: $v.ammount.$dirty && !$v.ammount.minValue }"
        />
        <label for="amount">{{ $t("Amount") }}</label>
        <span
          v-if="$v.ammount.$dirty && !$v.ammount.minValue"
          class="helper-text invalid"
          >{{ $t("Minimum value") }} {{ $v.ammount.$params.minValue.min }}</span
        >
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{
            invalid: $v.description.$dirty && !$v.description.required
          }"
        />
        <label for="description">{{ $t("Description") }}</label>
        <span
          v-if="$v.description.$dirty && !$v.description.required"
          class="helper-text invalid"
          >{{ $t("Enter the title") }}</span
        >
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ $t("Create") }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { required, minValue } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";

import M from "materialize-css";
import Vue from "vue";

export default Vue.extend({
  name: "record",
  data: () => ({
    loading: true,
    categories: [] as { title: string; limit: number; id: string }[],
    select: {},
    category: "",
    type: "outcome",
    ammount: 1,
    description: ""
  }),
  validations: {
    ammount: { minValue: minValue(1) },
    description: { required }
  },
  async mounted() {
    this.categories = (await this.$store.dispatch("getCategories")) as {
      title: string;
      limit: number;
      id: string;
    }[];
    this.loading = false;
    if (this.categories.length) {
      this.category = this.categories[0].id;
    }
    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select as Element);
      M.updateTextFields();
    }, 0);
  },

  destroyed() {
    if (this.select && (this.select as { destroy: () => undefined }).destroy) {
      (this.select as { destroy: () => undefined }).destroy();
    }
  },

  computed: {
    ...mapGetters(["info"]),
    canCreateRecord() {
      if (this.type === "income") {
        return true;
      }
      //@ts-ignore
      return this.info.bill >= this.ammount;
    }
  },

  methods: {
    async submit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch("createRecord", {
            categoryId: this.category,
            ammount: this.ammount,
            description: this.description,
            type: this.type,
            data: new Date().toJSON()
          });

          // @ts-ignore
          const bill =
            this.type === "income"
              ? this.info.bill + this.ammount
              : this.info.bill - this.ammount;
          await this.$store.dispatch("updateInfo", { bill });
          // @ts-ignore
          this.$message("Rercord succes created");
          this.$v.$reset();
          this.ammount = 1;
          this.description = "";
        } catch (error) {
          throw error;
        }
      } else {
        // @ts-ignore
        this.$message(
          `Insufficient funds in the account (${this.ammount - this.info.bill})`
        );
      }
    }
  }
});
</script>
