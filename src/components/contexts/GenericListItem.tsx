import { Resource } from "@rdfine/hydra"
import { DocumentedResource, RDFineSpec, SemanticComponent, Strictness } from "@semanticweb/loqu"
import React from "react"

// declare module "@graphy/memory.dataset.fast"
// import {FastDataset} from "../@types/index.d.ts"
import { schema } from "@tpluscode/rdf-ns-builders"
import { Card, Tooltip } from "@blueprintjs/core"

export type ListItemProps = {
  /** The IRI for the name property. This will replace the existing hydra, rdfs, and schema labels */
  nameProperty?: string
}

export const GComp: SemanticComponent<RDFineSpec, ListItemProps> = {
  selector: {
    iri: /.*/,
  },
  data: {
    strictness: Strictness.NoChecks,
    spec: {
      format: "rdfine",
    },
  },

  component: ({ data, props }) => {
    console.log("Inner comp", props)

    const d = (data.object as Resource) as Resource & DocumentedResource

    console.log(d)
    console.log(d.pointer.out(schema.title).terms[0].termType)

    return (
      <Card className="generic-list-item">
        {/* TODO: allow clicking on which title/description property to dereference */}
        {props && props.nameProperty ? (
          <Tooltip content={props.nameProperty}>
            <h2>{d.getString(props.nameProperty)}</h2>
          </Tooltip>
        ) : (
          <Tooltip content={d.titleFromProperty}>
            <h2>{d.title}</h2>
          </Tooltip>
        )}

        {/* TODO: make the ID a link to that resource */}
        <p>ID: {d.id.value}</p>

        <Tooltip content={d.descriptionFromProperty}>
          <p>Description: {d.description}</p>
        </Tooltip>
      </Card>
    )
  },
}
