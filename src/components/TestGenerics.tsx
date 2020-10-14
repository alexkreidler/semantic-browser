import React from "react"
import { GenericListItemTest } from "./contexts/GenericListItem.stories"

export const TestGenerics: React.FC<unknown> = () => {
  return (
    <div className="window">
      <h1>Generic component tests</h1>
      <GenericListItemTest></GenericListItemTest>
    </div>
  )
}
