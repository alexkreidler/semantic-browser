import React from "react";
import { DEFAULT_ENTRYPOINT, getEntities, Entity } from "../services/get";
import { useAsync } from "react-async-hook";
import {
  Button,
  ButtonGroup,
  Card,
  Position,
  Tooltip,
} from "@blueprintjs/core";

// We get some blueprint errors, so use this filter
// -/(findDOMNode|legacy)/

export const EntityList = ({ entities }: { entities: Entity[] }) => {
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
              <Tooltip
                key={o.method + o.target.id.value}
                content={o.title}
                position={Position.TOP}
              >
                <Button
                  icon="database"
                  onClick={() => {
                    o.invoke();
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
  );
};
export default EntityList;