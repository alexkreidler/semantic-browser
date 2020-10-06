import { Hydra } from "@alexkreidler/alcaeus"; // (or 'alcaeus/node')
import { toJSON } from "@semanticweb/loqu";

export const DEFAULT_ENTRYPOINT = "http://localhost:9090/hydraRoot/";

export async function getDocs(url: string): Promise<{ doc: any }> {
  console.log("Getting", url);

  const { response, representation } = await Hydra.loadResource(url);
  const rootResource = representation!.root!;

  // contains supported classes, operations, etc.
  const apiDocs = Hydra.apiDocumentations[0];
  console.log(Hydra.apiDocumentations);
  const d = apiDocs!.root!;

  return {
    doc: await toJSON(d, {
      "@context": "http://localhost:9090/context",
    }),
  };
}
