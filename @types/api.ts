export type APISong = {
    name: string,
    artists: string[],
    year: number
}

export type APIStation = {
    name: string,
    icon: string,
    songs: APISong[]
};

