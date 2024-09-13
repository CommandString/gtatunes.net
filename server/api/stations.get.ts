import saStations from "./sa/stations.get";
import iiiStations from "./iii/stations.get";

export default defineEventHandler(async (event) => {
    let sa = await saStations(event);
    let iii = await iiiStations(event);

    return { sa, iii }
});