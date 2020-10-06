import React, { useState } from "react";
import {
  CreateNode,
  Mosaic,
  MosaicNode,
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
import { MultiWindow } from "./MultiWindow";
import _ from "lodash";

import { Session } from "./Session";
import { observer, Observer } from "mobx-react-lite";

export type WindowProps = { session: Session };

// Should we allow the session.s.nodes themselvs to emit an OnChange and control the
// value of the window titles
export const WindowManager = observer<WindowProps>(({ session }) => {
  return (
    <Mosaic<string>
      renderTile={(id, path) => (
        <Observer>
          {() => (
            <MosaicWindow<string>
              path={path}
              title={session.s.nodes[id].title}
              createNode={session.createNode}
              additionalControls={
                <ButtonGroup minimal={true}>
                  <Popover
                    content={
                      <InputGroup
                        placeholder="Window Title"
                        value={session.s.nodes[id].title}
                        // TODO: OnChange fix here.
                        // Tried earlier seemed useState was causing lots of overhead/perf issues
                        onChange={(evt: any) => {
                          session.s.nodes[id].title = evt.target.value;
                        }}
                      ></InputGroup>
                    }
                  >
                    <Button>Rename Window</Button>
                  </Popover>
                </ButtonGroup>
              }
            >
              <MultiWindow data={session.s.nodes[id].data}></MultiWindow>
            </MosaicWindow>
          )}
        </Observer>
      )}
      zeroStateView={<MosaicZeroState createNode={session.createNode} />}
      initialValue={session.s.mosaicState}
      // onChange={(m) => console.log(m)}
    />
  );
});

export default WindowManager;
