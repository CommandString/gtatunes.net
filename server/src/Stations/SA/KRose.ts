import {Station, Song, audioFileLocation} from "../Station";

const key = 'k_rose';
const file = (name: string) => audioFileLocation('sa', key, name);

export default class extends Station {
    name = 'K Rose';
    key = key;
    icon = `/station-icons/sa/${this.key}.png`;
    songs = [
        new Song('Amos Moses', ['Jerry Reed'], 1970, file('amos_moses')),
        new Song('Louisiana Woman, Mississippi Man', ['Conway Twitty', 'Loretta Lynn'], 1973, file('louisiana_woman_mississippi_man')),
        new Song('Hey Good Lookin\'', ['Hank Williams'], 1951, file('hey_good_lookin')),
        new Song('Queen of Hearts', ['Juice Newton'], 1981, file('queen_of_hearts')),
        new Song('New York City', ['Statler Brothers'], 1970, file('new_york_city')),
        new Song('The Letter That Johnny Walker Read', ['Asleep at the Wheel'], 1975, file('the_letter_that_johnny_walker_read')),
        new Song('One Step Forward', ['The Desert Rose Band'], 1987, file('one_step_forward')),
        new Song('Crazy', ['Willie Nelson'], 1961, file('crazy')),
        new Song('Three Cigarettes in an Ashtray', ['Patsy Cline'], 1957, file('three_cigarettes_in_an_ashtray')),
        new Song('Bed of Rose\'s', ['Statler Brothers'], 1970, file('bed_of_roses')),
        new Song('Make the World Go Away', ['Eddy Arnold'], 1965, file('make_the_world_go_away')),
        new Song('Mammas Don\'t Let Your Babies Grow Up to Be Cowboys', ['Waylon Jennings', 'Willie Nelson'], 1978, file('mammas_dont_let_your_babies_grow_up_to_be_cowboys')),
        new Song('Always Wanting You', ['Merle Haggard'], 1975, file('always_wanting_you')),
        new Song('All My Ex\'s Live in Texas', ['Whitey Shafer'], 1987, file('all_my_exes_live_in_texas')),
        new Song('I Love a Rainy Night', ['Eddie Rabbitt'], 1980, file('i_love_a_rainy_night'))
    ]
}
