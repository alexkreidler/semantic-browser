import { ulid } from "ulid";
import { Button, ButtonGroup, InputGroup, Popover } from "@blueprintjs/core";
import { MultiWindow, WindowState } from "./MultiWindow";
import { MosaicNode } from "react-mosaic-component";

import { makeAutoObservable } from "mobx";

export type ViewId = string;
export type Nodes = {
  [viewId: string]: {
    title: string;
    data: WindowState;
  };
};

export interface ISession {
  nodes: Nodes;
  mosaicState: MosaicNode<ViewId>;
}

export class Session {
  public s: ISession;

  constructor() {
    const first_key = ulid();
    this.s = {
      nodes: {
        [first_key]: {
          title: "Window #1",
          data: { type: "NewWindow" },
        },
      },
      mosaicState: first_key,
    };
    makeAutoObservable(this);
  }

  createNode = (windowContext?: WindowState) => {
    // console.log("args", windowContext);

    const id = ulid();
    this.s.nodes[id] = {
      title: `Window #${Object.keys(this.s.nodes).length + 1}`,
      data: windowContext || { type: "NewWindow" },
    };
    return id;
  };

  out = (): ISession => {
    return this.s;
  };
  serializeJSON = (): string => {
    return JSON.stringify(this.s);
  };
  serializeURLString = (): string => {
    return encodeURIComponent(JSON.stringify(this.s));
  };
}
