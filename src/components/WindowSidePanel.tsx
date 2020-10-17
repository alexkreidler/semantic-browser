import { Card } from "@blueprintjs/core"
import { observer } from "mobx-react-lite"
import React from "react"
import { ISessionProps } from "./Session"

export const WindowSidePanel: React.FC<ISessionProps> = observer(({ session }) => {
  return (
    <div className="window">
      <h1>Window Controller</h1>
      {Object.entries(session.s.nodes).map(([id, node]) => {
        return <Card className="window-entry">{node.title}</Card>
      })}
    </div>
  )
})
