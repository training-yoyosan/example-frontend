<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-table
        title="Хэрэглэгчид"
        :data="usersData"
        :columns="columns"
        row-key="name"
        :filter="filter"
      >
        <template v-slot:top>
          <q-btn color="primary" label="Шинэ хэрэглэгч" @click="newUser = true" />
          <q-space />
          <q-input dense debounce="300" color="primary" v-model="filter">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>
    </div>

    <q-dialog v-model="newUser" persistent transition-show="scale" transition-hide="scale">
      <q-card style="width: 600px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Шинэ Хэрэглэгч</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

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
              <q-btn label="Бүртгэх" type="submit" color="primary"/>
              <q-btn label="Цэвэрлэх" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
import { date } from 'quasar'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AdminBoard',
  data() {
    return {
      formData: {
        name: null,
        email: null,
        password: null,
        password_confirmation: null,
        isPwd: true,
        is_admin: false
      },
      filter: '',
      newUser: false,
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Хэрэглэгчийн нэр',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'email',
          required: true,
          label: 'Хэрэглэгчийн И-мейл',
          align: 'left',
          field: row => row.email,
          sortable: true
        },
        {
          name: 'is_admin',
          label: 'Хэрэглэгч Админ эсэх',
          align: 'center',
          field: row => row.is_admin ? 'Тийм' : 'Үгүй',
          sortable: true
        },
        {
          name: 'created_at',
          label: 'Бүртгэгдсэн огноо',
          align: 'center',
          field: row => date.formatDate(row.created_at, "DD/MM/YYYY"),
          sortable: true
        },
        {
          name: 'id',
          label: 'Buttons',
          align: 'center',
          field: row => row.id,
          sortable: true
        }
      ],
    }
  },
  mounted() {
    // this.$axios.post("/api/getusers", {
    //   id: this.details.id
    // })
    // .then(response => {
    //   this.otherUsers = response.data[0]
    //   showSuccessNotification("Хэрэглэгчдийн нэрс жагсаагдав!")
    // }) 
    // .catch(() => {
    //   showErrorNotification("Хэрэглэгчдийн нэрс жагсаах хүсэлт очсонгүй!")
    // });
    // console.log(this.otherUsers)
    this.updateUsersData(this.details.id)
  },
  methods: {
    ...mapActions('user', ['register', 'updateUsersData']),
    onSubmit () {
      this.register(this.formData)
      .then(
        this.newUser = false,
        this.updateUsersData(this.details.id)
      )
    },
    onReset () {
      this.formData.name = null
      this.formData.email = null
      this.formData.password = null
      this.formData.password_confirmation = null
      this.formData.is_admin = false
    }
  },
  computed: {
    ...mapState('user', ['loggedIn', 'details', 'isAdmin', 'usersData']),
  },
}
</script>
