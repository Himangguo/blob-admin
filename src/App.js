import React, { memo } from "react";
import { Provider } from "react-redux";
import store from "@/store";
import routes from "@/routes";
import { HashRouter, Switch } from "react-router-dom";

import RouterAuth from "@/hoc/router-auth";
export default memo(function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <RouterAuth config={routes} />
        </Switch>
      </HashRouter>
    </Provider>
  );
});
