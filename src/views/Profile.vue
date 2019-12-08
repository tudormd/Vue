<template>
  <div>
    <div class="page-title">
      <h3>{{ $t("Profile") }}</h3>
    </div>

    <form class="form" @submit.prevent="submit">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model.trim="name"
          :class="{
            invalid:
              ($v.name.$dirty && !$v.name.required) ||
              ($v.name.$dirty && !$v.name.minLength)
          }"
        />
        <label for="description">{{ $t("Name") }}</label>
        <small
          v-if="$v.name.$dirty && !$v.name.required"
          class="helper-text invalid"
          >{{ $t("Enter name") }}</small
        >
        <small
          v-if="$v.name.$dirty && !$v.name.minLength"
          class="helper-text invalid"
          >{{ $t("Min name length is") }}
          {{ $v.name.$params.minLength.min }}</small
        >
      </div>
      <button class="btn waves-effect waves-light" type="submit">
        {{ $t("Refresh") }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { required, minLength } from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";

import Vue from "vue";

export default Vue.extend({
  computed: {
    ...mapGetters(["info"])
  },
  data: () => ({
    name: ""
  }),
  mounted() {
    this.name = this.info.name;
    setTimeout(() => {
      M.updateTextFields();
    });
  },
  validations: {
    name: { required, minLength: minLength(3) }
  },
  methods: {
    ...mapActions(["updateInfo"]),
    async submit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      try {
        await this.updateInfo({ name: this.name });
      } catch (error) {
        throw error;
      }
    }
  }
});
</script>
