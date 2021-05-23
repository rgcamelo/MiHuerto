export interface CropObject {
  data: Crop[];
  meta: Meta;
}

export interface CropOneObject {
  data: Crop;
  meta: Meta;
}

interface Meta {
  pagination: Pagination;
}

interface Pagination {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
  links: Links;
}

interface Links {
  next: string;
}

export interface Crop {
  id: number;
  quantity: number;
  plant_id: number;
  care:number;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  links: Link[];
}

interface Link {
  rel: string;
  href: string;
}