import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import VaultCard from './VaultCard';
import FundStatus from '../FundStatus/FundStatus';
import { VaultCardStatus } from './constants';
import { VaultCardProps } from './types';

export default {
  title: 'Components/modules/VaultCard',
  component: VaultCard,
} as Meta;

const Template: Story<VaultCardProps> = (args) => <VaultCard {...args} />;

export const Pending = () => <VaultCard status={VaultCardStatus.PENDING} />;

export const NFT = Template.bind({});
NFT.args = {
  image:
    'https://lh3.googleusercontent.com/Xxa2jwdrc68IADg17DXm5TdwtJ4TPtba3vt-s6gxATQkjcPDHpmV7FvGn7dE9y7DjwS1EzGnYfhUAf08garZoMTpOePxoVx2tiARseM',
  eyebrow: 'Cryptopunks',
  title: 'W#8196',
  text: 'Original price: 0.35 ETH',
};

export const Fund = Template.bind({});
Fund.args = {
  image:
    'https://lh3.googleusercontent.com/Xxa2jwdrc68IADg17DXm5TdwtJ4TPtba3vt-s6gxATQkjcPDHpmV7FvGn7dE9y7DjwS1EzGnYfhUAf08garZoMTpOePxoVx2tiARseM',
  eyebrow: '121 Wrapped Cryptopunks',
  title: 'PUNK-BASIC',
  text: <FundStatus amm={true} fin={true} ver={true} />,
  stack: true,
};
