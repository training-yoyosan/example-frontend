<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-table
        title="Хэрэглэгчид"
        :data="usersData"
        :columns="columns"
        row-key="name"
        :filter="filter"
        :rows-per-page-label="rowString"
        :no-data-label="noDataString"
        :no-results-label="noResultString"
      >
        <template v-slot:top>
          <q-btn
            color="primary"
            label="Шинэ хэрэглэгч"
            @click="newDialog = true"
          />
          <!-- <q-btn class="q-ml-sm" :disable="!selectedBtn" color="warning" label="Хэрэглэгч засах" @click="editDialog = true" />
          <q-btn class="q-ml-sm" :disable="!selectedBtn" color="negative" label="Хэрэглэгч устгах" @click="deleteDialog = true" /> -->
          <q-space />
          <q-input dense debounce="300" color="primary" v-model="filter">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:body-cell-id="props">
          <q-td :props="props">
            <div>
              <!-- <q-badge color="purple" :label="props.value"></q-badge> -->
              <q-btn
                icon="create"
                color="warning"
                @click="showEdit(props.value)"
                dense
                flat
              />
              <q-btn
                icon="delete"
                color="negative"
                @click="showDelete(props.value)"
                dense
                flat
              />
            </div>
          </q-td>
        </template>
      </q-table>
    </div>
    <q-dialog
      v-model="newDialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card style="width: 600px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Шинэ Хэрэглэгч</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <q-form @submit="onNewSubmit" @reset="onNewReset" class="q-gutter-md">
            <q-input
              filled
              v-model="formNewData.name"
              label="Нэр *"
              hint="Нэр ба овог"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Нэр оруулна уу']"
            />
            <q-input
              filled
              type="text"
              v-model="formNewData.email"
              label="И-мейл *"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'И-мейл оруулна уу',
                val => val.includes('@') || 'И-мэйл биш байна'
              ]"
            />
            <q-input
              filled
              :type="formNewData.isPwd ? 'password' : 'text'"
              v-model="formNewData.password"
              label="Нууц үг *"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Нууц үг оруулна уу']"
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
              :rules="[
                val =>
                  (val && val.length > 0) || 'Баталгаажуулах нууц үг оруулна уу'
              ]"
            />
            <q-toggle
              v-model="formNewData.is_admin"
              label="Админ эрхтэй эсэх"
            />
            <div>
              <q-btn label="Бүртгэх" type="submit" color="primary" />
              <q-btn
                label="Цэвэрлэх"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="editDialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
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
              v-model="formEditData.name"
              label="Нэр ба овог *"
              hint="Нэр ба овог"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Нэр оруулна уу']"
            />
            <q-input
              filled
              type="email"
              v-model="formEditData.email"
              label="И-мейл *"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'И-мейл оруулна уу',
                val => val.includes('@') || 'И-мэйл биш байна'
              ]"
            />
            <q-input
              filled
              :type="formEditData.isPwd ? 'password' : 'text'"
              v-model="formEditData.password"
              label="Нууц үг *"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Нууц үг оруулна уу']"
            >
              <template v-slot:append>
                <q-icon
                  :name="formEditData.isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="formEditData.isPwd = !formEditData.isPwd"
                />
              </template>
            </q-input>
            <q-input
              filled
              :type="formEditData.isPwd ? 'password' : 'text'"
              v-model="formEditData.password_confirmation"
              label="Нууц үг баталгаажуулах *"
              lazy-rules
              :rules="[
                val =>
                  (val && val.length > 0) || 'Баталгаажуулах нууц үг оруулна уу'
              ]"
            />
            <q-toggle
              v-model="formEditData.accept"
              label="Мэдээлэл засахдаа итгэлтэй байна."
            />
            <div>
              <q-btn label="Засах" type="submit" color="warning" />
              <q-btn
                label="Цэвэрлэх"
                type="reset"
                color="warning"
                flat
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="deleteDialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card style="width: 600px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Хэрэглэгчийн бүртгэлийг устгах уу?</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <q-form @submit="onDeleteSubmit" class="q-gutter-md">
            <q-input hidden disable v-model="formDeleteData.id" />
            <q-toggle
              v-model="formDeleteData.accept"
              label="Мэдээлэл устгахдаа итгэлтэй байна."
            />
            <div>
              <q-btn label="Устгах" type="submit" color="negative" />
              <q-btn
                label="Хаах"
                color="negative"
                flat
                class="q-ml-sm"
                v-close-popup
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { date } from "quasar";
import { mapState, mapActions } from "vuex";
export default {
  name: "AdminBoard",
  data() {
    return {
      rowString: "Нэг хуудсанд харуулж буй хэрэглэгчийн тоо",
      noDataString: "Хэрэглэгч олдсонгүй",
      noResultString: "Хайлтанд тохирох хэрэглэгч олдсонгүй",
      filter: "",
      newDialog: false,
      editDialog: false,
      deleteDialog: false,
      selectedId: null,
      selectedName: null,
      formNewData: {
        name: null,
        email: null,
        password: null,
        password_confirmation: null,
        isPwd: true,
        is_admin: false
      },
      formEditData: {
        id: null,
        name: null,
        email: null,
        password: null,
        password_confirmation: null,
        isPwd: true,
        accept: false
      },
      formDeleteData: {
        id: null,
        accept: false
      },
      columns: [
        {
          name: "name",
          required: true,
          label: "Хэрэглэгчийн нэр",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true,
          headerStyle: "font-weight: bold;"
        },
        {
          name: "email",
          required: true,
          label: "Хэрэглэгчийн И-мейл",
          align: "left",
          field: row => row.email,
          sortable: true,
          headerStyle: "font-weight: bold;"
        },
        {
          name: "is_admin",
          label: "Хэрэглэгч Админ эсэх",
          align: "center",
          field: row => (row.is_admin ? "Тийм" : "Үгүй"),
          sortable: true,
          headerStyle: "font-weight: bold;"
        },
        {
          name: "created_at",
          label: "Бүртгэгдсэн огноо",
          align: "center",
          field: row => date.formatDate(row.created_at, "DD/MM/YYYY"),
          sortable: true,
          headerStyle: "font-weight: bold;"
        },
        {
          name: "id",
          label: "Үйлдлүүд",
          align: "right",
          field: row => row.id,
          sortable: true,
          headerStyle: "font-weight: bold;"
        }
      ]
    };
  },
  mounted() {
    this.updateUsersData(this.details.id);
  },
  methods: {
    ...mapActions("user", [
      "register",
      "updateUsersData",
      "deletion",
      "useredition",
      "test"
    ]),
    onNewSubmit() {
      this.register(this.formNewData).then(
        (this.newDialog = false),
        this.updateUsersData(this.details.id),
        this.onNewReset()
      );
    },
    onNewReset() {
      this.formNewData.name = null;
      this.formNewData.email = null;
      this.formNewData.password = null;
      this.formNewData.password_confirmation = null;
      this.formNewData.is_admin = false;
    },
    showEdit(id) {
      this.formEditData.id = parseInt(id, 10);
      this.editDialog = true;
    },
    onEditSubmit() {
      if (this.formEditData.accept !== true) {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "Мэдээлэл засах зөвшөөрөл олгоно уу"
        });
      } else {
        this.useredition(this.formEditData).then(
          (this.editDialog = false),
          this.updateUsersData(this.details.id),
          this.onEditReset()
        );
      }
    },
    onEditReset() {
      this.formEditData.id = "";
      this.formEditData.name = "";
      this.formEditData.email = "";
      this.formEditData.password = "";
      this.formEditData.password_confirmation = "";
      this.formEditData.isPwd = true;
      this.formEditData.accept = false;
    },
    showDelete(id) {
      this.formDeleteData.id = parseInt(id, 10);
      this.deleteDialog = true;
    },
    onDeleteSubmit() {
      if (this.formDeleteData.accept !== true) {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "Мэдээлэл устгах зөвшөөрөл олгоно уу"
        });
      } else {
        this.deletion(this.formDeleteData).then(
          (this.deleteDialog = false),
          this.updateUsersData(this.details.id),
          (this.formDeleteData.id = ""),
          (this.formDeleteData.accept = false)
        );
      }
    }
  },
  computed: {
    ...mapState("user", ["loggedIn", "details", "isAdmin", "usersData"])
  }
};
</script>
