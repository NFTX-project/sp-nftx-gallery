import { Colorway } from '@/components/Poster';

// Popular collections - hard coded for now
export default [
  {
    items: ['hashmasks'],
    href: 'hashmasks',
    image: '/images/posters/hashmasks.jpg',
    colorway: Colorway.LIGHT,
    namespace: 'hashmasks',
  },
  {
    items: ['wrapped-cryptopunks', 'punk-core'],
    href: 'cryptopunks',
    image: '/images/posters/wrapped-cryptopunks.png',
    colorway: Colorway.LIGHT,
    namespace: 'cryptopunks',
  },
  {
    items: ['axie'],
    href: 'axies',
    image: '/images/posters/axie.png',
    colorway: Colorway.LIGHT,
    namespace: 'axie',
  },
  {
    items: ['cryptokitties'],
    href: 'cryptokitties',
    image: '/images/posters/cryptokitties.png',
    colorway: Colorway.DARK,
    namespace: 'cryptokitties',
  },
];
