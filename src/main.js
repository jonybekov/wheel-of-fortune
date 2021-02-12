import { render } from "react-dom";
import React from "react";
import { Router } from "@reach/router";
import Game from "./views/Game";
import Settings from "./views/Settings";
import "foundation-sites/dist/css/foundation.css";
import "./style/main.scss";

const App = () => (
    <>
        <Router>
            <Game path="/" />
            <Settings path="/settings" />
        </Router>
    </>
);

render(<App />, document.getElementById("app"));

if (module.hot) {
    module.hot.accept();
}
