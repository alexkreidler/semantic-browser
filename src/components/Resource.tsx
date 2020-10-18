import React from "react"

import { useAsync } from "react-async-hook"

import { Hydra } from "alcaeus/web"
import { Resource } from "alcaeus"
import { Entrypoint, UIContext } from "@semanticweb/loqu"

export type ResourceState = {
  type: "Resource"
  iri: string
}

async function loadResource(iri: string): Promise<Resource | undefined> {
  const { representation } = await Hydra.loadResource(iri)
  // const rr = representation!.root!
  const rr = representation && representation.root ? representation.root : undefined
  return rr
}

export const ResourceView: React.FC<{ data: ResourceState }> = ({ data }) => {
  const state = useAsync(loadResource, [data.iri])
  switch (state.status) {
    case "loading":
      return <>Loading...</>
    case "success": {
      // console.log(state.result?.toJSON())
      const ds = { dataset: state.result?.pointer.dataset, node: state.result?.id }
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
    }
    case "error":
      console.error(state.error)
      return <>Error: {state.error}</>

    default:
      return <>FAILED</>
  }
}
