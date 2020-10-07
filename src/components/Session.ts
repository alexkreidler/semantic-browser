import { ulid } from "ulid"
import { WindowState } from "./MultiWindow"
import { MosaicNode } from "react-mosaic-component"

import { makeAutoObservable } from "mobx"
// import { HydraClient } from "@alexkreidler/alcaeus/alcaeus";
// import datasetIndexed from "rdf-dataset-indexed";
// import { create } from "@alexkreidler/alcaeus";

// import formats from "@rdfjs/formats-common";
// import { HydraClient } from "@alexkreidler/alcaeus/dist/types/alcaeus";
// import DatasetIndexed from "rdf-dataset-indexed/dataset";
// const parsers = formats.parsers;

export type ViewId = string
export type Nodes = {
  [viewId: string]: {
    idx: number
    title: string
    data: WindowState
  }
}

export interface ISession {
  nodes: Nodes
  mosaicState: MosaicNode<ViewId>
}
type Basic = () => void
export class Session {
  public s: ISession
  // private h: HydraClient;
  // private data: DatasetIndexed;

  constructor() {
    // this.data = datasetIndexed();
    // this.h = create({
    //   dataset: this.data,
    //   fetch,
    //   Headers,
    //   parsers,
    //   datasetFactory: datasetIndexed,
    // });
    // this.data.size

    const first_key = ulid()
    this.s = {
      nodes: {
        [first_key]: {
          idx: 1,
          title: "Window #1",
          data: { type: "NewWindow" }
        }
      },
      mosaicState: first_key
    }
    makeAutoObservable(this)
  }

  createNode = (windowContext?: WindowState) => {
    // console.log("args", windowContext);

    const id = ulid()
    const idx = Object.keys(this.s.nodes).length + 1
    this.s.nodes[id] = {
      idx,
      title: `Window #${idx}`,
      data: windowContext || { type: "NewWindow" }
    }
    return id
  }

  resetTitle = (id: ViewId): (() => void) => {
    const rst = () => {
      const node = this.s.nodes[id]
      node.title = `Window #${node.idx}`
    }
    return rst
  }

  out = (): ISession => {
    return this.s
  }
  serializeJSON = (): string => {
    return JSON.stringify(this.s)
  }
  serializeURLString = (): string => {
    return encodeURIComponent(JSON.stringify(this.s))
  }

  fromJSON = (input: string): Error | undefined => {
    let out
    try {
      out = JSON.parse(input)
    } catch (error) {
      return error
    }
    // TODO: maybe validate this a bit more before accepting
    this.s = out
  }
}
