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

import { Card } from "@blueprintjs/core"

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
    const d = (data.object as Resource) as Resource & DocumentedResource
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
