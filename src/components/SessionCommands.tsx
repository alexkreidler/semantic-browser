import React, { useContext, useState } from "react"
import { MosaicWindowContext } from "react-mosaic-component"
import { Command, CommandPalette } from "./CommandPalette"
import { WindowContext } from "./MultiWindow"
import { DSER, SER } from "./serialize"
import { ISessionProps, Session } from "./Session"
import { SessionState } from "./SessionState"

export const SessionCommands: React.FC<ISessionProps> = ({ session }) => {
  const [isOpen, setOpen] = useState(false)
  const [purpose, setPurpose] = useState<"ser" | "de">("ser")

  // const wctx = useContext(MosaicWindowContext)
  const commands: Command[] = [
    {
      id: "ser",
      title: "Serialize",
      description: SER,
      handler: () => {
        setPurpose("ser")
        setOpen(true)
      },
    },
    {
      id: "de",
      title: "Deserialize",
      description: DSER,
      handler: () => {
        setPurpose("de")
        setOpen(true)
      },
    },
    {
      id: "test",
      title: "New Test Resource",
      description: "..",
      handler: () => {
        console.log("new", session)
        session.createNode({
          type: "Resource",
          iri: "http://schema.org/Person",
        })
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
