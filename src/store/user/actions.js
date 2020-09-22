import { Loading, LocalStorage } from "quasar";
import {
  showErrorNotification,
  showSuccessNotification
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
              console.log(userid);

              axios.post("/api/getusers", {
                id: userid
              })
              .then(response => {
                
                commit("setUsersData", response.data[0]);
                showSuccessNotification("Users list loaded!");
                console.log(response.data[0]);
              })
              .catch(() => {
                showErrorNotification("Users list couldn't be loaded!");
              });

              showSuccessNotification("You've been authenticated!");
              this.$router.push("/");
            })
            .catch(() => {
              showErrorNotification("You're not authenticated!");

              commit("setLoggedIn", false);
            });
        })
        .catch(() => {
          showErrorNotification("Authentication couldn't take place!");
        });
    })
    .catch(() => {
      showErrorNotification("Authentication couldn't take place!");
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
      showSuccessNotification("You've been logged out!");
      reset();
    })
    .catch(() => {
      showErrorNotification("Session expired!");
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
      showErrorNotification("Test couldn't take place!");
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
        showSuccessNotification(response.data.name + " has been registered");
      }else{
        showErrorNotification("Registration failed!");
      }
    })
    .catch(() => {
      showErrorNotification("Registration couldn't take place!");
    });
}

//Get list of users except logged user

function getUsersData({ commit }, payload){
  Loading.show();

  axios.post("/api/getusers", {
    name: payload.name
  })
  .then(response => {
    commit("setUsersData", response.data);
    showSuccessNotification("Users list loaded!");
  })
  .catch(() => {
    showErrorNotification("Users list couldn't be loaded!");
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

export { login, logout, test, register, getUsersData, getState };
