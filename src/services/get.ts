import HydraClientFactory, { IApiDocumentation } from "@hydra-cg/heracles.ts";
// import axios from "axios";

// let httpCall = (url: string, opts?: RequestInit) =>
//   axios.get(url).then((r) => r);

let hydraClient = HydraClientFactory.configure()
  .withDefaults()
  // .with(httpCall)
  .andCreate();

export const examples = [
  "http://wikibus-sources-staging.herokuapp.com/",
  "https://sources.test.wikibus.org/",
  "https://www.markus-lanthaler.com/hydra/event-api/",
  "https://www.markus-lanthaler.com/hydra/api-demo/",
  "http://localhost:9090/home/",
];

export async function getDocs(
  url: string
): Promise<{ response: any; doc: IApiDocumentation }> {
  console.log("Getting", url);

  const r = await hydraClient.getResource(url);
  const doc = await hydraClient.getApiDocumentation(url);
  let val = await r.json();

  let xv = r.toArray();
  console.log(xv);

  let it = r.getIterator();
  console.log(it);
  // r.it
  console.log(r);

  console.log(val); //, JSON.stringify(val, null, 2));
  let v2 = doc;
  console.log(v2); //, JSON.stringify(v2, null, 2));

  console.log("end");

  // let u2 = url + "books/";
  // console.log("u2:", u2);

  // const r2 = await hydraClient.getResource(u2).catch((e) => console.log(e));
  // console.log(r2);

  // let v3 = r2 ? r2.json() : undefined;
  // console.log(v3);

  return {
    response: JSON.stringify(val, null, 2),
    doc: doc,
  };
}
