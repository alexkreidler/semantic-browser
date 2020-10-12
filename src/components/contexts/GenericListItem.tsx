import { ClownfaceSpec, SemanticComponent, Strictness } from "@semanticweb/loqu"
import React from "react"

// const fm: JsonLDSpec = {
//   format: "jsonld",
//   form: "framed",
// }

export const GL: SemanticComponent<ClownfaceSpec> = {
  selector: {
    iri: /.*/,
  },
  data: {
    strictness: Strictness.NoChecks,
    spec: {
      format: "clownface",
    },
  },

  component: ({ data, spec }) => {
    return <div></div>
  },
}

// type Test<E extends RDFData, F extends object> = {
//   format: E["format"]
//   frame: F
//   data: () => E extends JSONLD ? (E["form"] extends "framed" ? FrameMap<F> : E) : E
// }

// const t: Test<JSONLD, { hey: string }> = {
//   format: "jsonld",
//   frame: { hey: "string" },
//   data: () => l,
// }
