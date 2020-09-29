<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-table
        title="Хэрэглэгчид"
        :data="otherUsers"
        :columns="columns"
        row-key="name"
      >
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { date } from 'quasar'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AdminBoard',
  data() {
    return {
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
      otherUsers: []
    }
  },
  mounted() {
    this.$axios.post("/api/getusers", {
      id: this.details.id
    })
    .then(response => {
      this.otherUsers = response.data[0]
      showSuccessNotification("Хэрэглэгчдийн нэрс жагсаагдав!")
    }) 
    .catch(() => {
      showErrorNotification("Хэрэглэгчдийн нэрс жагсаах хүсэлт очсонгүй!")
    });
    console.log(this.otherUsers)
  },
  computed: {
    ...mapState('user', ['loggedIn', 'details', 'isAdmin']),
  },
}
</script>
