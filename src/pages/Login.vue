<template>
  <q-page padding class="row justify-center">
    <q-card class="window self-center q-mb-xl">
      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input
            filled
            type="email"
            v-model="formData.email"
            label="И-мейл *"
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'И-мейл оруулна уу',
              val => val.includes('@') || 'И-мэйл биш байна'
            ]"
          />
          <q-input
            filled
            :type="formData.isPwd ? 'password' : 'text'"
            v-model="formData.password"
            label="Нууц үг *"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Нууц үг оруулна уу']"
          >
            <template v-slot:append>
              <q-icon
                :name="formData.isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="formData.isPwd = !formData.isPwd"
              />
            </template>
          </q-input>
          <div>
            <q-btn label="Нэвтрэх" type="submit" color="primary" />
            <q-btn
              label="Бүртгүүлэх"
              to="/register"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      formData: {
        email: "admin@example.local",
        password: "test1234",
        isPwd: true
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

<style lang="sass" scoped>
.window
  width: 100%
  max-width: 400px
</style>
