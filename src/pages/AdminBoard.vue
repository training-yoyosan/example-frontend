<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-table
        title="Хэрэглэгчид"
        :data="usersData"
        :columns="columns"
        row-key="name"
        :filter="filter"
        selection="single"
        :selected.sync="selected"
        :rows-per-page-label="rowString"
        @selection="rowSelecting"
      >
        <template v-slot:top>
          <q-btn :disable="selectedBtn" color="primary" label="Шинэ хэрэглэгч" @click="newDialog = true" />
          <q-btn class="q-ml-sm" :disable="!selectedBtn" color="warning" label="Хэрэглэгч засах" @click="editDialog = true" />
          <q-btn class="q-ml-sm" :disable="!selectedBtn" color="negative" label="Хэрэглэгч устгах" @click="deleteDialog = true" />
          <q-space />
          <q-input dense debounce="300" color="primary" v-model="filter">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

      <!-- <div class="q-mt-md">
        Selected: {{ JSON.stringify(selected) }}
      </div> -->
      </q-table>
    </div>

    <q-dialog v-model="newDialog" persistent transition-show="scale" transition-hide="scale">
      <q-card style="width: 600px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Шинэ Хэрэглэгч</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-form
            @submit="onNewSubmit"
            @reset="onNewReset"
            class="q-gutter-md"
          >
            <q-input
              filled
              v-model="formNewData.name"
              label="Нэр *"
              hint="Нэр ба овог"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Нэр оруулна уу']"
            />
            <q-input
              filled
              type="text"
              v-model="formNewData.email"
              label="И-мейл *"
              lazy-rules
              :rules="[
                val => val && val.length > 0 || 'И-мейл оруулна уу',
                val => val.includes('@') || 'И-мэйл биш байна'
              ]"
            />
            <q-input
              filled
              :type="formNewData.isPwd ? 'password' : 'text'"
              v-model="formNewData.password"
              label="Нууц үг *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Нууц үг оруулна уу']"
            >
              <template v-slot:append>
                <q-icon
                  :name="formNewData.isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="formNewData.isPwd = !formNewData.isPwd"
                />
              </template>
            </q-input>
            <q-input
              filled
              :type="formNewData.isPwd ? 'password' : 'text'"
              v-model="formNewData.password_confirmation"
              label="Нууц үг баталгаажуулах *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Баталгаажуулах нууц үг оруулна уу']"
            />
            <q-toggle v-model="formNewData.is_admin" label="Админ эрхтэй эсэх" />
            <div>
              <q-btn label="Бүртгэх" type="submit" color="primary"/>
              <q-btn label="Цэвэрлэх" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="editDialog" persistent transition-show="scale" transition-hide="scale">
      <q-card style="width: 600px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Хэрэглэгч Засах</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-form
            @submit="onEditSubmit"
            @reset="onEditReset"
            class="q-gutter-md"
          >

            <q-input
              filled
              v-model="FormEditData.name"
              label="Нэр ба овог *"
              hint="Нэр ба овог"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Нэр оруулна уу']"
            />

            <q-input
              filled
              type="email"
              v-model="FormEditData.email"
              label="И-мейл *"
              lazy-rules
              :rules="[
                val => val && val.length > 0 || 'И-мейл оруулна уу',
                val => val.includes('@') || 'И-мэйл биш байна'
              ]"
            />

            <q-input
              filled
              :type="FormEditData.isPwd ? 'password' : 'text'"
              v-model="FormEditData.password"
              label="Нууц үг *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Нууц үг оруулна уу']"
            >
              <template v-slot:append>
                <q-icon
                  :name="FormEditData.isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="FormEditData.isPwd = !FormEditData.isPwd"
                />
              </template>
            </q-input>
            <q-input
              filled
              :type="FormEditData.isPwd ? 'password' : 'text'"
              v-model="FormEditData.password_confirmation"
              label="Нууц үг баталгаажуулах *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Баталгаажуулах нууц үг оруулна уу']"
            />

            <q-toggle v-model="FormEditData.accept" label="Мэдээлэл засахдаа итгэлтэй байна." />

            <div>
              <q-btn label="Засах" type="submit" color="warning"/>
              <q-btn label="Цэвэрлэх" type="reset" color="warning" flat class="q-ml-sm" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="deleteDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="negative" text-color="white" />
          <span class="q-ml-sm">Хэрэглэгчийн бүртгэлийг устгах уу?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Устгах" color="negative" @click="deleteUser" v-close-popup  />
          <q-btn flat label="Буцах" color="negative" v-close-popup />
        </q-card-actions>
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
      rowString: 'Нэг хуудсанд харуулж буй хэрэглэгчийн тоо',
      // selectedString: 'Нэг хэрэглэгч сонгогдсон байна.',
      selected: [],
      filter: '',
      newDialog: false,
      editDialog: false,
      deleteDialog: false,
      selectedBtn: false,
      formNewData: {
        name: null,
        email: null,
        password: null,
        password_confirmation: null,
        isPwd: true,
        is_admin: false
      },
      FormEditData: {
        id: null,
        name: null,
        email: null,
        password: null,
        password_confirmation: null,
        isPwd: true,
        accept: false
      },
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
        // {
        //   name: 'id',
        //   label: 'Buttons',
        //   align: 'center',
        //   field: row => row.id,
        //   format: val => `${val}`,
        //   sortable: true,
        //   hidden
        // }
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
    ...mapActions('user', ['register', 'updateUsersData', 'profiledit']),
    onNewSubmit () {
      this.register(this.formNewData)
      .then(
        this.newDialog = false,
        this.updateUsersData(this.details.id)
      )
    },
    onNewReset () {
      this.formNewData.name = null
      this.formNewData.email = null
      this.formNewData.password = null
      this.formNewData.password_confirmation = null
      this.formNewData.is_admin = false
    },
    onEditSubmit () {
      if (this.FormEditData.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'Мэдээлэл засах зөвшөөрөл олгоно уу'
        })
      }
      else {
        this.FormEditData.id = this.selected.id
        this.profiledit(this.FormEditData)
        .then(
          this.editDialog = false,
          this.updateUsersData(this.details.id)
        )
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Засалт хийгдэв.'
        })
      }
    },
    onEditReset () {
      this.FormEditData.id = ''
      this.FormEditData.name = ''
      this.FormEditData.email = ''
      this.FormEditData.password = ''
      this.FormEditData.password_confirmation = ''
      this.FormEditData.isPwd = true
      this.FormEditData.accept = false
    },
    deleteUser () {
      if(selected.length){

      }
    },
    rowSelecting (){
        this.selectedBtn = true
    }
  },
  computed: {
    ...mapState('user', ['loggedIn', 'details', 'isAdmin', 'usersData']),
  },
}
</script>
