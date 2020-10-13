import React, { useContext } from "react"
import { BaseState, WindowContext } from "./MultiWindow"
import { Collection } from "alcaeus"
import { observer } from "mobx-react-lite"
import { useAsync } from "react-async-hook"
import { Card } from "@blueprintjs/core"
import { doOperationByID, renderSingleComponent } from "@semanticweb/loqu"
import { GComp } from "./contexts/GenericListItem"
import { NamedNode } from "rdf-js"
import { ResourceState } from "./Resource"

export type CollectionState = {
  type: "Collection"
  resourceIRI: string
  operationIRI: string
}

const IntCollection = ({ c }: { c: Collection }) => {
  const wc = useContext(WindowContext)
  return (
    <div className="collection">
      <div className="flex">
        <h1>Collection</h1>
        <p className="grey">{c.id.value}</p>
      </div>
      {c.member
        ? c.member.map((r) => {
            const o = renderSingleComponent(
              GComp,
              {
                // @ts-ignore
                dataset: c.pointer.dataset,
                node: r.id as NamedNode,
              },
              {
                onClick: (evt) => {
                  const ns: ResourceState = {
                    type: "Resource",
                    iri: r.id.value,
                  }

                  if (evt.ctrlKey) {
                    wc.newWindow(ns)
                  } else {
                    wc.updateCurrentWindow(ns)
                  }
                },
              }
            )
            // console.log("Inner out", o)

            return <>{o}</>
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
      {stat.result ? <IntCollection c={stat.result as Collection}></IntCollection> : <p>Loading...</p>}
    </div>
  )
})
