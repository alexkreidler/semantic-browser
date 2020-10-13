import React from "react"
import { BaseState } from "./MultiWindow"
import {
  Collection,
  Resource,
  // Operation,
} from "alcaeus"
import { Hydra } from "alcaeus/web"
import { observer } from "mobx-react-lite"
import { useAsync } from "react-async-hook"
import { Card } from "@blueprintjs/core"
import { toJSON } from "@semanticweb/loqu"
// import RdfResourceImpl, { RdfResource } from "@tpluscode/rdfine";

// import { namedNode } from "@rdfjs/data-model";

export type CollectionState = {
  type: "Collection"
  resourceIRI: string
  operationIRI: string
}

const doOperationByID = async (resource: string, operation: string) => {
  const { representation } = await Hydra.loadResource(resource)
  const r = representation?.root!
  const ops = r.getOperationsDeep().filter((op) => {
    return op.supportedOperation.id.value == operation
  })
  if (ops.length !== 1) {
    throw new Error("Found invalid number of operations")
  }
  const op = ops[0]

  const out = (await op.invoke()).representation?.root!
  console.log(await toJSON(out))
  return out
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
