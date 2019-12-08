<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="card-title">{{ $t("Accounting") }}</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{
            invalid:
              ($v.email.$dirty && !$v.email.required) ||
              ($v.email.$dirty && !$v.email.email)
          }"
        />
        <label for="email">{{ $t("Email") }}</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
          >{{ $t("Email cannot be empty") }}</small
        >
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
          >{{ $t("Email is not correct") }}</small
        >
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{
            invalid:
              ($v.password.$dirty && !$v.password.required) ||
              ($v.password.$dirty && !$v.password.minLength)
          }"
        />
        <label for="password">{{ $t("Password") }}</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
          >{{ $t("Enter Password") }}</small
        >
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.minLength"
        >
          {{ $t("Min Password length") }}
          {{ $v.password.$params.minLength.min }}, {{ $t("Now is") }}
          {{ password.length }}
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          {{ $t("Log in") }}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ $t("Not account") }} ?
        <router-link to="/register"> {{ $t("Register") }}</router-link>
      </p>
    </div>
  </form>
</template>

<script lang="ts">
import { email, required, minLength } from "vuelidate/lib/validators";
import { Message } from "@/utils/message";
import Vue from "vue";
export default Vue.extend({
  name: "login",
  data: () => ({
    email: "",
    password: ""
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) }
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = { email: this.email, password: this.password };
      try {
        await this.$store.dispatch("login", formData);
        this.$router.push("/");
      } catch (error) {
        throw error;
      }
    }
  },

  mounted() {
    if (Message[this.$route.query.message as string]) {
      //@ts-ignore
      this.$message(Message[this.$route.query.message as string]);
    }
  }
});
</script>
