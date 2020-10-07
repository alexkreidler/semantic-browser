import React from "react";
import { BaseState } from "./MultiWindow";
import {
  Collection,
  Hydra,
  HydraResource,
  Operation,
} from "@alexkreidler/alcaeus";
import { observer } from "mobx-react-lite";
import { useAsync } from "react-async-hook";
import { Card } from "@blueprintjs/core";
import { toJSON } from "@semanticweb/loqu";

export type CollectionState = {
  type: "Collection";
  resource: HydraResource;
  operation: Operation;
  // resourceIRI: string;
  // operationIRI: string;
};

const getCollection = async (op: Operation) => {
  console.log("got op", op);

  const out = (await op.invoke()).representation?.root!;
  console.log(await toJSON(out));
  return out;
};

const IntCollection = ({ c }: { c: HydraResource }) => {
  return (
    <div>
      <p>
        Collection ID: {c.id.value} Has {c.totalItems}
      </p>
      {c.members
        ? c.members.map((r: HydraResource) => {
            return (
              <Card>
                {r.id.value} Types:
                {Array.from(r.types.keys())
                  .map((r) => r.id.value)
                  .join(",")}
              </Card>
            );
          })
        : "Whoops, no members found!"}
    </div>
  );
};

export const CollectionView = observer(
  ({ data }: BaseState<CollectionState>) => {
    console.log(data);

    const stat = useAsync(getCollection, [data.operation]);
    return (
      <div className="window">
        <h1>Collection</h1>
        <p>{data.resource.id.value}</p>
        {stat.result ? (
          <IntCollection c={stat.result as Collection}></IntCollection>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
);
