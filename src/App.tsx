import { Session } from "./components/Session";
import React from "react";

import WindowManager from "./components/Windows";

const sess = new Session();

function App() {
  return <WindowManager session={sess}></WindowManager>;
}

export default App;
