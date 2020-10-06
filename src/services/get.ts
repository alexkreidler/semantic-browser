import {
  ApiDocumentation,
  Class,
  DocumentedResource,
  Hydra,
} from "@alexkreidler/alcaeus"; // (or 'alcaeus/node')
import { toJSON } from "@semanticweb/loqu";

import * as hydra from "@rdfine/hydra";

export const DEFAULT_ENTRYPOINT = "http://localhost:9090/hydraRoot/";

const defaultContext = {
  "@context": "http://localhost:9090/context",
};

export async function getDocs(url: string): Promise<{ doc: any }> {
  console.log("Getting", url);

  const { response, representation } = await Hydra.loadResource(url);
  const rootResource = representation!.root!;

  // contains supported classes, operations, etc.
  const apiDocs = Hydra.apiDocumentations[0];
  console.log(Hydra.apiDocumentations);
  const d = apiDocs!.root! as ApiDocumentation;

  console.log(d);

  // console.log(d.classes);

  const h = (d as unknown) as hydra.ApiDocumentation;
  console.log(
    h.supportedClass.map((cls) => cls.title + " DESC: " + cls.description)
  );

  return {
    doc: await toJSON(d, defaultContext),
  };
}

export async function getEntities(
  url: string
): Promise<(Class & DocumentedResource)[]> {
  const { response, representation } = await Hydra.loadResource(url);
  const rootResource = representation!.root!;

  // contains supported classes, operations, etc.
  const apiDocs = Hydra.apiDocumentations[0];
  // console.log(Hydra.apiDocumentations);
  const d = apiDocs!.root! as ApiDocumentation;

  const cs = rootResource.getCollections();

  const outs = await Promise.all(
    cs.map(async (col) => {
      console.log(await toJSON(col));

      // We only use the first type from the hydra:collection linked node
      const tp = Array.from(col.types)[0];

      return tp;
    })
  );

  const entities = outs.map(
    (typ) =>
      // We only get one type of the same ID from the API documentation
      d.classes.filter((v) => typ.id.value === v.id.value)[0] as Class &
        DocumentedResource
  );
  console.log(entities);

  return entities;
}
