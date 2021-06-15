/**
 * Describes a video item (a movie, a series, an episode)
 */
export interface OMDbItem {
  Poster: string;
  Title: string;
  Type: "movie" | "series" | "episode";
  Year: string;
  imdbID: string;
}

export interface OMDbSearchResponse {
  Response: "True";
  Search: OMDbItem[];
  /** A stringified number */
  totalResults: string;
}
