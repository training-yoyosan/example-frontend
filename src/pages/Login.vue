<template>
  <q-page padding>
    <q-banner class="text-center bg-primary q-ma-md text-white">
      Please login to gain access to the application.
    </q-banner>
    <q-form
      @submit="onSubmit"
      class="q-gutter-md q-ma-md"
    >
      <q-input
        filled
        v-model="formData.email"
        label="Email address *"
        hint="user@test.com"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        filled
        type="password"
        v-model="formData.password"
        label="Password *"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type something',
        ]"
      />

      <div>
        <q-btn
          label="Login"
          type="submit"
          color="primary"/>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      formData: {
        email: 'admin@example.local',
        password: 'test1234'
      }
    }
  },
  methods: {
    ...mapActions('user', ['login']),
    onSubmit () {
      this.login(this.formData)
    }
  }
}
</script>
