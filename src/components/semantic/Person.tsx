import {
  UIContext,
  linked,
  SemanticComponent,
  Strictness,
  RDFJSData,
  JsonLDToForm,
  FramedForm,
  Entrypoint,
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

const FS = {
  "@context": {
    "@vocab": "http://schema.org/",
  },
  "@type": "Person",
  givenName: "",
  familyName: "",
}
// This has to be FramedForm not JsonLDtoForm to get typee completion
export const PersonPage: SemanticComponent<FramedForm<typeof FS>, CardProps> = {
  id: "PersonPage",
  selector: {
    type: "type",
    iri: /.*schema.org\/Person/,
  },
  metadata: {
    uiContext: UIContext.Page,
  },
  data: {
    strictness: Strictness.NoChecks,
    spec: {
      format: "jsonld",
      form: "framed",
      frameSpec: FS,
    },
  },

  component: ({ data, rdfData }) => {
    console.log("PersonPage", data)

    return (
      <div>
        <div className="resource-header">
          {/* @ts-eignore */}
          <Entrypoint data={rdfData} uiContext={UIContext.Icon}></Entrypoint>
          <div className="title-section">
            <h1>
              {data.document.givenName} {data.document.familyName}
            </h1>
          </div>
        </div>
        <h2>Properties</h2>
      </div>
    )
  },
}

export const LinkedPersonPage = linked(PersonPage)
