import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import Logo, { LogoProps } from './Logo';

export default {
  title: 'Components/elements/Logo',
  component: Logo,
  argTypes: {
    size: { control: 'number' },
  },
} as Meta;

const Template: Story<LogoProps> = (args) => <Logo {...args} />;

export const Large = Template.bind({});
Large.args = {
  size: 100,
};

export const Small = Template.bind({});
Small.args = {
  size: 32,
};
