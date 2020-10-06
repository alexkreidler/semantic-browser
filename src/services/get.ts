import { Class, Hydra, HydraResource } from "@alexkreidler/alcaeus"; // (or 'alcaeus/node')

// import { toJSON } from "@semanticweb/loqu";
// import { hydra } from "@tpluscode/rdf-ns-builders";

import _ from "lodash";

export const DEFAULT_ENTRYPOINT = "http://localhost:9090/hydraRoot/";

const defaultContext = {
  "@context": "http://localhost:9090/context",
};

export type Entity = { class: Class; resource: HydraResource };

export async function getEntities(url: string): Promise<Entity[]> {
  const { response, representation } = await Hydra.loadResource(url);
  const rootResource = representation!.root!;

  const links = rootResource.getLinks();

  const classes = links.map((l) => ({
    class: l.supportedProperty.property.range!,
  }));

  const resUnique = links.map((l) => {
    if (l.resources.length > 1) {
      throw new Error("Multiple links?!");
    }
    return { resource: l.resources[0] };
  });

  const out = _.merge(classes, resUnique);

  return out as Entity[];
}
