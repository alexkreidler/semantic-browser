import React from "react"
import { Meta, Story } from "@storybook/react/types-6-0"
import { Card, ICardProps } from "@blueprintjs/core"

export default {
  title: "Components/Card",
  component: Card,
  argTypes: {
    interactive: { control: { type: "boolean" } },
    elevation: { control: { type: "range", min: 0, max: 4, step: 1 } },
    onClick: { action: "clicked" },
  },
} as Meta

const Template: Story<ICardProps> = (props: ICardProps) => (
  <Card {...props}>
    <h1>Hey there</h1>
  </Card>
)

export const Basic = Template.bind({})
Basic.args = {
  elevation: 1,
  interactive: true,
}
