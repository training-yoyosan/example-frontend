import { LocalStorage } from "quasar";

function setLoggedIn(state, value) {
  state.loggedIn = value;

  LocalStorage.set("user.loggedIn", value);
}

function setDetails(state, payload) {
  state.details = payload;

  LocalStorage.set("user.details", payload);
}

export { setLoggedIn, setDetails };
