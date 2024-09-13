import {getStations} from "~/server/utils/stations/iii/Stations";
import type {Song} from "~/server/utils/stations/iii/Station";

export default defineEventHandler(async (event) => {
    let mappedStations = [];

    for (let station of getStations()) {
        mappedStations.push({
            name: station.name,
            icon: station.icon,
            songs: station.songs.map((song: Song) => ({
                name: song.name,
                artists: song.artists,
                year: song.year,
            }))
        });
    }

    return mappedStations;
});