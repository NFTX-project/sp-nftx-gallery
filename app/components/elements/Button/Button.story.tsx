import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import Button, { ButtonProps } from './Button';
import { Kind, Size } from './constants';
import { Icons } from '../Icon';

export default {
  title: 'Components/elements/Button',
  component: Button,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: Object.values(Size),
      },
    },
    kind: {
      control: {
        type: 'select',
        options: Object.values(Kind),
      },
    },
    icon: {
      control: {
        type: 'select',
        options: Object.values(Icons),
      },
    },
  },
} as Meta;

const Template: Story<ButtonProps> = (args) => (
  <div className="p-10 dark:bg-gray-900 bg-gray-50">
    <Button {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  kind: Kind.PRIMARY,
  children: 'Invest in PUNK-BASIC',
};

export const Secondary = Template.bind({});
Secondary.args = {
  kind: Kind.SECONDARY,
  children: 'Manage fund',
};

export const Icon = Template.bind({});
Icon.args = {
  kind: Kind.ICON,
  children: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
      />
    </svg>
  ),
};
