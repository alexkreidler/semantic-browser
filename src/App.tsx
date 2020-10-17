import { Session } from "./components/Session"
import React from "react"

import { WindowManager } from "./components/Windows"
import { ThemeWrapper } from "./components/ThemeWrapper"

const sess = new Session()

function App() {
  return (
    <ThemeWrapper>
      <div className="app">
        <WindowManager session={sess}></WindowManager>
      </div>
    </ThemeWrapper>
  )
}

export default App
