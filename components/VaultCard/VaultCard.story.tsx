import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import VaultCard, { VaultCardProps } from './VaultCard';

export default {
  title: 'Components/VaultCard',
  component: VaultCard,
  argTypes: {
    image: { control: 'text' },
    eyebrow: { control: 'text' },
    title: { control: 'text' },
    text: { control: 'text' },
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#0c0c0c' }],
    },
  },
} as Meta;

export const Base: Story<VaultCardProps> = (args) => (
  <div className="bg-gray-900">
    <VaultCard {...args} />
  </div>
);
Base.args = {
  image:
    'https://lh3.googleusercontent.com/Xxa2jwdrc68IADg17DXm5TdwtJ4TPtba3vt-s6gxATQkjcPDHpmV7FvGn7dE9y7DjwS1EzGnYfhUAf08garZoMTpOePxoVx2tiARseM',
  eyebrow: 'Cryptopunks',
  title: 'W#8196',
  text: 'Original price: 0.35 ETH',
};
