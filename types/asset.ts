export interface Asset {
  id: number;
  token_id: string;
  num_sales: number;
  background_color: null | string;
  image_url: string;
  image_preview_url: string;
  image_thumbnail_url: string;
  image_original_url: string;
  animation_url: null | string;
  animation_original_url: null | string;
  name: string;
  description: string;
  external_link: string;
  asset_contract: {
    address: string;
    asset_contract_type: string;
    created_date: string;
    name: string;
    nft_version: string;
    opensea_version: null | string | number;
    owner: number;
    schema_name: string;
    symbol: string;
    total_supply: string;
    description: string;
    external_link: string;
    image_url: string;
    default_to_fiat: boolean;
    dev_buyer_fee_basis_points: boolean;
    dev_seller_fee_basis_points: boolean;
    only_proxied_transfers: boolean;
    opensea_buyer_fee_basis_points: boolean;
    opensea_seller_fee_basis_points: number;
    buyer_fee_basis_points: boolean;
    seller_fee_basis_points: number;
    payout_address: null | string;
  };
  owner: {
    user: {
      username: string;
    };
    profile_img_url: string;
    address: string;
    config: string;
    discord_id: string;
  };
  permalink: string;
  collection: {
    banner_image_url: string;
    chat_url: null | string;
    created_date: string;
    default_to_fiat: boolean;
    description: string;
    dev_buyer_fee_basis_points: string;
    dev_seller_fee_basis_points: string;
    discord_url: string;
    display_data: {
      card_display_style: string;
    };
    external_url: string;
    featured: boolean;
    featured_image_url: string;
    hidden: boolean;
    safelist_request_status: string;
    image_url: string;
    is_subject_to_whitelist: boolean;
    large_image_url: string;
    medium_username: null | string;
    name: string;
    only_proxied_transfers: boolean;
    opensea_buyer_fee_basis_points: string;
    opensea_seller_fee_basis_points: string;
    payout_address: null;
    require_email: boolean;
    short_description: null | string;
    slug: string;
    telegram_url: null | string;
    twitter_username: string;
    wiki_url: null | string;
  };
  decimals: boolean;
  sell_orders: string[];
  creator: {
    user: {
      username: string;
    };
    profile_img_url: string;
    address: string;
    config: string;
    discord_id: string;
  };
  traits: string[];
  last_sale: null | {
    total_price: number;
  };
  top_bid: null | string;
  listing_date: null | string;
  is_presale: boolean;
  transfer_fee_payment_token: null | string;
  transfer_fee: null | number;
}
