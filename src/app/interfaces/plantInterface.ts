interface PlantObject {
  data: Plant[];
  meta: Meta;
}

interface PlantOneObject {
  data: Plant;
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

interface Plant {
  id: number;
  name: string;
  status: string;
  seed: number;
  bed: number;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  links: Link[];
}

interface Link {
  rel: string;
  href: string;
}