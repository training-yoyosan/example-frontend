<template>
  <q-page padding class="row justify-center">
    <q-card class="window self-center q-mb-xl">
      <q-card-section>
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
        >
          <q-input
            filled
            v-model="formData.name"
            label="Нэр *"
            hint="Нэр ба овог"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Нэр оруулна уу']"
          />
          <q-input
            filled
            type="text"
            v-model="formData.email"
            label="И-мейл *"
            lazy-rules
            :rules="[
              val => val && val.length > 0 || 'И-мейл оруулна уу',
              val => val.includes('@') || 'И-мэйл биш байна'
            ]"
          />
          <q-input
            filled
            :type="formData.isPwd ? 'password' : 'text'"
            v-model="formData.password"
            label="Нууц үг *"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Нууц үг оруулна уу']"
          >
            <template v-slot:append>
              <q-icon
                :name="formData.isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="formData.isPwd = !formData.isPwd"
              />
            </template>
          </q-input>
          <q-input
            filled
            :type="formData.isPwd ? 'password' : 'text'"
            v-model="formData.password_confirmation"
            label="Нууц үг баталгаажуулах *"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Баталгаажуулах нууц үг оруулна уу']"
          />
          <q-toggle v-model="formData.is_admin" label="Админ эрхтэй эсэх" />
          <div>
            <q-btn label="Бүртгүүлэх" type="submit" color="primary"/>
            <q-btn label="Цэвэрлэх" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'NewUser',
  data () {
    return {
      formData: {
        name: null,
        email: null,
        password: null,
        password_confirmation: null,
        isPwd: true,
        is_admin: false
      }
    }
  },

  methods: {
    ...mapActions('user', ['register']),
    onSubmit () {
      this.register(this.formData)
    },
    onReset () {
      this.formData.name = null
      this.formData.email = null
      this.formData.password = null
      this.formData.password_confirmation = null
      this.formData.is_admin = false
    }
  }
}
</script>

<style lang="sass" scoped>
  .window
    width: 100%
    max-width: 400px
</style>
