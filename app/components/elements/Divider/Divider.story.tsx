import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import Divider from './Divider';

export default {
  title: 'Components/elements/Divider',
  component: Divider,
} as Meta;

export const Example = () => (
  <>
    <div className="p-12 dark:bg-gray-800 bg-gray-50">
      <Divider />
    </div>
    <div className="p-12">
      <Divider />
    </div>
  </>
);

Example.storyName = 'Divider';
