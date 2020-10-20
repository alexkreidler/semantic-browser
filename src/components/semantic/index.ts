import { Registry } from "@semanticweb/loqu"
import { PersonPage } from "./Person"

export const initialize = () => {
  Registry.register(PersonPage)
}
