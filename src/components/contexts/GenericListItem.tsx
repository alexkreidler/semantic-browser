import { Resource } from "@rdfine/hydra"
import {
  ClownfaceSpec,
  DocumentedResource,
  RDFineSpec,
  renderSingleComponent,
  SemanticComponent,
  Strictness,
} from "@semanticweb/loqu"
import React from "react"
import data from "../data.json"
import * as jsonld from "jsonld"
import { Dataset, Quad } from "rdf-js"
import { useAsync } from "react-async-hook"

// declare module "@graphy/memory.dataset.fast"
// import {FastDataset} from "../@types/index.d.ts"
import dataset, { AnyQuad } from "@graphy/memory.dataset.fast"
import { schema } from "@tpluscode/rdf-ns-builders"
import { DataFactory } from "rdf-data-factory"
import { DebugDataset } from "../DebugDataset"

const factory = new DataFactory()

export const GComp: SemanticComponent<RDFineSpec> = {
  selector: {
    iri: /.*/,
  },
  data: {
    strictness: Strictness.NoChecks,
    spec: {
      format: "rdfine",
    },
  },

  component: ({ data, spec }) => {
    console.log("Inner comp")

    const d = (data.object as Resource) as DocumentedResource

    return (
      <div>
        <h2>{d.title}</h2>
        <p>{d.description}</p>
      </div>
    )
  },
}

const loadData = async () => {
  const qs = (await jsonld.toRDF(data)) as Quad[]

  const ds = new DebugDataset()
  ds.addAll(qs)

  return ds
}

// { data }: { data: any }

export const GenericListItemTest = () => {
  const status = useAsync(loadData, [])
  switch (status.status) {
    case "success":
      const d = status.result!
      const o = renderSingleComponent(GComp, {
        // @ts-ignore
        dataset: d,
        node: factory.namedNode("http://example.com/Jane-Doe"),
      })
      // console.log("Inner out", o)

      return <>{o}</>

    case "error":
      throw status.error
  }
  return <>"failed"</>
}
