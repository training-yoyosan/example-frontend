import { Loading, LocalStorage } from "quasar";
import {
  showErrorNotification,
  showSuccessNotification,
  makeTableData
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
          commit("setLoggedIn", true);
          
          axios
            .get("/api/user")
            .then(response => {
              
              commit("setDetails", response.data);
              commit("setIsAdmin", response.data.is_admin);

              const userid = response.data.id;

              axios.post("/api/getusers", {
                id: userid
              })
              .then(response => {
                
                commit("setUsersData", JSON.stringify(response.data[0]));
                showSuccessNotification("Хэрэглэгчдийн нэрс жагсаагдав!");
                console.log(JSON.stringify(response.data[0]));
              })
              .catch(() => {
                showErrorNotification("Хэрэглэгчдийн нэрс жагсаах хүсэлт очсонгүй!");
              });


              showSuccessNotification("Та нэвтэрлээ.");
              this.$router.push("/");
            })
            .catch(() => {
              showErrorNotification("Таны нэвтрэлт амжилтгүй болов!");

              commit("setLoggedIn", false);
            });
        })
        .catch(() => {
          showErrorNotification("Таны нэвтрэлт зөвшөөрөгдсөнгүй!");
        });
    })
    .catch(() => {
      showErrorNotification("Таны нэвтрэлт зөвшөөрөгдсөнгүй!");
    });
}

//Logout

function logout({ commit }) {
  const reset = () => {
    commit("setLoggedIn", false);
    this.$router.replace("/login");
  };

  Loading.show();

  axios
    .post("/api/logout")
    .then(() => {
      showSuccessNotification("Амжилттай гарлаа!");
      reset();
    })
    .catch(() => {
      showErrorNotification("Нэвтрэх хугацаа дууслаа!");
      reset();
    });
}

//Server API Test

function test({ commit }) {
  Loading.show();

  axios
    .post("/api/test")
    .then(response => {
      showSuccessNotification(response.data.message);
    })
    .catch(() => {
      showErrorNotification("Тест үйлдэл зөвшөөрөгдсөнгүй");
    });
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
        showSuccessNotification(response.data.name + " нэртэй хэрэглэгч бүртгэгдэв.");
      }else{
        showErrorNotification("Бүртгэлт амжилтгүй болов.");
      }
    })
    .catch(() => {
      showErrorNotification("Бүртгэлт зөвшөөрөгдсөнгүй.");
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
        showSuccessNotification(response.data.name + " нэртэй хэрэглэгчийн мэдээлэл засагдлаа.");

        axios
            .get("/api/user")
            .then(response => {
              
              commit("setDetails", response.data);

              showSuccessNotification("Та нэвтэрлээ");
              this.$router.push("/profile");
            })
            .catch(() => {
              showErrorNotification("Таны нэвтрэлт амжилтгүй болов!");
            });
      }else{
        showErrorNotification("Профил засалт амжилтгүй болов!");
      }
    })
    .catch(() => {
      showErrorNotification("Профил засалт зөвшөөрөгдсөнгүй!");
    });
}

//Get list of users except logged user

function getUsersData({ commit }, payload){
  Loading.show();

  axios.post("/api/getusers", {
    id: payload.id
  })
  .then(response => {
    
    commit("setUsersData", JSON.stringify(response.data));
    showSuccessNotification("Хэрэглэгчдийн нэрс жагсаагдав!");
    console.log(JSON.stringify(response.data));
  })
  .catch(() => {
    showErrorNotification("Хэрэглэгчдийн нэрс жагсаах хүсэлт очсонгүй!");
  });
}

//Localstorage values

function getState({ commit }) {
  const loggedIn = LocalStorage.getItem("user.loggedIn") || false;
  const details = LocalStorage.getItem("user.details") || {};
  const isAdmin = LocalStorage.getItem("user.isAdmin") || false;
  const usersData = LocalStorage.getItem("user.usersData") || {};
  
  commit("setLoggedIn", loggedIn);
  commit("setDetails", details);
  commit("setIsAdmin", isAdmin);
  commit("setUsersData", usersData);
}

export { login, logout, test, register, getUsersData, profiledit, getState };
