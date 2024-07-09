import {Station, Song, audioFileLocation} from "../Station";

const key = 'k_dst';
const file = (name: string) => audioFileLocation('sa', key, name);

export default class extends Station {
    name = 'K DST';
    key = key;
    icon = `/station-icons/sa/${this.key}.png`;
    songs = [
        new Song('Slow Ride', ['Foghat'], 1975, file('slow_ride')),
        new Song('Green River', ['Creedence Clearwater Revival'], 1969, file('green_river')),
        new Song('Strutter', ['Kiss'], 1974, file('strutter')),
        new Song('Hold the Line', ['Toto'], 1978, file('hold_the_line')),
        new Song('Young Turks', ['Rod Stewart'], 1981, file('young_turks')),
        new Song('Running Down a Dream', ['Tom Petty'], 1989, file('running_down_a_dream')),
        new Song('Woman to Woman', ['Joe Cocker'], 1972, file('woman_to_woman')),
        new Song('Get Down to It', ['Humble Pie'], 1973, file('get_down_to_it')),
        new Song('Some Kind of Wonderful', ['Grand Funk Railroad'], 1974, file('some_kind_of_wonderful')),
        new Song('Free Bird', ['Lynyrd Skynyrd'], 1973, file('free_bird')),
        new Song('A Horse with No Name', ['America'], 1971, file('a_horse_with_no_name')),
        new Song('Eminence Front', ['The Who'], 1982, file('eminence_front')),
        new Song('Smokin', ['Boston'], 1976, file('smokin')),
        new Song('Somebody Up There Likes Me', ['David Bowie'], 1975, file('somebody_up_there_likes_me')),
        new Song('Two Tickets to Paradise', ['Eddie Money'], 1977, file('two_tickets_to_paradise')),
        new Song('White Wedding', ['Billy Idol'], 1982, file('white_wedding')),
    ]
}
