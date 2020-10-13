import React from "react"
import { BaseState } from "./MultiWindow"
import { Collection } from "alcaeus"
import { observer } from "mobx-react-lite"
import { useAsync } from "react-async-hook"
import { Card } from "@blueprintjs/core"
import { doOperationByID } from "@semanticweb/loqu"

export type CollectionState = {
  type: "Collection"
  resourceIRI: string
  operationIRI: string
}

const IntCollection = ({ c }: { c: Collection }) => {
  return (
    <div>
      <p>
        Collection ID: {c.id.value} Has {c.totalItems}
      </p>
      {c.member
        ? c.member.map((r) => {
            return (
              <Card>
                {r.id.value} Types:
                {Array.from(r.types.keys())
                  .map((r) => r.id.value)
                  .join(",")}
              </Card>
            )
          })
        : "Whoops, no members found!"}
    </div>
  )
}

export const CollectionView = observer(({ data }: BaseState<CollectionState>) => {
  const stat = useAsync(doOperationByID, [data.resourceIRI, data.operationIRI])

  if (stat.error) {
    throw stat.error
  }
  return (
    <div className="window">
      <h1>Collection</h1>
      {stat.result ? <IntCollection c={stat.result as Collection}></IntCollection> : <p>Loading...</p>}
    </div>
  )
})
