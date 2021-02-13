import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import AssetDetail from './AssetDetail';
import FundStatus from '../FundStatus/FundStatus';
import { AssetDetailStatus } from './constants';
import { AssetDetailProps } from './types';

export default {
  title: 'Components/AssetDetail',
  component: AssetDetail,
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#0c0c0c' }],
    },
  },
} as Meta;

const Template: Story<AssetDetailProps> = (args) => <AssetDetail {...args} />;

export const NFT = Template.bind({});
NFT.args = {
  image:
    'https://lh3.googleusercontent.com/Xxa2jwdrc68IADg17DXm5TdwtJ4TPtba3vt-s6gxATQkjcPDHpmV7FvGn7dE9y7DjwS1EzGnYfhUAf08garZoMTpOePxoVx2tiARseM',
  eyebrow: 'PUNK-BASIC',
  title: 'W#8196',
  name: 'WRAPPED Cryptopunk',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};
