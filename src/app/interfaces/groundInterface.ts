interface GroundObject {
  data: Ground[];
  meta: Meta;
}

interface GroundOneObject{
  data: Ground;
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

interface Ground {
  id: number;
  name: string;
  status: string;
  type: string;
  number_bed: number;
  number_furrow: number;
  number_terrace: number;
  huerto: number;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  links: Link[];
}

interface Link {
  rel: string;
  href: string;
}