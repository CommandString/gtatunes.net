import {Station, Song, audioFileLocation} from "../Station";

const key = 'bounce_fm';
const file = (name: string) => audioFileLocation('sa', key, name);

export default class extends Station {
    name = 'Bounce FM';
    key = key;
    icon = `/station-icons/sa/${this.key}.png`;
    songs = [
        new Song('Let It Whip', ['Dazz Band'], 1982, file('let_it_whip')),
        new Song('Yum Yum', ['Fatback'], 1983, file('yum_yum')),
        new Song('You Dropped a Bomb on Me', ['The Gap Band'], 1982, file('you_dropped_a_bomb_on_me')),
        new Song('Candy', ['Cameo'], 1986, file('candy')),
        new Song('Love Is The Message', ['MFSB', 'The Three Degrees'], 1973, file('love_is_the_message')),
        new Song('Odyssey', ['Johnny Harris'], 1973, file('odyssey')),
        new Song('Running Away', ['Roy Ayers'], 1977, file('running_away')),
        new Song('Love Rollercoaster', ['Ohio Players'], 1975, file('love_rollercoaster')),
        new Song('Between the Sheets', ['The Isley Brothers'], 1983, file('between_the_sheets')),
        new Song('I Can Make You Dance', ['Zapp'], 1983, file('i_can_make_you_dance')),
        new Song('Cold Blooded', ['Rick James'], 1983, file('cold_blooded')),
        new Song('West Coast Poplock', ['Ronnie Hudson'], 1982, file('west_coast_poplock')),
        new Song('Loopzilla', ['George Clinton'], 1982, file('loopzilla')),
        new Song('Funky Worm', ['Ohio Players'], 1973, file('funky_worm')),
        new Song('Twilight', ['Maze'], 1985, file('twilight')),
        new Song('Fantastic Voyage', ['Lakeside'], 1980, file('fantastic_voyage')),
        new Song("Hollywood Swinging", ['Kool & The Gang'], 1973, file('hollywood_swinging')),
    ]
}
