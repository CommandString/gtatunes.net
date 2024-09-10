import saStations from "./stations/sa.get";
import saStations from "./sa/stations.get";

export default defineEventHandler(async (event) => {
    let sa = await saStations(event);

    return {
        sa: sa
    }
});