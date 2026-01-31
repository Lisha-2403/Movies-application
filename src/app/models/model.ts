export interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  original_language: string;
  revenue: number;
  adult: boolean;
  genre_ids?: number[];
  director?: string;
  cast?: string[];
}
