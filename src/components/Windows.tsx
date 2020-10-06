import React, { useState } from "react";
import { Mosaic, MosaicWindow, MosaicZeroState } from "react-mosaic-component";

// doesn't work in jest
// import "@mosaic/theme.css";
// import "@blueprintjs/core/lib/css/blueprint.css";
// import "@blueprintjs/icons/lib/css/blueprint-icons.css";

import "react-mosaic-component/react-mosaic-component.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

import { ulid } from "ulid";
import NewWindow from "./NewWindow";
import { Button, ButtonGroup, InputGroup, Popover } from "@blueprintjs/core";
// import _ from "lodash";

export type WindowManagerProps = {};
export type ViewId = string;

const first_key = ulid();
export const WindowManager: React.FC<WindowManagerProps> = () => {
  const [titleMap, setTitleMap] = useState({ [first_key]: "Window #1" });

  let nodes: { [viewId: string]: JSX.Element } = {
    [first_key]: <NewWindow></NewWindow>,
  };
  function createNode() {
    const id = ulid();
    nodes[id] = <NewWindow></NewWindow>;
    setTitleMap({
      ...titleMap,
      ...{ [id]: `Window #${Object.keys(titleMap).length + 1}` },
    });
    return id;
  }
  console.log(titleMap);

  return (
    <Mosaic<string>
      renderTile={(id, path) => (
        <MosaicWindow<string>
          path={path}
          title={titleMap[id] || "No val"}
          createNode={createNode}
          additionalControls={
            <ButtonGroup minimal={true}>
              <Popover
                content={
                  <InputGroup
                    placeholder="Window Title"
                    value={titleMap[id] || "No val"}
                    onChange={(evt: any) =>
                      setTitleMap({
                        ...titleMap,
                        ...{ [id]: evt.target.value },
                      })
                    }
                  ></InputGroup>
                }
              >
                <Button>Rename Window</Button>
              </Popover>
            </ButtonGroup>
          }
        >
          {nodes[id]}
        </MosaicWindow>
      )}
      zeroStateView={<MosaicZeroState createNode={createNode} />}
      initialValue={first_key}
    />
  );
};

export default WindowManager;
