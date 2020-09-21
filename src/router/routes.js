const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Index.vue")
      },
      {
        path: "/login",
        component: () => import("pages/Login.vue")
      },
      {
        path: "/register",
        component: () => import("pages/Register.vue")
      },
      {
        path: "/adminboard",
        component: () => import("pages/AdminBoard.vue")
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
