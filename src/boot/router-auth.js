import { LocalStorage } from "quasar";

export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    const loggedIn = LocalStorage.getItem("user.loggedIn"),
      guestRoutes = ["/login", "/suport"];

    if (!loggedIn && !guestRoutes.includes(to.path)) {
      next("/login");
    } else {
      next();
    }
  });
};
