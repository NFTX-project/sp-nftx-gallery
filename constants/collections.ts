import { Colorway } from '@/components/Poster';

// Popular collections - hard coded for now
export default [
  {
    items: ['hashmasks'],
    href: 'hashmasks',
    image: '/images/posters/hashmasks.jpg',
    colorway: Colorway.LIGHT,
    namespace: 'hashmasks',
    contract: '0xc2c747e0f7004f9e8817db2ca4997657a7746928',
  },
  {
    items: ['wrapped-cryptopunks', 'punk-core'],
    href: 'cryptopunks',
    image: '/images/posters/wrapped-cryptopunks.png',
    colorway: Colorway.LIGHT,
    namespace: 'cryptopunks',
    contract: '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb',
  },
  // {
  //   items: ['axie'],
  //   href: 'axies',
  //   image: '/images/posters/axie.png',
  //   colorway: Colorway.LIGHT,
  //   namespace: 'axie',
  //   contract: '0xf5b0a3efb8e8e4c201e2a935f110eaaf3ffecb8d',
  // },
  // {
  //   items: ['cryptokitties'],
  //   href: 'cryptokitties',
  //   image: '/images/posters/cryptokitties.png',
  //   colorway: Colorway.DARK,
  //   namespace: 'cryptokitties',
  //   contract: '0x06012c8cf97bead5deae237070f9587f8e7a266d',
  // },
];
