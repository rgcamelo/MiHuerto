export interface CareObject {
  data: Care[];
  meta: Meta;
}

export interface CareOneObject {
  data: Care;
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

export interface Care {
  id: number;
  type: string;
  plant: number;
  description:string;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  links: Link[];
}

interface Link {
  rel: string;
  href: string;
}