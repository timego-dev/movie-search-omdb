interface IRating{
    Source: string,
    Value: string
}

export interface IMovie {
    Title: string,
    Year: string,
    Type: string,
    Poster: string,
    imdbID: string,
    Rated: string,
    Released: string,
    Runtime: string,
    Genre : string,
    Director: string,
    Writer : string,
    Actors: string,
    Plot: string,
    Language: string,
    Country: string,
    Awards: string,
    Ratings: IRating[],
    Metascore: string,
    imdbRating: string,
    imdbVotes: string,
    imdbId : string,
    DVD : string,
    BoxOffice: string,
}
