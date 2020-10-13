import React from "react"
import ThemeWrapper from "../src/components/ThemeWrapper"
export const decorators = [
  (Story) => (
    <div style={{ margin: "3em" }}>
      <ThemeWrapper>
        <Story />
      </ThemeWrapper>
    </div>
  ),
]
