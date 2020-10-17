import React from "react"
import { Mosaic, MosaicWindow, MosaicZeroState } from "react-mosaic-component"

import { Button, ButtonGroup, InputGroup, Popover } from "@blueprintjs/core"
import { MultiWindow } from "./MultiWindow"

import { Session } from "./Session"
import { observer, Observer } from "mobx-react-lite"
import { SessionCommands } from "./SessionCommands"

export type WindowProps = { session: Session }

// Should we allow the session.s.nodes themselvs to emit an OnChange and control the
// value of the window titles
export const WindowManager = observer<WindowProps>(({ session }) => {
  return (
    <>
      <SessionCommands session={session}></SessionCommands>
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
                          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                            session.s.nodes[id].title = evt.target.value
                          }}
                        ></InputGroup>
                      }
                    >
                      <Button>Rename Window</Button>
                    </Popover>
                    <Button onClick={session.resetTitle(id)}>Reset Window Name</Button>
                  </ButtonGroup>
                }
              >
                <MultiWindow session={session} id={id}></MultiWindow>
              </MosaicWindow>
            )}
          </Observer>
        )}
        zeroStateView={<MosaicZeroState createNode={session.createNode} />}
        // initialValue={session.s.mosaicState}
        value={session.s.mosaicState}
        onChange={(m) => {
          session.s.mosaicState = m!
        }}
      />
    </>
  )
})

// export default WindowManager
