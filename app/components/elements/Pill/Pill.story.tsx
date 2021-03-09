import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import Pill, { PillProps } from './Pill';

export default {
  title: 'Components/elements/Pill',
  component: Pill,
} as Meta;

const Template: Story<PillProps> = (args) => <Pill {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  text: 'Single',
};

export const Highlight = Template.bind({});
Highlight.args = {
  highlight: true,
  text: 'Combined',
};
