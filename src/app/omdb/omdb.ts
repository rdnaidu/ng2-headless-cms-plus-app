export class OmdbSearchParams {
    s: string;          // Movie title to search for.
    type: string;      // Type of result to return. movie, series, episode
    page: number;      // Page number to return. 1-100 
    
}

export enum MediaTypes {
    movie,
    series,
    episode
}


export interface OmdbBySearch {
    Search: BySearchResult[];
    totalResults: number;
}

export interface BySearchResult {
    Title: string;
    Year: string;
    Type: string;
    Poster: string;
}