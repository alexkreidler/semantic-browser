import { Session, ViewId } from "./Session"
import { observer } from "mobx-react-lite"
import React, { createContext, useContext } from "react"
import { CollectionView, CollectionState } from "./Collection"
import { NewWindow, NewWindowState } from "./NewWindow"

import { makeAutoObservable } from "mobx"
import { MosaicWindowContext } from "react-mosaic-component"
import { ResourceState, ResourceView } from "./Resource"
import { initialize } from "./contexts/generics"
// import { TestGenerics } from "./TestGenerics"
export type MultiWindowProps = {
  id: ViewId
  session: Session
}

export type WindowState = NewWindowState | CollectionState | ResourceState

export interface IWindowControl {
  updateCurrentWindow(data: WindowState): void
  newWindow(data: WindowState): void
}

// We might not have even needed to put this in its own class
// The issue was observer(Collection)
/** Window stores reference to a Session and an ID */
class Window implements IWindowControl {
  private r: Session
  private id: ViewId
  private wctx: MosaicWindowContext

  constructor(sess: Session, id: ViewId, wctx: MosaicWindowContext) {
    this.r = sess
    this.id = id
    this.wctx = wctx
    makeAutoObservable(this)
  }

  newWindow = (data: WindowState) => {
    // this.r.createNode(data);
    this.wctx.mosaicWindowActions.split(data)
  }

  updateCurrentWindow = (data: WindowState) => {
    console.log("update!")

    this.r.s.nodes[this.id].data = data
  }
}

//@ts-ignore
export const WindowContext = createContext<IWindowControl>()

initialize()

// TODO: design common window base component props.
// E.g. switchWindow changes the underlying window rendered by MultiWindow
// and newWindow, obviously creates new window node
export const MultiWindow = observer(({ id, session }: MultiWindowProps) => {
  const wctx = useContext(MosaicWindowContext)
  const data = session.s.nodes[id].data

  const ab = (d: typeof data) => {
    switch (d.type) {
      case "NewWindow":
        return <NewWindow></NewWindow>

      case "Collection":
        return <CollectionView data={d}></CollectionView>

      case "Resource":
        return <ResourceView data={d}></ResourceView>

      default:
        return <>Whoops! There's been an error.</>
    }
  }

  return <WindowContext.Provider value={new Window(session, id, wctx)}>{ab(data)}</WindowContext.Provider>
})

export type BaseState<T> = {
  data: T
  // We used to pass window controller through props
  // It's easier via context
  // wc: IWindowControl;
}
