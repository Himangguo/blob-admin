import React from "react";
import { Redirect } from "react-router-dom";

import Login from "@/pages/login";
import PlatForm from "@/pages/platform";
import Home from "@/pages/home";
import Use from "@/pages/use";
import About from "@/pages/about";
import Privacy from "@/pages/privacy";
import BlobList from "@/pages/article/bloblist";
import AddArticle from "@/pages/article/add-article";
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
        name:'个人信息',
        component: Home,
      },
      {
        path: "/platform/use",
        name:'使用',
        component: Use,
      },
      {
        path: "/platform/about",
        name:'关于博客苗',
        component: About,
      },
      {
        path: "/platform/privacy",
        name:'隐私设置',
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
        name:'博客列表',
        component: BlobList,
      },
      {
        path: "/platform/article/add",
        name:'新增文章',
        component: AddArticle,
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
        name:'背景音乐',
        component: BgMusic,
      },
      {
        path: "/platform/personality/bgWall",
        name:'背景墙',
        component: BgWall,
      },
    ],
  },
];
export default routes;
