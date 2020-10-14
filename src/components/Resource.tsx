import React from "react"
export type ResourceState = {
  type: "Resource"
  iri: string
}

export const ResourceView: React.FC<{ data: ResourceState }> = ({ data }) => {
  return (
    <div className="window">
      <h1>Resource</h1>
      <p>{data.iri}</p>
    </div>
  )
}
