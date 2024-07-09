import {Station, Song, audioFileLocation} from "../Station";

const key = 'wctr';
const file = (name: string) => audioFileLocation('sa', key, name);

export default class extends Station {
    name = 'WCTR';
    key = key;
    icon = `/station-icons/sa/${this.key}.png`;
    songs = [
        new Song('Area 53 Part 1', ['Marvin Thrill', 'Various Guests'], 1992, file('area_53_part_1')),
        new Song('Area 53 Part 2', ['Marvin Thrill', 'Various Guests'], 1992, file('area_53_part_2')),
        new Song('Area 53 Part 3', ['Marvin Thrill', 'Various Guests'], 1992, file('area_53_part_3')),
        new Song('Entertaining America Part 1', ['Billy Dexter', 'Lazlow', 'Various Guests'], 1992, file('entertaining_america_part_1')),
        new Song('Entertaining America Part 2', ['Billy Dexter', 'Lazlow', 'Various Guests'], 1992, file('entertaining_america_part_2')),
        new Song('Entertaining America Part 3', ['Billy Dexter', 'Lazlow', 'Various Guests'], 1992, file('entertaining_america_part_3')),
        new Song('News Part 1', ['Lianne Forget', 'Richard Burns', 'Various Guests'], 1992, file('news_part_1')),
        new Song('News Part 2', ['Lianne Forget', 'Richard Burns', 'Various Guests'], 1992, file('news_part_2')),
        new Song('News Part 3', ['Lianne Forget', 'Richard Burns', 'Various Guests'], 1992, file('news_part_3')),
        new Song('News Part 4', ['Lianne Forget', 'Richard Burns', 'Various Guests'], 1992, file('news_part_4')),
        new Song('News Part 5', ['Lianne Forget', 'Richard Burns', 'Various Guests'], 1992, file('news_part_5')),
        new Song('News Part 6', ['Lianne Forget', 'Richard Burns', 'Various Guests'], 1992, file('news_part_6')),
        new Song('News Part 7', ['Lianne Forget', 'Richard Burns', 'Various Guests'], 1992, file('news_part_7')),
        new Song('News Part 8', ['Lianne Forget', 'Richard Burns', 'Various Guests'], 1992, file('news_part_8')),
        new Song('News Part 9', ['Lianne Forget', 'Richard Burns', 'Various Guests'], 1992, file('news_part_9')),
        new Song('News Part 10', ['Lianne Forget', 'Richard Burns', 'Various Guests'], 1992, file('news_part_10')),
        new Song('News Part 11', ['Lianne Forget', 'Richard Burns', 'Various Guests'], 1992, file('news_part_11')),
        new Song('The Tight End Zone Part 1', ['Derrick Thackery'], 1992, file('the_tight_end_zone_part_1')),
        new Song('The Tight End Zone Part 2', ['Derrick Thackery'], 1992, file('the_tight_end_zone_part_2')),
        new Song('The Wild Traveler Part 1', ['James Pedeaston'], 1992, file('the_wild_traveler_part_1')),
        new Song('The Wild Traveler Part 2', ['James Pedeaston'], 1992, file('the_wild_traveler_part_2')),
        new Song('Gardening with Maurice Part 1', ['Maurice'], 1992, file('gardening_with_maurice_part_1')),
        new Song('Gardening with Maurice Part 2', ['Maurice'], 1992, file('gardening_with_maurice_part_2')),
        new Song('Gardening with Maurice Part 3', ['Maurice'], 1992, file('gardening_with_maurice_part_3')),
        new Song('Gardening with Maurice Part 4', ['Maurice'], 1992, file('gardening_with_maurice_part_4')),
        new Song('I Say/You Say Part 1', ['Peyton Phillips', 'Mary Phillips'], 1992, file('i_say_you_say_part_1')),
        new Song('I Say/You Say Part 2', ['Peyton Phillips', 'Mary Phillips'], 1992, file('i_say_you_say_part_2')),
        new Song('I Say/You Say Part 3', ['Peyton Phillips', 'Mary Phillips'], 1992, file('i_say_you_say_part_3')),
        new Song('Lonely Hearts Part 1', ['Christy MacIntyre'], 1992, file('lonely_hearts_part_1')),
        new Song('Lonely Hearts Part 2', ['Christy MacIntyre'], 1992, file('lonely_hearts_part_2')),
        new Song('Lonely Hearts Part 3', ['Christy MacIntyre'], 1992, file('lonely_hearts_part_3')),
    ]
}
