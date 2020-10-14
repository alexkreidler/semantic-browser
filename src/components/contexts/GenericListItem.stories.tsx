import React from "react"
import { storiesOf } from "@storybook/react"
import { LinkedGenericListItem } from "./GenericListItem"

import data from "../data.json"
import * as jsonld from "jsonld"
import { Dataset, Quad } from "rdf-js"
import { useAsync } from "react-async-hook"
import { DebugDataset } from "../DebugDataset"

import { DataFactory } from "rdf-data-factory"
const factory = new DataFactory()

const loadData = async () => {
  const qs = (await jsonld.toRDF(data)) as Quad[]

  const ds = new DebugDataset()
  ds.addAll(qs)

  return ds
}

export const GenericListItemTest: React.FC<unknown> = () => {
  const status = useAsync(loadData, [])
  switch (status.status) {
    case "success":
      return (
        <LinkedGenericListItem
          data={{ dataset: status.result as Dataset, node: factory.namedNode("http://example.com/Jane-Doe") }}
        ></LinkedGenericListItem>
      )

    case "error":
      throw status.error
  }
  return <>"failed"</>
}

storiesOf("GenericListItem", module).add("red", () => <GenericListItemTest />)
