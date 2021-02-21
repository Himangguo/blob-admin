import React, { memo } from "react";
import { Provider } from "react-redux";
import store from "@/store";
import routes from "@/routes";
import { BrowserRouter, Switch } from "react-router-dom";

import RouterAuth from "@/hoc/router-auth";
// import { renderRoutes } from "react-router-config";
export default memo(function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <RouterAuth config={routes} />
          {/* {renderRoutes(routes)} */}
        </Switch>
      </BrowserRouter>
    </Provider>
  );
});
