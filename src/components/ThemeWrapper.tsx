import React from "react"

import "react-mosaic-component/react-mosaic-component.css"
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
