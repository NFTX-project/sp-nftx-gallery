import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import Icon, { IconProps } from './Icon';
import { Icons } from './constants';

export default {
  title: 'Components/elements/Icon',
  component: Icon,
  argTypes: {
    name: {
      control: {
        type: 'select',
        options: Object.values(Icons),
      },
    },
    color: {
      control: 'color',
    },
  },
} as Meta;

const Template: Story<IconProps> = ({ color, ...args }) => (
  <div style={{ color }}>
    <Icon {...args} />
  </div>
);

export const Checked = Template.bind({});
Checked.args = {
  name: Icons.CHECK_CIRCLE,
};

export const Cross = Template.bind({});
Cross.args = {
  name: Icons.X_CIRCLE,
};
