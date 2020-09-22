<template>
  <q-form
    @submit="onSubmit"
    @reset="onReset"
    class="q-gutter-md"
  >
    
    <q-input
      filled
      v-model="profile_name"
      label="Нэр ба овог *"
      hint="Нэр ба овог"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'Нэр оруулна уу']"
    />

    <q-input
      filled
      type="email"
      v-model="profile_email"
      label="И-мейл *"
      lazy-rules
      :rules="[
        val => val && val.length > 0 || 'И-мейл оруулна уу',
        val => val.includes('@') || 'И-мэйл биш байна'
      ]"
    />

    <q-input
      filled
      :type="profile_isPwd ? 'password' : 'text'"
      v-model="profile_password"
      label="Нууц үг *"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'Нууц үг оруулна уу']"
    >
      <template v-slot:append>
        <q-icon
          :name="profile_isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="profile_isPwd = !profile_isPwd"
        />
      </template>
    </q-input>
    <q-input
      filled
      :type="profile_isPwd ? 'password' : 'text'"
      v-model="profile_password_confirmation"
      label="Нууц үг баталгаажуулах *"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'Баталгаажуулах нууц үг оруулна уу']"
    />

    <q-toggle v-model="accept" label="Мэдээлэл засахдаа итгэлтэй байна." />

    <div>
      <q-btn label="Засах" type="submit" color="primary"/>
      <q-btn label="Цэвэрлэх" type="reset" color="primary" flat class="q-ml-sm" />
    </div>
  </q-form>
</template>

<script>
export default {
  name: 'Profile',
  props: {
    profile_name: {
      type: String,
      required: true,
      default: ''
    },
    profile_email: {
      type: String,
      default: ''
    },
    profile_password: {
      type: String,
      default: ''
    },
    profile_password_confirmation: {
      type: String,
      default: ''
    },
    profile_isPwd: {
      type: Boolean,
      default: true
    },
    accept: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    onSubmit () {
      if (this.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'Мэдээлэл засах зөвшөөрөл олгоно уу'
        })
      }
      else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted'
        })
      }
    },
    onReset () {
      this.profile_name = ''
      this.profile_email = ''
      this.profile_password = ''
      this.profile_password_confirmation = ''
      this.profile_isPwd = true
      this.accept = false
    }
  }
}
</script>
