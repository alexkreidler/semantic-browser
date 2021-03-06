import React from "react"
import { ExpandButton, Mosaic, MosaicNode, MosaicWindow, MosaicZeroState } from "react-mosaic-component"

import { Button, ButtonGroup, InputGroup, Popover } from "@blueprintjs/core"
import { MultiWindow } from "./MultiWindow"

import { ISessionProps } from "./Session"
import { observer, Observer } from "mobx-react-lite"
import { SessionCommands } from "./SessionCommands"
import { WindowSidePanel } from "./WindowSidePanel"
import { DndProvider } from "react-dnd"
import MultiBackend from "react-dnd-multi-backend"
import HTML5ToTouch from "react-dnd-multi-backend/dist/cjs/HTML5toTouch"
import { action } from "mobx"

export type WindowProps = ISessionProps //{ session: Session }

export const WindowManagerID = "WindowManager"

// Should we allow the session.s.nodes themselvs to emit an OnChange and control the
// value of the window titles
export const WindowManager = observer<WindowProps>(({ session }) => {
  return (
    <>
      {/* @ts-ignore */}
      <DndProvider backend={MultiBackend} options={HTML5ToTouch}>
        <SessionCommands session={session}></SessionCommands>
        {/* TODO: maybe mosaic without context */}
        <Mosaic<string>
          mosaicId="mainWindow"
          renderTile={(id, path) => (
            <Observer key={id}>
              {() => {
                if (id === WindowManagerID) {
                  return (
                    <MosaicWindow<string>
                      path={path}
                      title="Window Controller"
                      toolbarControls={[<ExpandButton key="expand" />]}
                      createNode={session.createNode}
                    >
                      <WindowSidePanel session={session}></WindowSidePanel>
                    </MosaicWindow>
                  )
                }
                session.s.nodes[id].path = path
                return (
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
                              onChange={action((evt: React.ChangeEvent<HTMLInputElement>) => {
                                session.s.nodes[id].title = evt.target.value
                              })}
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
                )
              }}
            </Observer>
          )}
          zeroStateView={<MosaicZeroState createNode={session.createNode} />}
          // initialValue={session.s.mosaicState}
          value={session.s.mosaicState}
          // removing, adding, moving, resizing, etc.
          onChange={action("update mosaic state", (m: MosaicNode<string> | null) => {
            if (!m) {
              console.error("Failed to update mosaic state")
              return
            }

            session.s.mosaicState = m
          })}
        />
      </DndProvider>
    </>
  )
})

// export default WindowManager
