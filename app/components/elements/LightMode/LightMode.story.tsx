import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import LightMode, { LightModeProps } from './LightMode';

export default {
  title: 'Components/elements/LightMode',
  component: LightMode,
  argTypes: {
    size: { control: 'number' },
  },
} as Meta;

const Template: Story<LightModeProps> = (args) => <LightMode {...args} />;

export const Large = Template.bind({});
Large.args = {
  size: 100,
};

export const Small = Template.bind({});
Small.args = {
  size: 18,
};
