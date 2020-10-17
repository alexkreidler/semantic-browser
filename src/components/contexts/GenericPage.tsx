import {
  UIContext,
  linked,
  SemanticComponent,
  Strictness,
  Entrypoint,
  RDFJSData,
  Clownface2RDFJS,
  ClownfaceSpec,
} from "@semanticweb/loqu"
import { rdf } from "@tpluscode/rdf-ns-builders"
import { Dataset } from "rdf-js"
import React from "react"

export const dSize = (data: RDFJSData): void => {
  console.log(data.dataset.size)
}

export type CardProps = {
  nameProperty?: string
}

export const GenericPage: SemanticComponent<ClownfaceSpec, CardProps> = {
  id: "GenericPage",
  selector: {
    priority: -20,
    type: "iri",
    iri: /.*/,
  },
  metadata: {
    uiContext: UIContext.Page,
  },
  data: {
    strictness: Strictness.NoChecks,
    spec: {
      format: "clownface",
    },
  },

  component: ({ data, props }) => {
    const rd = Clownface2RDFJS(data)

    return (
      <div>
        <div className="resource-header">
          <Entrypoint data={rd} uiContext={UIContext.Icon}></Entrypoint>
          <div className="title-section">
            {data.pointer.term ? <h1>{data.pointer.term.value}</h1> : null}
            <p>Types: {data.pointer.out(rdf.type).values.join(", ")}</p>
          </div>
        </div>
        <h2>Properties</h2>
        {data.pointer
          .out()
          .filter((q) => !(q.in(rdf.type).terms.length > 0))
          .map((val) => {
            const ms = data.pointer.dataset.match(undefined, undefined, val.term)
            const quad = (ms as Dataset).toArray()[0]
            return (
              <div>
                <p>
                  {quad.predicate.value}: {quad.object.value}
                </p>
              </div>
            )
          })}
      </div>
    )
  },
}

export const LinkedGenericPage = linked(GenericPage)
