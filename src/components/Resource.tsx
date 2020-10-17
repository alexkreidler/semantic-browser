import React from "react"

import { useAsync } from "react-async-hook"

import { Hydra } from "alcaeus/web"
import { RdfResource } from "@tpluscode/rdfine"
import { Resource } from "alcaeus"
import { Entrypoint, toJSON, UIContext } from "@semanticweb/loqu"

export type ResourceState = {
  type: "Resource"
  iri: string
}

async function loadResource(iri: string): Promise<Resource> {
  const { representation } = await Hydra.loadResource(iri)
  const rr = representation!.root!
  // console.log(await toJSON(rr))

  return rr
}

export const ResourceView: React.FC<{ data: ResourceState }> = ({ data }) => {
  const state = useAsync(loadResource, [data.iri])
  switch (state.status) {
    case "loading":
      return <>Loading...</>
      break
    case "success":
      // console.log(state.result?.toJSON())
      let ds = { dataset: state.result?.pointer.dataset, node: state.result?.id }
      console.log(ds)

      return (
        <div className="window">
          <Entrypoint
            // @ts-ignore
            data={ds}
            uiContext={UIContext.Page}
          ></Entrypoint>
        </div>
      )
      break

    default:
      return <>FAILED</>
  }
}
