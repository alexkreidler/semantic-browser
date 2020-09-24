import React from "react";
import { Mosaic, MosaicWindow, MosaicZeroState } from "react-mosaic-component";

// doesn't work in jest
// import "@mosaic/theme.css";
// import "@blueprintjs/core/lib/css/blueprint.css";
// import "@blueprintjs/icons/lib/css/blueprint-icons.css";

import "react-mosaic-component/react-mosaic-component.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

import { Button } from "@blueprintjs/core";
// import "./app.css";
// export class WindowManager implements React.Componen<{}, {}> {

//   createNode(): string {
//     let id = "hi";
//     this.nodes[id] = <div>New Node</div>;
//     return id;
//   }
//   render() {
//     return (
//     );
//   }
// }
import { ulid } from "ulid";
import NewWindow from "./NewWindow";

export type WindowManagerProps = {};
export const WindowManager: React.FC<WindowManagerProps> = () => {
  let nodes: { [viewId: string]: JSX.Element } = {
    a: <NewWindow></NewWindow>,
  };
  function createNode() {
    const id = ulid();
    nodes[id] = <NewWindow></NewWindow>;
    return id;
  }
  return (
    <Mosaic<string>
      renderTile={(id, path) => (
        <MosaicWindow<string>
          path={path}
          title={`Window ${id}`}
          createNode={createNode}
        >
          {nodes[id]}
        </MosaicWindow>
      )}
      zeroStateView={<MosaicZeroState createNode={createNode} />}
      initialValue={"a"}
    />
  );
};

export default WindowManager;
