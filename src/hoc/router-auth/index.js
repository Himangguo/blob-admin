import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { testTokenAuth } from "@/api/user";

export default memo(function RouterAuth(props) {
  const { location, config } = props;
  let { pathname } = location;
  // 获取pathname的路由对象或者父级路由对象
  const getSuperRouter = useCallback((config, pathname) => {
    let locationPathname = pathname;
    let superRoute = null;
    for (let i = 0; i < config.length; i++) {
      let configPathList = config[i].path.split("/");
      let pathList = locationPathname.split("/");
      for (let i = 0; i < configPathList.length; i++) {
        if (configPathList[i].includes(":")) {
          configPathList.splice(i, 1);
          pathList.splice(i, 1);
          i--;
        }
      }
      locationPathname = pathList.join("/");
      let removeParamsConfigPath = configPathList.join("/");
      // console.log("在这里", locationPathname, removeParamsConfigPath);
      if (locationPathname === removeParamsConfigPath) {
        // 如果找到了对应的路由对象直接返回
        return config[i];
      }

      if (locationPathname.indexOf(removeParamsConfigPath + "/") === 0) {
        // 如果此路由对象是locationPathname的父级
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
  }, []);
  const targetRouterConfig = useMemo(() => getSuperRouter(config, pathname), [
    getSuperRouter,
    config,
    pathname,
  ]);
  const [renderRoutes, setRenderRoutes] = useState(null);
  useEffect(() => {
    async function render() {
      console.log(targetRouterConfig);
      if (targetRouterConfig) {
        // 如果路由合法
        if (targetRouterConfig.auth) {
          // 如果需要登陆态
          let { id } = await testTokenAuth();
          if (id) {
            // 登陆态合法
            setRenderRoutes(
              <Route
                path={targetRouterConfig.path}
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
            // 登陆态不合法就跳到登录页
            setRenderRoutes(<Redirect to="/login" />);
          }
        } else {
          // 如果不要登录态
          setRenderRoutes(
            <Route
              path={targetRouterConfig.path}
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
        }
      } else {
        // 如果路由不合法，重定向到 404页面
        setRenderRoutes(<Redirect to="/404" />);
      }
    }
    render();
  }, [targetRouterConfig, pathname]);
  return <>{renderRoutes && renderRoutes}</>;
});
