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

import { Card, ICardProps, Popover, PopoverInteractionKind, Tooltip } from "@blueprintjs/core"

export type ListItemProps = {
  /** The IRI for the name property. This will replace the existing hydra, rdfs, and schema labels */
  nameProperty?: string
  onClick: ICardProps["onClick"]
}
export const GComp: SemanticComponent<RDFineSpec, ListItemProps> = {
  id: "GenericListItem",
  selector: {
    priority: -20,
    type: "iri",
    iri: /.*/,
  },
  metadata: {
    uiContext: UIContext.ListItem,
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
      <Popover
        content={<Entrypoint data={RDFineData2RDFJS(data)} uiContext={UIContext.Card}></Entrypoint>}
        className="list-tooltip"
        interactionKind={PopoverInteractionKind.HOVER}
      >
        <Card className="generic-list-item" interactive onClick={props?.onClick}>
          {/* TODO: allow clicking on which title/description property to dereference */}
          {props && props.nameProperty ? (
            <Tooltip content={props.nameProperty}>
              <h2>{d.getString(props.nameProperty)}</h2>
            </Tooltip>
          ) : d.title ? (
            <Tooltip content={d.titleFromProperty}>
              <h2>{d.title}</h2>
            </Tooltip>
          ) : null}

          {/* TODO: make the ID a link to that resource */}
          <p className="id">
            {d.title && d.description ? "ID:" : null}
            {d.id.value}
          </p>

          {d.description ? (
            <Tooltip content={d.descriptionFromProperty}>
              <p>Description: {d.description}</p>
            </Tooltip>
          ) : null}
        </Card>
      </Popover>
    )
  },
}

export const LinkedGenericListItem = linked(GComp)
