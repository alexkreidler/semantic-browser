import React from "react"
import { EntityList } from "./EntityList"

import { DEFAULT_ENTRYPOINT } from "../services/backend"
import { useAsync } from "react-async-hook"
import { getEntities } from "@semanticweb/loqu"

export type NewWindowProps = unknown
export const NewWindow: React.FC<NewWindowProps> = () => {
  const stat = useAsync(getEntities, [DEFAULT_ENTRYPOINT])
  return (
    <div className="window">
      <h1>New Window</h1>
      <p>Choose the Entity that youd'd like to explore next:</p>
      {stat.result ? <EntityList entities={stat.result}></EntityList> : <p>Loading...</p>}
    </div>
  )
}

export type NewWindowState = {
  type: "NewWindow"
}
