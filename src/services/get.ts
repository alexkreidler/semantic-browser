import HydraClientFactory, { IApiDocumentation } from "@hydra-cg/heracles.ts";
// import axios from "axios";
import { Hydra } from "alcaeus/web"; // (or 'alcaeus/node')

// let httpCall = (url: string, opts?: RequestInit) =>
//   axios.get(url).then((r) => r);

let hydraClient = HydraClientFactory.configure()
  .withDefaults()
  // .with(httpCall)
  .andCreate();

export const examples = [
  "http://localhost:9090/home/",
  "http://wikibus-sources-staging.herokuapp.com/",
  "https://sources.test.wikibus.org/",
  "https://www.markus-lanthaler.com/hydra/event-api/",
  "https://www.markus-lanthaler.com/hydra/api-demo/",
];

export async function getDocs(
  url: string
): Promise<{ response: any; doc: any }> {
  console.log("Getting", url);

  const { response, representation } = await Hydra.loadResource(url);
  const rootResource = representation!.root!;

  // contains supported classes, operations, etc.
  const apiDocs = Hydra.apiDocumentations[0];

  const id = rootResource.id;
  console.log("Root id", id);

  return {
    response: await response?.xhr.json(),
    doc: rootResource,
  };
}
