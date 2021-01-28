import React, { memo, useMemo } from "react";
import { Route, Redirect } from "react-router-dom";
export default memo(function RouterAuth(props) {
  const { location, config } = props;
  let { pathname } = location;
  const isLogin = localStorage.getItem("token");
  function getSuperRouter(config, pathname) {
    let superRoute = null;
    for (let i = 0; i < config.length; i++) {
      if (pathname === config[i].path) {
          // 如果找到了对应的路由对象直接返回
        return config[i];
      }
      if (pathname.indexOf(config[i].path + "/") === 0) {
          // 如果此路由对象是pathname的父级
        if (!superRoute) {
          superRoute = config[i];
        } else {
          superRoute =
            superRoute.path.length < config[i].path.length
              ? config[i]
              : superRoute;
        }
      }
    }
    return superRoute;
  }
  let targetRouterConfig = getSuperRouter(config, pathname);

  if (isLogin) {
    // 登陆状态下，路由合法，跳转到该页面
    if (targetRouterConfig) {
      return (
        <Route
          path={pathname}
          render={
            targetRouterConfig.render
              ? targetRouterConfig.render
              : (props) =>
                  React.createElement(targetRouterConfig.component, {
                    ...props,
                    route: targetRouterConfig,
                  })
          }
          exact={targetRouterConfig.exact}
        />
      );
    } else {
      // 如果路由不合法，重定向到 404页面
      return <Redirect to="/404" />;
    }
  } else {
    // 非登陆状态下，路由合法，不需要校验权限的页面，直接跳转到该页面
    if (targetRouterConfig && !targetRouterConfig.auth) {
      return (
        <Route
          path={pathname}
          render={
            targetRouterConfig.render
              ? targetRouterConfig.render
              : () => React.createElement(targetRouterConfig.component)
          }
          exact={targetRouterConfig.exact}
          route={targetRouterConfig}
        />
      );
    }
    // 非登陆状态下，路由合法，需要校验权限的页面重定向到登录页
    else if (targetRouterConfig && targetRouterConfig.auth) {
      return <Redirect to="/login" />;
    } else {
      // 非登陆状态下，路由不合法时，重定向至404页面
      return <Redirect to="/404" />;
    }
  }
});
