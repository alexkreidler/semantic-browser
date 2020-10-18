import { Card } from "@blueprintjs/core"
import { observer } from "mobx-react-lite"
import React, { useContext } from "react"
import { ISessionProps } from "./Session"
import { useDrag } from "react-dnd"
import { Node } from "./Session"
import { MosaicDragItem, MosaicDropData } from "react-mosaic-component/lib/internalTypes"
import { createDragToUpdates, MosaicContext } from "react-mosaic-component"
import { InternalDropTargetProps } from "react-mosaic-component/lib/MosaicWindow"
import { isEqual } from "lodash"

interface MDrag extends MosaicDragItem {
  type: "MosaicWindow"
  nodeID: string
}

const DraggableWindow: React.FC<{ node: Node } & ISessionProps> = ({ node, session }) => {
  const dragItem: MDrag = { mosaicId: session.s.mosaicId, nodeID: node.id, hideTimer: 0, type: "MosaicWindow" }

  const mosaic = useContext(MosaicContext)

  const [, drag] = useDrag<MDrag, MosaicDropData, InternalDropTargetProps>({
    item: dragItem,
    end: (item, monitor) => {
      // TODO: is the timer stuff necessary
      // const { hideTimer } = monitor.getItem() as MosaicDragItem
      // If the hide call hasn't happened yet, cancel it
      // window.clearTimeout(hideTimer)

      const dropResult: MosaicDropData = (monitor.getDropResult() || {}) as MosaicDropData
      const { position, path: destinationPath } = dropResult

      // The source path is the path of the node currently selected by the user in the window controller sidebar
      const sourcePath = node.path
      if (position != null && destinationPath != null && !isEqual(destinationPath, sourcePath)) {
        const update = createDragToUpdates(mosaic.mosaicActions.getRoot()!, sourcePath, destinationPath, position)
        mosaic.mosaicActions.updateTree(update)
      }
    },
  })

  return (
    <div ref={drag} key={node.id}>
      <Card className="window-entry">{node.title}</Card>
    </div>
  )
}
export const WindowSidePanel: React.FC<ISessionProps> = observer(({ session }) => {
  return (
    <div className="window">
      <h1>Window Controller</h1>
      {Object.entries(session.s.nodes).map(([, node]) => {
        return <DraggableWindow node={node} session={session}></DraggableWindow>
      })}
    </div>
  )
})
