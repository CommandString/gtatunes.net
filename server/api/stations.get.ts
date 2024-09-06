import saStations from "./stations/sa.get";

export default defineEventHandler(async (event) => {
    let sa = await saStations(event);

    return {
        sa: sa
    }
});