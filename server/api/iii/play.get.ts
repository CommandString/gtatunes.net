import {getStations} from "~/server/utils/stations/iii/Stations";
import {PassThrough} from "node:stream";
import type {Song} from "~/server/utils/stations/iii/Station";

export default defineEventHandler(async (event) => {
    let query = getQuery(event);

    if (!query.station) {
        setResponseStatus(event, 400);

        return {
            error: 'Station query parameter is required'
        };
    }

    const stations = getStations();

    let stationParam = (query.station as string).toLowerCase();
    let station = stations.find(station => station.name.toLowerCase() === stationParam);

    if (!station) {
        setResponseStatus(event, 404);

        return {
            error: 'Station not found',
            stations: stations.map(station => station.name)
        };
    }

    let song: Song|undefined;

    if (!query.song) {
        song = await station.getRandomSong()
    } else if (typeof query.song === 'string') {
        let songParam = (query.song as string).toLowerCase();

        song = station.songs.find(song => song.name.toLowerCase() === songParam);

        if (!song) {
            setResponseStatus(event, 404);

            return {
                error: `Invalid song`,
                songs: station.songs.map(song => song.name)
            };
        }
    }

    let songStream = song!.createStream();

    setHeader(event, 'Content-Type', 'audio/mpeg');

    event.node.req.on('close', () => {
        console.log('Request closed.');

        if (songStream) {
            songStream?.kill('SIGKILL');
        }
    });

    let stream = new PassThrough();
    songStream.pipe(stream);

    if (query.stream === '1') {
        setHeader(event, 'Transfer-Encoding', 'chunked');
        await sendStream(event, stream);
    } else {
        let data = Buffer.from('');

        stream.on('data', (chunk: Buffer) => {
            data = Buffer.concat([data, chunk]);
        });

        return new Promise((resolve) => {
            songStream.on('end', async () => {
                resolve(data);
            });
        });
    }
});