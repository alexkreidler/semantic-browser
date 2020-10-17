import { Registry } from "@semanticweb/loqu"
import { GenericCard } from "./GenericCard"
import { GenericIcon } from "./GenericIcon"
import { GComp } from "./GenericListItem"
import { GenericPage } from "./GenericPage"

export const initialize = () => {
  Registry.register(GComp)
  Registry.register(GenericCard)
  Registry.register(GenericIcon)
  Registry.register(GenericPage)
}
