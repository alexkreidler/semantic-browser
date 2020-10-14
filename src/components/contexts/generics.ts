import { Registry } from "@semanticweb/loqu"
import { GComp } from "./GenericListItem"

export const initialize = () => {
  Registry.register(GComp)
}
