import React, { useContext } from "react"
import { Entity } from "@semanticweb/loqu"

import { Button, ButtonGroup, Card, Position, Tooltip } from "@blueprintjs/core"
import { WindowContext } from "./MultiWindow"
import { CollectionState } from "./Collection"

// We get some blueprint errors, so use this filter
// -/(findDOMNode|legacy)/

export const EntityList = ({ entities }: { entities: Entity[] }) => {
  const wc = useContext(WindowContext)
  return (
    <div>
      {entities.map((e) => (
        <Card key={e.resource.id.value} className="flex entity-list">
          <div className="grow about">
            <h2>{e.class.title}</h2>
            <p>{e.class.description}</p>
          </div>
          <ButtonGroup minimal={true}>
            {e.resource.getOperationsDeep().map((o) => (
              <Tooltip key={o.method + o.target.id.value} content={o.title} position={Position.TOP}>
                <Button
                  icon="database"
                  onClick={(evt: React.MouseEvent) => {
                    evt.stopPropagation()
                    const ns: CollectionState = {
                      type: "Collection",
                      operationIRI: o.supportedOperation.id.value,
                      resourceIRI: e.resource.id.value,
                    }

                    if (evt.ctrlKey) {
                      wc.newWindow(ns)
                    } else {
                      wc.updateCurrentWindow(ns)
                    }
                  }}
                >
                  {o.method}
                </Button>
              </Tooltip>
            ))}
          </ButtonGroup>
        </Card>
      ))}
    </div>
  )
}
export default EntityList
