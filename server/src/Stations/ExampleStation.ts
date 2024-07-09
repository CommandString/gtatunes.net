import {Station, Song, audioFileLocation} from "./Station";

const key = 'example_station';
const file = (name: string) => audioFileLocation('sa', key, name);

export default class extends Station {
    name = 'ExampleStation';
    key = key;
    icon = `/station-icons/sa/${this.key}.png`;
    songs = [

    ]
}
