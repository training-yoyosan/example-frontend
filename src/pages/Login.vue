<template>
  <q-page padding>
    <q-card>
      <q-card-section class="q-pt-xs row justify-around items-center q-pa-lg">
        <a href="https://quasar.dev" target="_blank">
          <q-avatar :size="$q.screen.gt.sm ? '4em' : '2em'">
            <img src="https://cdn.quasar.dev/app-icons/icon-128x128.png" />
          </q-avatar>
        </a>
        <q-icon
          name="fas fa-plus"
          class="text-yellow-8"
          :size="$q.screen.gt.sm ? '3em' : '1.5em'"
        />

        <a
          href="https://laravel.com"
          target="_blank"
          style="text-decoration: none"
        >
          <q-icon
            name="fab fa-laravel"
            class="text-red"
            :size="$q.screen.gt.sm ? '4em' : '2.5em'"
          />
        </a>

        <q-icon
          name="fas fa-equals"
          class="text-purple"
          :size="$q.screen.gt.sm ? '3em' : '1.5em'"
        />

        <q-icon
          name="fas fa-heart"
          class="text-pink"
          :size="$q.screen.gt.sm ? '4em' : '2.5em'"
        />
      </q-card-section>
    </q-card>

    <q-banner class="text-center bg-primary q-ma-md text-white">
      Please login to gain access to the application.
    </q-banner>
    <q-form @submit="onSubmit" class="q-gutter-md q-ma-md">
      <q-input
        filled
        v-model="formData.email"
        label="Email address *"
        hint="user@test.com"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        type="password"
        v-model="formData.password"
        label="Password *"
        lazy-rules
        :rules="[
          val => (val !== null && val !== '') || 'Please type something'
        ]"
      />

      <div>
        <q-btn label="Login" type="submit" color="primary" />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      formData: {
        email: "admin@example.local",
        password: "test1234"
      }
    };
  },

  methods: {
    ...mapActions("user", ["login"]),
    onSubmit() {
      this.login(this.formData);
    }
  }
};
</script>
