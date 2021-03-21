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
}

interface Plant {
  id: number;
  name: string;
  status: string;
  quantity: number;
  seed: number;
  seed_name: string;
  bed: number;
  bed_name: string;
  ground_name: string;
  garden_name: string;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  links: Link[];
}

interface Link {
  rel: string;
  href: string;
}