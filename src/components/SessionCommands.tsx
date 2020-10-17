import React, { useState } from "react"
import { Command, CommandPalette } from "./CommandPalette"
import { DSER, SER } from "./serialize"
import { Session } from "./Session"
import { SessionState } from "./SessionState"

interface ISessionProps {
  session: Session
}

export const SessionCommands: React.FC<ISessionProps> = ({ session }) => {
  const [isOpen, setOpen] = useState(false)
  const [purpose, setPurpose] = useState<"ser" | "de">("ser")
  const commands: Command[] = [
    {
      title: "Serialize",
      description: SER,
      handler: () => {
        setPurpose("ser")
        setOpen(true)
      },
    },
    {
      title: "Deserialize",
      description: DSER,
      handler: () => {
        setPurpose("de")
        setOpen(true)
      },
    },
  ]
  return (
    <>
      <SessionState isOpen={isOpen} purpose={purpose} onClose={() => setOpen(!isOpen)} session={session}></SessionState>
      <CommandPalette commands={commands}></CommandPalette>
    </>
  )
}
