import {getStations} from "~/server/utils/Stations";

export default defineEventHandler(async (event) => {
    let mappedStations = [];

    for (let station of getStations()) {
        mappedStations.push({
            name: station.name,
            icon: station.icon,
            songs: (await station.getSongs()).map(song => song.name)
        });
    }

    return mappedStations;
});