import { Resource } from "@rdfine/hydra"
import { UIContext, linked, DocumentedResource, RDFineSpec, SemanticComponent, Strictness } from "@semanticweb/loqu"
import React from "react"

import Avatar from "react-avatar"

export const GenericIcon: SemanticComponent<RDFineSpec, unknown> = {
  id: "GenericIcon",
  selector: {
    priority: -20,
    type: "iri",
    iri: /.*/,
  },
  metadata: {
    uiContext: UIContext.Icon,
  },
  data: {
    strictness: Strictness.NoChecks,
    spec: {
      format: "rdfine",
    },
  },

  component: ({ data }) => {
    const d = (data.object as Resource) as Resource & DocumentedResource

    // TODO: possibly look up an icon to display based on the type
    // of the resource
    // e.g. from https://github.com/ldodds/schema-icons
    return (
      <>
        <Avatar name={d.title || "Unknown Resource"} round />
      </>
    )
  },
}

export const LinkedGenericIcon = linked(GenericIcon)
