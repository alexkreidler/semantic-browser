import React, { useContext } from "react"
import { BaseState, WindowContext } from "./MultiWindow"
import { Collection } from "alcaeus"
import { observer } from "mobx-react-lite"
import { useAsync } from "react-async-hook"
import { doOperationByID, Entrypoint, UIContext } from "@semanticweb/loqu"
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
            const data = {
              dataset: c.pointer.dataset,
              node: r.id as NamedNode,
            }

            // return <LinkedGenericListItem data={dataset: ..} onClick={}>
            // return <Dynamic data={} metadata={} uiContext={} onClick={}

            return (
              <Entrypoint
                data={data}
                uiContext={UIContext.ListItem}
                onClick={(evt: any) => {
                  const ns: ResourceState = {
                    type: "Resource",
                    iri: r.id.value,
                  }

                  if (evt.ctrlKey) {
                    wc.newWindow(ns)
                  } else {
                    wc.updateCurrentWindow(ns)
                  }
                }}
              ></Entrypoint>
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
      {stat.result ? <IntCollection c={stat.result as Collection}></IntCollection> : <p>Loading...</p>}
    </div>
  )
})
