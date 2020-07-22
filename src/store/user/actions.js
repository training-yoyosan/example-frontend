import { Loading, LocalStorage } from "quasar";
import {
  showErrorNotification,
  showSuccessNotification
} from "../../functions/function-show-notifications";
import axios from "axios";

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

function getState({ commit }) {
  const loggedIn = LocalStorage.getItem("user.loggedIn") || false;
  const details = LocalStorage.getItem("user.details") || {};

  commit("setLoggedIn", loggedIn);
  commit("setDetails", details);
}

export { login, logout, getState };
