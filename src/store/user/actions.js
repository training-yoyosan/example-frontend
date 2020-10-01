import { Loading, LocalStorage } from "quasar";
import {
  showErrorNotification,
  showSuccessNotification,
  showInfoNotification
} from "../../functions/function-show-notifications";
import axios from "axios";

//Login

function login({ commit }, payload) {
  Loading.show();

  axios
    .get("/sanctum/csrf-cookie")
    .then(() => {
      
      axios
        .post("/api/login", {
          email: payload.email,
          password: payload.password
        })
        .then(() => {
          commit("setLoggedIn", true)
          
          axios
            .get("/api/user")
            .then(response => {
              
              commit("setDetails", response.data)
              commit("setIsAdmin", response.data.is_admin)

              // this.updateUsersData(response.data.id)

              showSuccessNotification("Та нэвтэрлээ.")
              this.$router.push("/");
            })
            .catch(() => {
              showErrorNotification("Таны нэвтрэлт амжилтгүй болов!")

              commit("setLoggedIn", false)
            });
        })
        .catch(() => {
          showErrorNotification("Таны нэвтрэлт зөвшөөрөгдсөнгүй!")
        })
    })
    .catch(() => {
      showErrorNotification("Таны нэвтрэлт зөвшөөрөгдсөнгүй!")
    });
}

//Logout

function logout({ commit }) {
  const reset = () => {
    commit("setLoggedIn", false)
    this.$router.replace("/login")
  };

  Loading.show()

  axios
    .post("/api/logout")
    .then(() => {
      showInfoNotification("Амжилттай гарлаа!")
      reset();
    })
    .catch(() => {
      showErrorNotification("Нэвтрэх хугацаа дууслаа!")
      reset();
    });
}

//Server API Test

function test({ commit }, payload) {
  Loading.show();

  axios
    .put("/api/test", {
      id: payload.id,
      name: payload.name
    })
    .then(response => {
      showSuccessNotification(response.data.message + ' and ' + response.data.id)
    })
    .catch(() => {
      showErrorNotification("Тест үйлдэл зөвшөөрөгдсөнгүй")
    })
}

//Register

function register({ commit }, payload) {
  Loading.show();
    
  axios
    .post("/api/registration", {
      email: payload.email,
      password: payload.password,
      password_confirmation: payload.password_confirmation,
      name: payload.name,
      is_admin: payload.is_admin
    })
    .then(response => {
      if(response.data.message === "success"){
        showSuccessNotification(response.data.name + " нэртэй хэрэглэгч бүртгэгдэв.")
      }else{
        showErrorNotification("Бүртгэлт амжилтгүй болов.")
      }
    })
    .catch(() => {
      showErrorNotification("Бүртгэлт зөвшөөрөгдсөнгүй.")
    });
}

//Profile update

function profiledit({ commit }, payload) {
  Loading.show();
    
  axios
    .put("/api/profiledit", {
      id: payload.id,
      name: payload.name,
      email: payload.email,
      password: payload.password,
      password_confirmation: payload.password_confirmation,
    })
    .then(response => {
      if(response.data.message === "success"){
        showSuccessNotification(response.data.name + " нэртэй хэрэглэгчийн мэдээлэл засагдлаа.")

        axios
            .get("/api/user")
            .then(response => {
              
              commit("setDetails", response.data)

              showSuccessNotification("Та нэвтэрлээ")
              this.$router.push("/profile")
            })
            .catch(() => {
              showErrorNotification("Таны нэвтрэлт амжилтгүй болов!")
            });
      }else{
        showErrorNotification("Профил засалт амжилтгүй болов!")
      }
    })
    .catch(() => {
      showErrorNotification("Профил засалт зөвшөөрөгдсөнгүй!")
    });
}

// User edit

function useredition({ commit }, payload){
  Loading.show();
    
  axios
    .put("/api/profiledit", {
      id: payload.id,
      name: payload.name,
      email: payload.email,
      password: payload.password,
      password_confirmation: payload.password_confirmation,
    })
    .then(response => {
      if(response.data.message === "success"){
        showSuccessNotification(response.data.name + " нэртэй хэрэглэгчийн мэдээлэл засагдлаа.")
        
      } else {
        showErrorNotification("Хэрэглэгчийн засалт амжилтгүй болов!")
      }
      this.$router.push("/adminboard")
    })
    .catch(() => {
      showErrorNotification("Хэрэглэгчийн засалт зөвшөөрөгдсөнгүй!")
    });
}

// Delete User
function deletion({ commit }, payload) {
  Loading.show();
    
  axios
    .delete("/api/deletion", {
      id: payload.id
    })
    .then(response => {
      if(response.data.message === "success"){
        showSuccessNotification(response.data.id + " кодтой хэрэглэгчийн бүртгэл устгагдлаа.")

      } else {
        showErrorNotification("Хэрэглэгчийн бүртгэл устгалт амжилтгүй болов!")
      }
      this.$router.push("/adminboard")
    })
    .catch(() => {
      showErrorNotification("Хэрэглэгчийн бүртгэл устгалт зөвшөөрөгдсөнгүй!")
    });
}

// Updata adminboard

function updateUsersData({ commit }, payload) {
  axios
    .post("/api/getusers", {
      id: payload
    })
    .then(response => {
      commit("setUsersData", response.data[0])
      showInfoNotification("Хэрэглэгчдийн нэрс жагсаагдав!")
      console.log(response.data[0])
    })
    .catch(() => {
      showErrorNotification("Хэрэглэгчдийн нэрс жагсаах хүсэлт очсонгүй!")
    });
}

//Localstorage values

function getState({ commit }) {
  const loggedIn = LocalStorage.getItem("user.loggedIn") || false
  const details = LocalStorage.getItem("user.details") || {}
  const usersData = LocalStorage.getItem("user.usersData") || {}
  const isAdmin = LocalStorage.getItem("user.isAdmin") || false
  
  commit("setLoggedIn", loggedIn)
  commit("setDetails", details)
  commit("setUsersData", usersData)
  commit("setIsAdmin", isAdmin)

}

export { login, logout, test, register, profiledit, getState, updateUsersData, deletion, useredition }
