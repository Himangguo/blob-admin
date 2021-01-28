import React from "react";
import { Redirect } from "react-router-dom";

import Login from "@/pages/login";
import PlatForm from "@/pages/platform";
import Home from "@/pages/home";
const routes = [
  {
    path: "/",
    exact: true,
    render: () => {
      return <Redirect to="/platform" />;
    },
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/platform",
    component: PlatForm,
    routes: [
      {
        path: "/platform",
        component: PlatForm,
        exact:true,
        render: () => {
            return <Redirect to="/platform/home" />;
          },
      },
      {
        path: "/platform/home",
        component: Home,
      },
    ],
  },
];
export default routes;
