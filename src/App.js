import React, { memo } from "react";
import { Provider } from "react-redux";
import store from "@/store";
import routes from "@/routes";
import { HashRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
export default memo(function App() {
  return (
    <Provider store={store}>
      <HashRouter>{renderRoutes(routes)}</HashRouter>
    </Provider>
  );
});
