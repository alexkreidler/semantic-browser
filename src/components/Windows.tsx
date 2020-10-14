import React, { useState } from "react"
import { Mosaic, MosaicWindow, MosaicZeroState } from "react-mosaic-component"

import { Button, ButtonGroup, Colors, Dialog, InputGroup, Intent, Popover, TextArea } from "@blueprintjs/core"
import { MultiWindow } from "./MultiWindow"

import { Session } from "./Session"
import { observer, Observer } from "mobx-react-lite"

export type WindowProps = { session: Session }

const DSER = "Deserialize from JSON"
const SER = "Serialize to JSON"
const DeserializeSubmission = observer(({ onSubmit }: { onSubmit: (input: string) => Error | undefined }) => {
  const [value, setValue] = useState("")
  const [error, setError] = useState<Error | undefined>(undefined)
  return (
    <div className="padded json-input">
      <TextArea
        large={true}
        placeholder="Paste JSON here..."
        fill={true}
        onChange={(evt) => setValue(evt.target.value)}
        value={value}
        intent={error ? Intent.DANGER : undefined}
      />
      {error ? <p style={{ color: Colors.RED1 }}>{error.toString()}</p> : null}
      <Button onClick={() => setError(onSubmit(value))}>Submit</Button>
    </div>
  )
})

// Should we allow the session.s.nodes themselvs to emit an OnChange and control the
// value of the window titles
export const WindowManager = observer<WindowProps>(({ session }) => {
  const [isOpen, setOpen] = useState(false)
  const [purpose, setPurpose] = useState<"ser" | "de">("ser")
  return (
    <>
      <Dialog title={purpose == "ser" ? SER : DSER} isOpen={isOpen} onClose={() => setOpen(!isOpen)}>
        {purpose == "ser" ? (
          <div className="padded">
            {/* <h1>Output</h1> */}
            <TextArea large={true} fill={true} value={session.serializeJSON()} />
          </div>
        ) : (
          <DeserializeSubmission onSubmit={(val) => session.fromJSON(val)}></DeserializeSubmission>
        )}
      </Dialog>
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
                    {/* TODO: Consider putting serialize and deserialize in
                    a Command Palette type interface using Blueprint Omnibar  */}
                    <Button
                      onClick={() => {
                        setPurpose("de")
                        setOpen(!isOpen)
                      }}
                    >
                      {DSER}
                    </Button>
                    <Button
                      onClick={() => {
                        setPurpose("ser")
                        setOpen(!isOpen)
                      }}
                    >
                      {SER}
                    </Button>
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

export default WindowManager
