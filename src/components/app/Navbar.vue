<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('menu')">
          <i class="material-icons black-text">
            {{ !value ? "dehaze" : "close" }}
          </i>
        </a>
        <span class="black-text">{{ date }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            {{ name }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>
                {{ $t("Profile") }}
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>
                {{ $t("Logout") }}
              </a>
            </li>
            <li>
              <a href="#" class="black-text" @click.prevent="setLocale('ro')">
                <flag iso="md"></flag>
                {{ $t("Ro") }}
              </a>
            </li>
            <li>
              <a href="#" class="black-text" @click.prevent="setLocale('ru')">
                <flag iso="ru"></flag>
                {{ $t("Ru") }}
              </a>
            </li>
            <li>
              <a href="#" class="black-text" @click.prevent="setLocale('en')">
                <flag iso="us"></flag>
                {{ $t("En") }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { Dropdown } from "materialize-css";
import Vue from "vue";
import moment from "moment";

export default Vue.extend({
  props: ["value"],
  data: () => ({
    date: moment()
      .locale(navigator.language)
      .format("ddd DD MMMM YYYY, hh:mm:ss"),
    interval: 0,
    dropdown: Dropdown
  }),

  methods: {
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push("/login?message=logout");
    },
    setLocale(locale: string) {
      this.$i18n.locale = locale;
    }
  },
  computed: {
    name() {
      return this.$store.getters.info.name as string;
    }
  },
  mounted() {
    this.dropdown.init(this.$refs.dropdown as Element, {
      constrainWidth: true
    });
    this.interval = setInterval(
      () =>
        (this.date = moment()
          .locale(this.$i18n ? this.$i18n.locale : navigator.language)
          .format("ddd DD MMMM YYYY, hh:mm:ss")),
      1000
    );
  },

  beforeDestroy() {
    clearInterval(this.interval);
    if (this.dropdown && this.dropdown.prototype.destroy) {
      this.dropdown.prototype.destroy();
    }
  }
});
</script>
