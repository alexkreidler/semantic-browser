import React, { useState } from "react";
import {
  CreateNode,
  Mosaic,
  MosaicWindow,
  MosaicZeroState,
} from "react-mosaic-component";

// doesn't work in jest
// import "@mosaic/theme.css";
// import "@blueprintjs/core/lib/css/blueprint.css";
// import "@blueprintjs/icons/lib/css/blueprint-icons.css";

import "react-mosaic-component/react-mosaic-component.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

import { ulid } from "ulid";
import { Button, ButtonGroup, InputGroup, Popover } from "@blueprintjs/core";
import { MultiWindow, WindowState } from "./MultiWindow";
// import _ from "lodash";

export type WindowManagerProps = {};
export type ViewId = string;
export type Nodes = { [viewId: string]: JSX.Element };

const first_key = ulid();
const nodes: Nodes = {
  [first_key]: <MultiWindow data={{ type: "NewWindow" }}></MultiWindow>,
};

// Should we allow the windows themselvs to emit an OnChange and control the
// value of the window titles
export const WindowManager: React.FC<WindowManagerProps> = () => {
  const [titleMap, setTitleMap] = useState({ [first_key]: "Window #1" });
  const [windows, setWindows] = useState(nodes);
  function createNode(windowContext?: WindowState) {
    console.log("args", windowContext);

    const id = ulid();
    setWindows({
      ...windows,
      ...{
        [id]: (
          <MultiWindow
            data={windowContext || { type: "NewWindow" }}
          ></MultiWindow>
        ),
      },
    });
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
          {windows[id]}
        </MosaicWindow>
      )}
      zeroStateView={<MosaicZeroState createNode={createNode} />}
      initialValue={first_key}
    />
  );
};

export default WindowManager;
