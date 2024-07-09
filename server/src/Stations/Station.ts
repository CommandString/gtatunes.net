export class Song {
    public readonly title: string;
    public readonly artists: Array<string>;
    public readonly year: Number;
    public readonly audio: string;

    public constructor(
        title: string,
        artists: Array<string>,
        year: Number,
        audio: string
    ) {
        this.title = title;
        this.artists = artists;
        this.year = year;
        this.audio = audio;
    }
}

export abstract class Station {
    abstract readonly name: string;
    abstract readonly key: string;
    abstract readonly icon: string;
    abstract readonly songs: Array<Song>;
}

export function audioFileLocation(game: 'sa'|'iii'|'vc', station: string, song: string): string {
    return `/audio/${game}/${station}/${song}.mp3`;
}
