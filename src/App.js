import React, { memo, Suspense } from "react";
import { Provider } from "react-redux";
import store from "@/store";
import routes from "@/routes";
import { BrowserRouter} from "react-router-dom";

import RouterAuth from "@/hoc/router-auth";
import { renderRoutes } from "react-router-config";
export default memo(function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<div>page loading</div>}>
          {/* <RouterAuth config={routes} /> */}
          {renderRoutes(routes)}
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
});
