import React from 'react';
import { YoastMeta } from '@/types/wp';

const buildYoastMeta = (yoastTitle: string, yoastMeta: YoastMeta[] = []) => (
  <>
    <title>{yoastTitle}</title>
    {Array.isArray(yoastMeta) &&
      yoastMeta.map((m, i) => (
        <meta key={i} name={m.name} property={m.property} content={m.content} />
      ))}
  </>
);

export default buildYoastMeta;
