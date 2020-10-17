import React, { Component } from "react"

import { Hotkey, Hotkeys, MenuItem } from "@blueprintjs/core"

import { HotkeysTarget } from "@blueprintjs/core/lib/esnext/components/hotkeys/hotkeysTarget.js"
import { ItemRenderer, ItemPredicate, Omnibar } from "@blueprintjs/select"

export type Command = {
  id: string
  title: string
  description: string
  handler: (...args: any[]) => void
}

const CommandSelect = Omnibar.ofType<Command>()

const filterCommand: ItemPredicate<Command> = (query, command) => {
  return command.title.toLowerCase().indexOf(query.toLowerCase()) >= 0
}

const renderCommand: ItemRenderer<Command> = (command, { handleClick, modifiers }) => {
  if (!modifiers.matchesPredicate) {
    return null
  }
  return (
    <MenuItem
      active={modifiers.active}
      key={command.title}
      label={command.description}
      onClick={handleClick}
      text={command.title}
    />
  )
}

{
  /* <CommandSelect itemPredicate={filterCommand} itemRenderer={renderCommand} items={...} onItemSelect={...} /> */
}

export interface ICommandPaletteProps {
  commands: Command[]
  handlerArgs?: Record<string, any[]>
}

interface ICommandPaletteState {
  isOpen: boolean
}

@HotkeysTarget
export class CommandPalette extends Component<ICommandPaletteProps, ICommandPaletteState> {
  // private commands: Command[]
  public state = {
    isOpen: false,
  }

  constructor(props: ICommandPaletteProps) {
    super(props)
    // makeAutoObservable(this)
    // makeObservable(this, {

    // })
    // this.commands = props.commands
  }

  private handleToggle = () => this.setState({ isOpen: !this.state.isOpen })
  public renderHotkeys(): React.ReactElement {
    return (
      <Hotkeys>
        <Hotkey
          global={true}
          combo="shift + p"
          label="Show Omnibar"
          onKeyDown={this.handleToggle}
          // prevent typing "O" in omnibar input
          preventDefault={true}
        />
      </Hotkeys>
    )
  }

  render(): React.ReactElement {
    return (
      <CommandSelect
        overlayProps={{ canEscapeKeyClose: true, canOutsideClickClose: true }}
        onItemSelect={(item) => {
          console.log(`selected ${item.title}`)
          this.handleToggle()
          if (this.props.handlerArgs) {
            item.handler(...this.props.handlerArgs[item.id])
          } else {
            item.handler()
          }
        }}
        isOpen={this.state.isOpen}
        itemPredicate={filterCommand}
        itemRenderer={renderCommand}
        items={this.props.commands}
        noResults={<MenuItem disabled={true} text="No results." />}
        onClose={this.handleToggle}
      />
    )
  }
}
