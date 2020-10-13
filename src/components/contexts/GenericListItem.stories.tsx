import React from "react"
import { storiesOf } from "@storybook/react"
import { GComp } from "./GenericListItem"

import data from "../data.json"
import * as jsonld from "jsonld"
import { Dataset, Quad } from "rdf-js"
import { useAsync } from "react-async-hook"
import dataset, { AnyQuad } from "@graphy/memory.dataset.fast"
import { DebugDataset } from "../DebugDataset"

import { renderSingleComponent } from "@semanticweb/loqu"

import { DataFactory } from "rdf-data-factory"
const factory = new DataFactory()

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

storiesOf("GenericListItem", module).add("red", () => <GenericListItemTest />)
