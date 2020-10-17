import { Session } from "./components/Session"
import React from "react"

import { WindowManager } from "./components/Windows"
import { ThemeWrapper } from "./components/ThemeWrapper"

const sess = new Session()

function App() {
  return (
    <ThemeWrapper>
      <WindowManager session={sess}></WindowManager>
    </ThemeWrapper>
  )
}

export default App
