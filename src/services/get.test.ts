/**
 * @jest-environment node
 */
import { getDocs, examples } from "./get";

test("fetch resource", async () => {
  await getDocs(examples[0]);
});
