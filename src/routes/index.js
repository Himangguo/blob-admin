import React from "react";
import { Redirect } from "react-router-dom";

import Login from "@/pages/login";
import PlatForm from "@/pages/platform";
import Home from "@/pages/home";
import Use from "@/pages/use";
import About from "@/pages/about";
import Privacy from "@/pages/privacy";
import BlobList from "@/pages/article/bloblist";
import MomentList from "@/pages/article/momentlist";
import BgMusic from "@/pages/personality/bgmusic";
import BgWall from "@/pages/personality/bgwall";

import NotFound from "@/pages/not-found";
const routes = [
  {
    path: "/",
    exact: true,
    render: () => {
      return <Redirect to="/login" />;
    },
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/404",
    component: NotFound,
  },
  {
    path: "/platform",
    component: PlatForm,
    auth: true,
    routes: [
      {
        path: "/platform",
        component: PlatForm,
        exact: true,
        render: () => {
          return <Redirect to="/platform/home" />;
        },
      },
      {
        path: "/platform/home",
        component: Home,
      },
      {
        path: "/platform/use",
        component: Use,
      },
      {
        path: "/platform/about",
        component: About,
      },
      {
        path: "/platform/privacy",
        component: Privacy,
      },
      {
        path: "/platform/article",
        exact: true,
        render: () => {
          return <Redirect to="/platform/article/blobList" />;
        },
      },
      {
        path: "/platform/article/blobList",
        component: BlobList,
      },
      {
        path: "/platform/article/momentList",
        component: MomentList,
      },

      {
        path: "/platform/personality",
        exact: true,
        render: () => {
          return <Redirect to="/platform/personality/bgMusic" />;
        },
      },
      {
        path: "/platform/personality/bgMusic",
        component: BgMusic,
      },
      {
        path: "/platform/personality/bgWall",
        component: BgWall,
      },
    ],
  },
];
export default routes;
