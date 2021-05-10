export interface SeedObject {
  data: Seed[];
  meta: Meta;
}

export interface SeedOneObject {
  data: Seed;
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

export interface Seed {
  id: number;
  name: string;
  status: string;
  image:string;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  links: Link[];
}

interface Link {
  rel: string;
  href: string;
}