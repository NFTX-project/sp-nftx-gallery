import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import FundStatus, { FundStatusProps } from './FundStatus';

export default {
  title: 'Components/modules/FundStatus',
  component: FundStatus,
  argTypes: {},
} as Meta;

const Template: Story<FundStatusProps> = (args) => <FundStatus {...args} />;

export const Active = Template.bind({});
Active.args = {
  amm: true,
  ver: true,
  fin: true,
};

export const Inactive = Template.bind({});
Inactive.args = {
  fin: false,
  ver: false,
  amm: false,
};

export const Partial = Template.bind({});
Partial.args = {
  fin: true,
  ver: true,
  amm: false,
};
