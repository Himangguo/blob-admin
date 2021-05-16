import React,{lazy} from "react";
import { Redirect } from "react-router-dom";

/* import Login from "@/pages/login";
import PlatForm from "@/pages/platform";
import Home from "@/pages/home";
import Use from "@/pages/use";
import About from "@/pages/about";
import Privacy from "@/pages/privacy";
import BlobList from "@/pages/article/bloblist";
import BlobDetail from "@/pages/article/detail";
import AddArticle from "@/pages/article/add-article";
import BgMusic from "@/pages/personality/bgmusic";
import BgWall from "@/pages/personality/bgwall";

import NotFound from "@/pages/not-found"; */
const Login = lazy(()=>import("@/pages/login"));
const PlatForm = lazy(()=>import("@/pages/platform"));
const Home = lazy(()=>import("@/pages/home"));
const Use = lazy(()=>import("@/pages/use"));
const Privacy = lazy(()=>import("@/pages/privacy"));
const BlobList = lazy(()=>import("@/pages/article/bloblist"));
const BlobDetail = lazy(()=>import("@/pages/article/detail"));
const AddArticle = lazy(()=>import("@/pages/article/add-article"));
const BgMusic = lazy(()=>import("@/pages/personality/bgmusic"));
const NotFound = lazy(()=>import("@/pages/not-found"));
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
        path: "/platform/article/detail/:id",
        name:'详情',
        component: BlobDetail,
      },
      {
        path: "/platform/article/add",
        name:'新增文章',
        component: AddArticle,
      },
      {
        path: "/platform/article/update/:id",
        name:'修改文章',
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
    ],
  },
];
export default routes;
