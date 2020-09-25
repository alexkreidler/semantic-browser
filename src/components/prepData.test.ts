import { prepData } from "./GenericNode";
import { parseJSON } from "./utils";

test("data prep", async () => {
  const filename = "../data/person.jsonld";
  const person = await parseJSON(filename);
  expect(person).toBeDefined();
  await prepData(person);
});
