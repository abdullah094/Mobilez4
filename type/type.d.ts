export interface Profile {
  account_status: string;
  active_status: number;
  area: null;
  avatar: string;
  city: string;
  cnic_back_image: string;
  cnic_front_image: string;
  conf_password: string;
  created_at: Date;
  dark_mode: number;
  email: string;
  email_verified_at: null;
  fb_id: null;
  first_name: string;
  id: number;
  is_agree: number;
  is_verified: number;
  last_name: string;
  messenger_color: string;
  name: string;
  nic_number: string;
  phone: string;
  photo: string;
  shop_address: string;
  shop_name: string;
  shop_visiting_card: string;
  social_login: null;
  type: string;
  updated_at: Date;
  user_type: null;
  whatsapp_num: null;
}

export interface NewDevices {
  status: number;
  new_devices: NewDevice[];
}

export interface NewDevice {
  id: number;
  brand: string;
  model: string;
  description: string;
  price: number;
  storage: number | null;
  ram: number | null;
  accessories: null | string;
  warranty: string;
  product_type: string;
  pta_status: string;
  category: string;
  sell_status: string;
  seller_id: number;
  feature_add: null | string;
  status: number | null;
  created_at: Date;
  updated_at: Date;
  image: Image;
  user: User;
}

export interface User {
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  city: string;
  area: null;
  phone: string;
  email: string;
  email_verified_at: null;
  conf_password: string;
  user_type: null | string;
  shop_name: null | string;
  shop_address: null | string;
  is_verified: number | null;
  type: string;
  fb_id: null;
  nic_number: null | string;
  cnic_front_image: null | string;
  cnic_back_image: null | string;
  shop_visiting_card: null | string;
  whatsapp_num: null;
  social_login: null;
  is_agree: number | null;
  account_status: string;
  photo: string;
  created_at: Date;
  updated_at: Date;
  active_status: number;
  avatar: string;
  dark_mode: number;
  messenger_color: null | string;
}

export interface Watches {
  status: number;
  watches: Watch[];
}

export interface Watch {
  id: number;
  brand: string;
  model: string;
  description: string;
  price: number;
  storage: number | null;
  ram: number | null;
  accessories: null | string;
  warranty: string;
  product_type: string;
  pta_status: string;
  category: string;
  sell_status: string;
  seller_id: number;
  feature_add: null | string;
  status: number | null;
  created_at: Date;
  updated_at: Date;
  image: Image;
  user: User;
  wishlist_product: null;
}

export interface Image {
  id: number;
  product_id: number;
  slug: null;
  img: string;
  created_at: Date;
  updated_at: Date;
}

export interface Tablets {
  status: number;
  tablets: Tablet[];
}

export interface Tablet {
  id: number;
  brand: string;
  model: string;
  description: string;
  price: number;
  storage: number;
  ram: number;
  accessories: string;
  warranty: string;
  product_type: string;
  pta_status: string;
  category: string;
  sell_status: string;
  seller_id: number;
  feature_add: null;
  status: null;
  created_at: Date;
  updated_at: Date;
  image: Image;
  user: User;
  wishlist_product: null;
}

export enum Category {
  PHONE = 'mobile',
  SMARTWATCH = 'watch',
  TABLET = 'tablet',
  RELATED_AD = 'related',
  MORE_AD = 'more_ad',
}

export interface Contacts {
  contacts: Contact[];
  total: number;
  last_page: number;
}

export interface Contact {
  id: number;
  name: string;
  first_name: string;
  last_name: null | string;
  city: string;
  area: null | string;
  phone: null | string;
  email: string;
  email_verified_at: null;
  password: string;
  conf_password: null | string;
  user_type: null | string;
  shop_name: null | string;
  shop_address: null | string;
  is_verified: number | null;
  type: number;
  fb_id: null;
  nic_number: null;
  cnic_front_image: null;
  cnic_back_image: null;
  shop_visiting_card: null | string;
  whatsapp_num: null;
  social_login: null | string;
  is_agree: number | null;
  account_status: string;
  photo: string;
  remember_token: null | string;
  created_at: Date;
  updated_at: Date;
  active_status: number;
  avatar: string;
  dark_mode: number;
  messenger_color: null | string;
  max_created_at: Date;
}

export interface Form {
  brand: string| null,
  ram: string| null,
  storage: string| null,
  pta_status: string| null,
  condition: string| null,
  Warranty: string| null,
  city: string| null,
  max_price: string| null,
  min_price: string| null,
}