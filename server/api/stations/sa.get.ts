import {getStations} from "~/server/utils/stations/sa/Stations";
import type {Song} from "~/server/utils/stations/sa/Station";

export default defineEventHandler(async (event) => {
    let mappedStations = [];

    for (let station of getStations()) {
        mappedStations.push({
            name: station.name,
            icon: station.icon,
            songs: (await station.getSongs()).map((song: Song) => ({
                name: song.name,
                artists: song.artists,
                year: song.year,
            }))
        });
    }

    return mappedStations;
});