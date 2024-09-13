import type {FfmpegCommand} from "fluent-ffmpeg";
import ffmpeg from "fluent-ffmpeg";

/**
 * [title, artists, year, start_time, end_time]
 * The title is used if file_name is null
 */
export type SongMetaData = [string, string[], number, number, number];

export class Song {
    constructor(
        public readonly station: Station,
        public readonly name: string,
        public readonly artists: string[],
        public readonly year: number,
        /** in seconds */
        public readonly start_time: number,
        /** in seconds */
        public readonly end_time: number
    ) {

    }

    createStream(): FfmpegCommand {
        return ffmpeg()
            .input(this.station.file)
            .setStartTime(this.start_time)
            .duration(this.end_time - this.start_time)
            .format('mp3')
    }
}

export abstract class Station {
    public abstract readonly name: string;
    public abstract readonly icon: string;
    public abstract readonly file: string;
    public readonly songs: Song[];

    constructor(songs: SongMetaData[]) {
        this.songs = songs.map(song => new Song(this, ...song));
    }

    async getRandomSong() {
        return this.songs[Math.floor(Math.random() * this.songs.length)];
    }
}
