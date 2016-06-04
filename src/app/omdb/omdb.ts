export class OmdbSearchParams {
    s: string;          // Movie title to search for.
    type: string;      // Type of result to return. movie, series, episode
    page: number;      // Page number to return. 1-100 

}

export class OmdbIDSearchParams {
    i: string;          // A valid IMDb ID (e.g. tt1285016)
    plot: string;      // Return short or full plot. short,full
    tomatoes: boolean;      // Include Rotten Tomatoes ratings. true,false
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
    imdbID: string;
    Title: string;
    Year: string;
    Type: string;
    Poster: string;
}

export interface ByIdSearchResult {
    Title: string;
    Year:  string;
    Rated:  string;
    Released:   string;
    Runtime:    string;
    Genre:  string;
    Director:   string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language:   string;
    Country: string;
    Awards: string;
    Poster: string;
    Metascore: string; //"69",
    imdbRating: string; //"7.6",
    imdbVotes:  string; //"264,927",
    imdbID: string; //"tt0096895",
    Type:   string; //"movie",
    tomatoMeter?:    string; //"72",
    tomatoImage?:   string; //"fresh",
    tomatoRating?:  string;//"6.6",
    tomatoReviews?: string; //"68",
    tomatoFresh?: string; //"49",
    tomatoRotten?: string; //"19",
    tomatoConsensus?: string;// "An eerie, haunting spectacle, Batman succeeds as dark entertainment, even if Jack Nicholson's Joker too often overshadows the title character.",
    tomatoUserMeter?: string;//"84",
    tomatoUserRating?: string; //"3.5",
    tomatoUserReviews?: string; //"908278",
    tomatoURL?:  string; //"http://www.rottentomatoes.com/m/1001781-batman/",
    DVD:    string; //"25 Mar 1997",
    BoxOffice: string; //"N/A",
    Production: string; //"Warner Bros. Pictures",
    Website: string; //"N/A",
    
}