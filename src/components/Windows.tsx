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
import _ from "lodash";

export type WindowManagerProps = {};
export type ViewId = string;
export type Nodes = {
  [viewId: string]: {
    title: string;
    data: WindowState;
  };
};

// const NW = { type: "NewWindow" };
const first_key = ulid();
const nodes: Nodes = {
  [first_key]: {
    title: "Window #1",
    data: { type: "NewWindow" },
  },
};

// Should we allow the windows themselvs to emit an OnChange and control the
// value of the window titles
export const WindowManager: React.FC<WindowManagerProps> = () => {
  const [windows, setWindows] = useState(nodes);
  function createNode(windowContext?: WindowState) {
    console.log("args", windowContext);

    const id = ulid();
    setWindows({
      ...windows,
      ...{
        [id]: {
          title: `Window #${Object.keys(windows).length + 1}`,
          data: windowContext || { type: "NewWindow" },
        },
      },
    });
    return id;
  }
  console.log(windows);

  return (
    <Mosaic<string>
      renderTile={(id, path) => (
        <MosaicWindow<string>
          path={path}
          title={windows[id].title}
          createNode={createNode}
          additionalControls={
            <ButtonGroup minimal={true}>
              <Popover
                content={
                  <InputGroup
                    placeholder="Window Title"
                    value={windows[id].title}
                    // TODO: OnChange fix here.
                    // Tried earlier seemed useState was causing lots of overhead/perf issues
                  ></InputGroup>
                }
              >
                <Button>Rename Window</Button>
              </Popover>
            </ButtonGroup>
          }
        >
          <MultiWindow data={windows[id].data}></MultiWindow>
        </MosaicWindow>
      )}
      zeroStateView={<MosaicZeroState createNode={createNode} />}
      initialValue={first_key}
    />
  );
};

export default WindowManager;
