<template>
  <q-page padding>
    <q-card flat bordered class="profile-card">
      <q-card-section>
        <div class="text-h6">Профил</div>
      </q-card-section>
      <div class="row">
        <div class="col">
          <q-card-section class="q-pt-none">
            <div class="q-pa-md" style="max-width: 350px">
              <q-list bordered separator>

                <q-item v-ripple>
                  <q-item-section>
                    <q-item-label overline>Нэр:</q-item-label>
                    <q-item-label>{{ details.name }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item v-ripple>
                  <q-item-section>
                    <q-item-label overline>И-мейл:</q-item-label>
                    <q-item-label>{{ details.email }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item v-ripple>
                  <q-item-section>
                    <q-item-label overline>Админ эсэх:</q-item-label>
                    <q-item-label>{{ details.is_admin ? "Тийм" : "Үгүй" }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item v-ripple>
                  <q-item-section>
                    <q-item-label overline>Бүртгэгдсэн огноо:</q-item-label>
                    <q-item-label>{{ details.created_at.substring(0, 10) }}</q-item-label>
                  </q-item-section>
                </q-item>

              </q-list>
            </div> 
          </q-card-section>
        </div>
        <div class="col">
          <q-card-section>
            <div v-if="data.showEdit" class="q-pa-md" style="max-width: 400px">
              <q-form
                @submit="onSubmit"
                @reset="onReset"
                class="q-gutter-md"
              >

                <q-input
                  filled
                  v-model="profileFormData.name"
                  label="Нэр ба овог *"
                  hint="Нэр ба овог"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Нэр оруулна уу']"
                />

                <q-input
                  filled
                  type="email"
                  v-model="profileFormData.email"
                  label="И-мейл *"
                  lazy-rules
                  :rules="[
                    val => val && val.length > 0 || 'И-мейл оруулна уу',
                    val => val.includes('@') || 'И-мэйл биш байна'
                  ]"
                />

                <q-input
                  filled
                  :type="profileFormData.isPwd ? 'password' : 'text'"
                  v-model="profileFormData.password"
                  label="Нууц үг *"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Нууц үг оруулна уу']"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="profileFormData.isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="profileFormData.isPwd = !profileFormData.isPwd"
                    />
                  </template>
                </q-input>
                <q-input
                  filled
                  :type="profileFormData.isPwd ? 'password' : 'text'"
                  v-model="profileFormData.password_confirmation"
                  label="Нууц үг баталгаажуулах *"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Баталгаажуулах нууц үг оруулна уу']"
                />

                <q-toggle v-model="profileFormData.accept" label="Мэдээлэл засахдаа итгэлтэй байна." />

                <div>
                  <q-btn label="Засах" type="submit" color="warning"/>
                  <q-btn label="Цэвэрлэх" type="reset" color="warning" flat class="q-ml-sm" />
                  <q-btn label="Хаах" @click="data.showEdit = false" color="warning" flat class="q-ml-sm" />
                </div>
              </q-form>
            </div>
            <q-btn v-else color="warning" label="Засах" @click="data.showEdit = true" />
          </q-card-section>
        </div>
      </div>
    </q-card>  
  </q-page>
</template>

<script>
import { date } from 'quasar'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Profile',
  data () {
    return {
      profileFormData: {
        id: null,
        name: null,
        email: null,
        password: null,
        password_confirmation: null,
        isPwd: true,
        accept: false
      },
      data: {
        showEdit: false
      }
    }
  },
  computed: {
    ...mapState('user', ['loggedIn', 'details']),
  },
  methods: {
    ...mapActions('user', ['profiledit']),
    onSubmit () {
      if (this.profileFormData.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'Мэдээлэл засах зөвшөөрөл олгоно уу'
        })
      }
      else {
        this.profileFormData.id = this.details.id
        this.profiledit(this.profileFormData)
      }
    },
    onReset () {
      this.profileFormData.name = ''
      this.profileFormData.email = ''
      this.profileFormData.password = ''
      this.profileFormData.password_confirmation = ''
      this.profileFormData.isPwd = true
      this.profileFormData.accept = false
    }
  }
}
</script>
