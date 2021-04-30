export interface BedObject {
  data: Bed[];
  meta: Meta;
}

export interface BedOneObject {
  data: Bed;
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

export interface Bed {
  id: number;
  name: string;
  number:number;
  x:number;
  y:number;
  status: string;
  type: string;
  zona: string;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  links: Link[];
}

interface Link {
  rel: string;
  href: string;
}