import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import Poster, { PosterProps } from './Poster';
import { Colorway } from './constants';

export default {
  title: 'Components/modules/Poster',
  component: Poster,
} as Meta;

const Template: Story<PosterProps> = (args) => <Poster {...args} />;

export const Hashmasks = Template.bind({});
Hashmasks.args = {
  image:
    'https://s3-alpha-sig.figma.com/img/3636/6803/78d21e99855f7639c169821216721b77?Expires=1613952000&Signature=eFaoMUP5H4brqU2nrm~LqXXINbtEIcgK4yvz8yI4inKxjcbOFyjQKZzicjQ4HonAhUKW2lHFMHrKMk2p-SNUL-r6Fv1A~pkWkMfEmexy0rQSmCWLOO1HwIzyYKfaHkQS-tNOaJPw1~xAIYOuZDYVvaHT0sVnNhWO-w0dChX~tlc47IM396IbrzZeAv31W5HCEgleod2OLYgxrC8HPln51sn42DmTT3kz~Uizc0-4-TfKTnEDmXmWpyOCOL~DWvO2EdKW9KUB9cQDndEMKK8xL1IIwJspEmcaa3oTXpgnvhrPp4UbohCjxMLekHeEli9PKC3~bCfI4~qgruqH5w~8Iw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
  title: 'Hashmasks',
  text: '1 fund',
  background: 'orange',
  colorway: Colorway.DARK,
};

export const Axies = Template.bind({});
Axies.args = {
  image:
    'https://cdn.substack.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F24229461-9fdc-49a3-a608-89aacc8d7b74_480x380.png',
  title: 'Axies',
  text: '2 funds',
  background: 'green',
};

export const List: Story<PosterProps> = (args) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <Poster {...Hashmasks.args} />
    <Poster {...Axies.args} />
    <Poster {...Hashmasks.args} />
    <Poster {...Axies.args} />
  </div>
);
