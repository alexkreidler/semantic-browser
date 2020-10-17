import { Resource } from "@rdfine/hydra"
import {
  UIContext,
  linked,
  DocumentedResource,
  RDFineSpec,
  SemanticComponent,
  Strictness,
  Entrypoint,
  RDFineData2RDFJS,
} from "@semanticweb/loqu"
import React from "react"

// declare module "@graphy/memory.dataset.fast"
// import {FastDataset} from "../@types/index.d.ts"
// import { schema } from "@tpluscode/rdf-ns-builders"

import { Card, ICardProps, Popover, PopoverInteractionKind, Tooltip } from "@blueprintjs/core"
import { NamedNode } from "rdf-js"
import Avatar from "react-avatar"

export type CardProps = {
  nameProperty?: string
}

export const GenericCard: SemanticComponent<RDFineSpec, CardProps> = {
  id: "GenericCard",
  selector: {
    priority: -20,
    type: "iri",
    iri: /.*/,
  },
  metadata: {
    uiContext: UIContext.Card,
  },
  data: {
    strictness: Strictness.NoChecks,
    spec: {
      format: "rdfine",
    },
  },

  component: ({ data, props }) => {
    // console.log("Inner comp", props)

    const d = (data.object as Resource) as Resource & DocumentedResource

    // console.log(d)

    return (
      <Card className="generic-card">
        <Entrypoint data={RDFineData2RDFJS(data)} uiContext={UIContext.Icon}></Entrypoint>
        {/* TODO: allow clicking on which title/description property to dereference */}
        {props && props.nameProperty ? <h2>{d.getString(props.nameProperty)}</h2> : d.title ? <h2>{d.title}</h2> : null}

        {/* TODO: make the ID a link to that resource */}
        <p className="id">
          {d.title && d.description ? "ID:" : null}
          {d.id.value}
        </p>

        {d.description ? <p>Description: {d.description}</p> : null}
      </Card>
    )
  },
}

export const LinkedGenericCard = linked(GenericCard)
