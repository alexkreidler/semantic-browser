import { Button, Colors, Dialog, Intent, TextArea } from "@blueprintjs/core"
import { observer } from "mobx-react-lite"
import React, { useState } from "react"
import { DSER, SER } from "./serialize"
import { ISessionProps } from "./Session"

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

export interface ISessionStateProps extends ISessionProps {
  isOpen: boolean
  purpose: "ser" | "de"
  onClose: () => void
}

export const SessionState: React.FC<ISessionStateProps> = ({ session, isOpen, purpose, onClose }) => {
  return (
    <Dialog title={purpose === "ser" ? SER : DSER} isOpen={isOpen} onClose={onClose}>
      {purpose === "ser" ? (
        <div className="padded">
          {/* <h1>Output</h1> */}
          <TextArea large={true} fill={true} value={session.serializeJSON()} />
        </div>
      ) : (
        <DeserializeSubmission onSubmit={(val) => session.fromJSON(val)}></DeserializeSubmission>
      )}
    </Dialog>
  )
}
