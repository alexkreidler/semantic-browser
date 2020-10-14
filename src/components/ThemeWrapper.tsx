import React from "react"

import "react-mosaic-component/react-mosaic-component.css"
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"

export const ThemeWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>
}
