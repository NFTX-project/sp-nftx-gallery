export interface YoastMeta {
  name?: string;
  property?: string;
  content: string;
}

export interface Collection {
  title: {
    rendered: string;
  };
  slug: string;
  acf: {
    collection_title: string;
    collection_description: string;
    collection_feature_image: URL;
    collection_feature_homepage: boolean;
    collection_related_fund_vault_ids: string;
    collection_visible: 'visible' | null;
  };
  yoast_meta: YoastMeta[];
  yoast_title: string;
}
