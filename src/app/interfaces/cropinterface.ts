interface CropObject {
  data: Crop[];
  meta: Meta;
}

interface CropOneObject {
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
}

interface Crop {
  id: number;
  quantity: number;
  plant: number;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  links: Link[];
}

interface Link {
  rel: string;
  href: string;
}