import React from "react"
import { Meta } from "@storybook/react/types-6-0"
import { Card, ICardProps } from "@blueprintjs/core"

export default {
  title: "Components/Card",
  component: Card,
  argTypes: {
    interactive: { control: { type: "boolean" } },
    elevation: { control: { type: "range", min: 0, max: 4, step: 1 } },
    onClick: { action: "clicked" },
  },
} //as Meta

const Template: React.FC<ICardProps> = (props: ICardProps) => (
  <Card {...props}>
    <h1>Hey there</h1>
  </Card>
)

export const Basic = Template.bind({})
;(Basic as any).args = {
  elevation: 1,
  interactive: true,
}
