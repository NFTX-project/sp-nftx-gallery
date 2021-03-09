import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import AssetDetail from './AssetDetail';
import { AssetDetailStatus } from './constants';
import { AssetDetailProps } from './types';

export default {
  title: 'Components/Modules/AssetDetail',
  component: AssetDetail,
} as Meta;

const Template: Story<AssetDetailProps> = (args) => <AssetDetail {...args} />;

export const Pending = () => <AssetDetail status={AssetDetailStatus.PENDING} />;

export const Ready = Template.bind({});
Ready.args = {
  image:
    'https://lh3.googleusercontent.com/Xxa2jwdrc68IADg17DXm5TdwtJ4TPtba3vt-s6gxATQkjcPDHpmV7FvGn7dE9y7DjwS1EzGnYfhUAf08garZoMTpOePxoVx2tiARseM',
  eyebrow: 'PUNK-BASIC',
  title: 'W#8196',
  name: 'WRAPPED Cryptopunk',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};
