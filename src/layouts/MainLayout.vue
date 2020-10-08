<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="left = !left"
        />

        <q-toolbar-title>
          Quasar Front-End App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
      <div class="q-px-lg q-pt-xl q-mb-md">
        <div class="text-h3">IFFC Тест</div>
        <div class="text-subtitle1">{{ dateToday }}</div>
      </div>
      <q-img src="train-to-mongolia.jpg" class="header-image absolute-top" />
    </q-header>

    <q-drawer
      v-if="loggedIn"
      v-model="left"
      show-if-above
      :width="250"
      :breakpoint="600"
    >
      <q-scroll-area
        style="height: calc(100% - 192px); margin-top: 192px; border-right: 1px solid #ddd"
      >
        <q-list padding>
          <q-item to="/profile" exact clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>

            <q-item-section>
              Профил
            </q-item-section>
          </q-item>

          <q-item v-if="isAdmin" to="/adminboard" exact clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="people" />
            </q-item-section>

            <q-item-section>
              Админы самбар
            </q-item-section>
          </q-item>

          <q-item v-if="isAdmin" to="/contract" exact clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="article" />
            </q-item-section>

            <q-item-section>
              Гэрээний самбар
            </q-item-section>
          </q-item>

          <q-item clickable @click="test" v-ripple>
            <q-item-section avatar>
              <q-icon name="send" />
            </q-item-section>

            <q-item-section>
              Тест үйлдэл
            </q-item-section>
          </q-item>

          <q-item clickable @click="logout" v-ripple>
            <q-item-section avatar>
              <q-icon name="exit_to_app" />
            </q-item-section>

            <q-item-section>
              Гарах
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="train-to-mongolia.jpg"
        style="height: 192px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="iffc_logo.png" />
          </q-avatar>
          <div class="avatar-box text-weight-bold">{{ details.name }}</div>
          <div class="avatar-box">{{ details.email }}</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
import { date } from "quasar";
import { mapState, mapActions } from "vuex";

export default {
  name: "MainLayout",
  data() {
    return {
      left: false,
      profile: false
    };
  },

  computed: {
    ...mapState("user", ["loggedIn", "details", "isAdmin"]),
    dateToday() {
      return date.formatDate(Date.now(), "dddd D MMMM");
    }
  },

  methods: {
    ...mapActions("user", ["logout", "test"])
  },
  created() {
    this.$q.dark.set(true);
  }
};
</script>

<style lang="scss">
.header-image {
  height: 100%;
  z-index: -1;
  opacity: 0.5;
  filter: grayscale(100%);
}
</style>
