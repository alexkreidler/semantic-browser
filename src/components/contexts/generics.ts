import { Registry } from "@semanticweb/loqu"
import { GenericCard } from "./GenericCard"
import { GenericIcon } from "./GenericIcon"
import { GComp } from "./GenericListItem"

export const initialize = () => {
  Registry.register(GComp)
  Registry.register(GenericCard)
  Registry.register(GenericIcon)
}
