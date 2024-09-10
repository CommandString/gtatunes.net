import {Station} from "./Station";
import type {SongMetaData} from "./Station";

export class BounceFM extends Station {
    name = 'Bounce FM';
    icon = `/station-icons/sa/bounce_fm.png`;
    songFolder = null;
    songMetadata: SongMetaData[] = [
        ['Let It Whip', ['Dazz Band'], 1982, null],
        ['Yum Yum', ['Fatback'], 1983, null],
        ['You Dropped a Bomb on Me', ['The Gap Band'], 1982, null],
        ['Candy', ['Cameo'], 1986, 'candy'],
        ['Love Is The Message', ['MFSB', 'The Three Degrees'], 1973, null],
        ['Odyssey', ['Johnny Harris'], 1973, null],
        ['Running Away', ['Roy Ayers'], 1977, null],
        ['Love Rollercoaster', ['Ohio Players'], 1975, null],
        ['Between the Sheets', ['The Isley Brothers'], 1983, null],
        ['I Can Make You Dance', ['Zapp'], 1983, null],
        ['Cold Blooded', ['Rick James'], 1983, null],
        ['West Coast Poplock', ['Ronnie Hudson'], 1982, null],
        ['Loopzilla', ['George Clinton'], 1982, null],
        ['Funky Worm', ['Ohio Players'], 1973, null],
        ['Twilight', ['Maze'], 1985, 'twilight'],
        ['Fantastic Voyage', ['Lakeside'], 1980, null],
        ["Hollywood Swingin'", ['Kool & The Gang'], 1973, null],
    ]
}

export class CSR extends Station {
    name = 'CSR';
    icon = `/station-icons/sa/csr.png`;
    songFolder = null;
    songMetadata: SongMetaData[] = [
        ['I\'m So Into You', ['SWV'], 1992, null],
        ['Keep On Movin\'', ['Soul II Soul'], 1989, null],
        ['So You Like What You See', ['Samuelle'], 1990, null],
        ['Rub You The Right Way', ['Johnny Gill'], 1990, null],
        ['Sensitivity', ['Ralph Tresvant'], 1990, null],
        ['Groove Me', ['Guy'], 1988, null],
        ['Don\'t Be Afraid', ['Aaron Hall'], 1992, null],
        ['Motownphilly', ['Boyz II Men'], 1991, null],
        ['Poison', ['Bell Biv DeVoe'], 1990, null],
        ['I Got the Feeling', ['Today'], 1990, null],
        ['New Jack Swing', ['Wrecks-N-Effect'], 1989, null],
        ['Don\'t Be Cruel', ['Bobby Brown'], 1988, null],
        ['My Lovin\' (Never Gonna Get It)', ['En Vogue'], 1992, null],
    ]
}

export class KDst extends Station {
    name = 'K-DST';
    icon = `/station-icons/sa/k_dst.png`;
    songFolder = null;
    songMetadata: SongMetaData[] = [
        ['Slow Ride', ['Foghat'], 1975, null],
        ['Green River', ['Creedence Clearwater Revival'], 1969, null],
        ['Strutter', ['Kiss'], 1974, null],
        ['Hold the Line', ['Toto'], 1978, null],
        ['Young Turks', ['Rod Stewart'], 1981, null],
        ['Running Down a Dream', ['Tom Petty'], 1989, null],
        ['Woman to Woman', ['Joe Cocker'], 1972, null],
        ['Get Down to It', ['Humble Pie'], 1973, null],
        ['Some Kind of Wonderful', ['Grand Funk Railroad'], 1974, null],
        ['Free Bird', ['Lynyrd Skynyrd'], 1973, null],
        ['A Horse with No Name', ['America'], 1971, null],
        ['Eminence Front', ['The Who'], 1982, null],
        ['Smokin\'', ['Boston'], 1976, null],
        ['Somebody Up There Likes Me', ['David Bowie'], 1975, null],
        ['Two Tickets to Paradise', ['Eddie Money'], 1977, null],
        ['White Wedding', ['Billy Idol'], 1982, null],
    ]
}

export class KJah extends Station {
    name = 'K-JAH';
    icon = `/station-icons/sa/k_jah_west.png`;
    songFolder = null;
    songMetadata: SongMetaData[] = [
        ['Armagideon Time', ['Willi Williams'], 1992, null],
        ['Bam Bam', ['Sister Nancy'], 1982, null],
        ['Batty Rider', ['Buju Banton'], 1992, null],
        ['Chase The Devil', ['Max Romeo', 'The Upsetters'], 1976, null],
        ['Cocaine In My Brain', ['Dillinger'], 1976, null],
        ["Don't Let It Go To Your Head", ['Black Harmony'], 1979, null],
        ['Drum Pan Sound', ['Reggie Stepper'], 1988, null],
        ['Funky Kingston', ['Toots', 'The Maytals'], 1972, null],
        ['Great Train Robbery', ['Black Uhuru'], 1986, null],
        ['Here I Come', ['Barrington Levy'], 1985, null],
        ['King Tubby Meets The Rockers Uptown', ['Augustus Pablo'], 1974, null],
        ['Pressure Drop', ['Toots', 'The Maytals'], 1969, null],
        ['Chase the Devil', ['Max Romeo'], 1976, null],
        ['Revolution', ['Dennis Brown'], 1985, null],
        ['Ring My Bell', ['Blood Sisters'], 1979, null],
        ['Sidewalk Killer', ['I-Roy'], 1972, null],
        ['Wicked Inna Bed', ['Shabba Ranks'], 1989, null],
    ]
}

export class KRose extends Station {
    name = 'K-Rose';
    icon = `/station-icons/sa/k_rose.png`;
    songFolder = 'K-ROSE';
    songMetadata: SongMetaData[] = [
        ['Amos Moses', ['Jerry Reed'], 1970, null],
        ['Louisiana Woman, Mississippi Man', ['Conway Twitty', 'Loretta Lynn'], 1973, null],
        ['Hey Good Lookin\'', ['Hank Williams'], 1951, null],
        ['Queen of Hearts', ['Juice Newton'], 1981, null],
        ['New York City', ['Statler Brothers'], 1970, null],
        ['The Letter That Johnny Walker Read', ['Asleep at the Wheel'], 1975, null],
        ['One Step Forward', ['The Desert Rose Band'], 1987, null],
        ['Crazy', ['Willie Nelson'], 1961, null],
        ['Three Cigarettes in the Ashtray', ['Patsy Cline'], 1957, null],
        ['Bed of Roses', ['Statler Brothers'], 1970, null],
        ['Make the World Go Away', ['Eddy Arnold'], 1965, null],
        ['Mammas Don\'t Let Your Babies Grow Up to Be Cowboys', ['Waylon Jennings', 'Willie Nelson'], 1978, null],
        ['Always Wanting You', ['Merle Haggard'], 1975, null],
        ['All My Exes Live in Texas', ['Whitey Shafer'], 1987, null],
        ['I Love a Rainy Night', ['Eddie Rabbitt'], 1980, null],
    ]
}

export class MasterSounds extends Station {
    name = 'Master Sounds';
    icon = `/station-icons/sa/master_sounds.png`;
    songFolder = null;
    songMetadata: SongMetaData[] = [
        ['Cross the Tracks (We Better Go Back)', ['Maceo', 'The Macks'], 1974, null],
        ['Express Yourself', ['Charles Wright', 'The Watts 103rd Street Rhythm Band'], 1970, null],
        ['Funky President', ['James Brown'], 1974, null],
        ['Green Onions', ['Booker T.', "The MG's"], 1962, null],
        ["Grunt", ["The J.B.'s"], 1970, null],
        ['Hot Pants', ['Bobby Byrd'], 1971, null],
        ['I Know You Got Soul', ['Bobby Byrd'], 1971, null],
        ['Jungle Fever', ['The Chakachas'], 1972, null],
        ['Low Rider', ['War'], 1975, null],
        ["Nautilus", ['Bob James'], 1974, null],
        ['Rock Creek Park', ['The Blackbyrds'], 1975, null],
        ['Rock Me Again and Again', ['Lyn Collins'], 1974, null],
        ["Smokin' Cheeba Cheeba", ['The Harlem Underground Band'], 1976, null],
        ["Soul Power '74", ['Maceo', 'The Macks'], 1973, null],
        ['Tainted Love', ['Gloria Jones'], 1965, null],
        ['The Payback', ['James Brown'], 1973, null],
        ['Think About It', ['Lyn Collins'], 1972, null],
    ]
}

export class PlaybackFM extends Station {
    name = 'Playback FM';
    icon = `/station-icons/sa/playback_fm.png`;
    songFolder = null;
    songMetadata: SongMetaData[] = [
        ['Road To The Riches', ['Kool G Rap', 'DJ Polo'], 1989, null],
        ['Warm It Up Kane', ['Big Daddy Kane'], 1989, null],
        ['The Godfather', ['Spoonie Gee'], 1987, null],
        ['Me & The Biz', ['Masta Ace'], 1990, null],
        ['Children\'s Story', ['Slick Rick'], 1988, null],
        ['Rebel Without A Pause', ['Public Enemy'], 1987, null],
        ['I Know You Got Soul', ['Eric B. & Rakim'], 1987, null],
        ['It Takes Two', ['Rob Base', 'DJ E-Z Rock'], 1988, null],
        ['B.Y.S.', ['Gang Starr'], 1989, null],
        ['Vapors', ['Biz Markie'], 1988, null],
        ['Brand Nubian', ['Brand Nubian'], 1990, null],
        ['Critical Beatdown', ['Ultramagnetic MC\'s'], 1988, null],
    ]
}

export class RadioX extends Station {
    name = 'Radio X';
    icon = `/station-icons/sa/radio_x.png`;
    songFolder = null;
    songMetadata: SongMetaData[] = [
        ['Been Caught Stealing', ["Jane's Addiction"], 1990, null],
        ['Cult of Personality', ['Living Colour'], 1988, null],
        ['Fools Gold', ['The Stone Roses'], 1989, null],
        ['Hellraiser', ['Ozzy Osbourne'], 1991, null],
        ['Killing in the Name', ['Rage Against the Machine'], 1992, null],
        ['Midlife Crisis', ['Faith No More'], 1992, null],
        ['Mother', ['Danzig'], 1988, null],
        ["Movin' On Up", ['Primal Scream'], 1991, null],
        ['Personal Jesus', ['Depeche Mode'], 1989, null],
        ["Pretend We're Dead", ['L7'], 1992, null],
        ['Rusty Cage', ['Soundgarden'], 1991, null],
        ['Them Bones', ['Alice in Chains'], 1992, null],
        ['Unsung', ['Helmet'], 1992, null],
        ['Welcome to the Jungle', ["Guns N' Roses"], 1987, null],
        ['Plush', ['Stone Temple Pilots'], 1992, null]
    ]
}

export class SFUR extends Station {
    name = 'SFUR';
    icon = `/station-icons/sa/sfur.png`;
    songFolder = null;
    songMetadata: SongMetaData[] = [
        ['Break 4 Love', ['Raze'], 1988, null],
        ['Can You Feel It', ['Mr. Fingers'], 1986, null],
        ['I Need A Rhythm', ['The 28th Street Crew'], 1989, null],
        ["I'll Be Your Friend", ['Robert Owens'], 1991, null],
        ['Let The Music Use You', ['The Nightwriters'], 1987, null],
        ['Ma Foom Bey', ['Cultural Vibe'], 1986, null],
        ['Make My Body Rock', ['Jomanda'], 1988, null],
        ['Move Your Body', ['Marshall Jefferson'], 1986, null],
        ['Pacific', ['808 State'], 1988, null],
        ['Promised Land', ['Joe Smooth'], 1987, null],
        ['Someday', ['CeCe Rogers'], 1991, null],
        ['The Morning After', ['Fallout'], 1991, null],
        ['This Is Acid', ['Maurice'], 1989, null],
        ['Voodoo Ray', ['A Guy Called Gerald'], 1988, null],
        ['Weekend', ['Todd Terry Project'], 1988, null],
        ['Your Love', ['Frankie Knuckles'], 1986, null],
    ]
}

export class RadioLosSantos extends Station {
    name = 'Radio Los Santos';
    icon = `/station-icons/sa/radio_los_santos.png`;
    songFolder = null;
    songMetadata: SongMetaData[] = [
        ["Alwayz into Somethin'", ['N.W.A.'], 1991, null],
        ['Check Yo Self (The Message Remix)', ['Ice Cube'], 1993, null],
        ['Deep Cover', ['Dr. Dre', 'Snoop Dogg'], 1992, null],
        ['Eazy-Er Said Than Dunn', ['Eazy-E'], 1988, null],
        ['Express Yourself', ['N.W.A.'], 1988, null],
        ['Fuck wit Dre Day', ['Dr. Dre', 'Snoop Dogg'], 1992, null],
        ['Guerillas in tha Mist', ['Da Lench Mob'], 1992, null],
        ['Hood Took Me Under', ["Compton's Most Wanted"], 1992, null],
        ['How I Could Just Kill a Man', ['Cypress Hill'], 1991, null],
        ["I Don't Give a Fuck", ['2Pac'], 1991, null],
        ['It Was a Good Day', ['Ice Cube'], 1992, null],
        ["It's Funky Enough", ['The D.O.C.'], 1989, null],
        ['La Raza', ['Kid Frost'], 1990, null],
        ['Murder Rap', ['Above the Law'], 1990, null],
        ["Nuthin' but a 'G' Thang", ['Dr. Dre', 'Snoop Dogg'], 1992, null],
        ['The Ghetto', ['Too $hort'], 1990, null]
    ]
}

export class WCTR extends Station {
    name = 'WCTR';
    icon = `/station-icons/sa/wctr.png`;
    songFolder = null;
    songMetadata: SongMetaData[] = [
        ['Area 53 - Episode #1', ['Marvin Thrill', 'Various Guests'], 1992, null],
        ['Area 53 - Episode #2', ['Marvin Thrill', 'Various Guests'], 1992, null],
        ['Area 53 - Episode #3', ['Marvin Thrill', 'Various Guests'], 1992, null],
        ['Entertaining America - Episode #1', ['Billy Dexter', 'Lazlow', 'Various Guests'], 1992, null],
        ['Entertaining America - Episode #2', ['Billy Dexter', 'Lazlow', 'Various Guests'], 1992, null],
        ['Entertaining America - Episode #3', ['Billy Dexter', 'Lazlow', 'Various Guests'], 1992, null],
        ['News - Episode #01', ['Lianne Forget', 'Richard Burns', 'Various Guests'], 1992, null],
        ['News - Episode #02', ['Lianne Forget', 'Richard Burns', 'Various Guests'], 1992, null],
        ['News - Episode #03', ['Lianne Forget', 'Richard Burns', 'Various Guests'], 1992, null],
        ['News - Episode #04', ['Lianne Forget', 'Richard Burns', 'Various Guests'], 1992, null],
        ['News - Episode #05', ['Lianne Forget', 'Richard Burns', 'Various Guests'], 1992, null],
        ['News - Episode #06', ['Lianne Forget', 'Richard Burns', 'Various Guests'], 1992, null],
        ['News - Episode #07', ['Lianne Forget', 'Richard Burns', 'Various Guests'], 1992, null],
        ['News - Episode #08', ['Lianne Forget', 'Richard Burns', 'Various Guests'], 1992, null],
        ['News - Episode #09', ['Lianne Forget', 'Richard Burns', 'Various Guests'], 1992, null],
        ['News - Episode #10', ['Lianne Forget', 'Richard Burns', 'Various Guests'], 1992, null],
        ['News - Episode #11', ['Lianne Forget', 'Richard Burns', 'Various Guests'], 1992, null],
        ['The Tight End Zone - Episode #1', ['Derrick Thackery'], 1992, null],
        ['The Tight End Zone - Episode #2', ['Derrick Thackery'], 1992, null],
        ['The Wild Traveler - Episode #1', ['James Pedeaston'], 1992, null],
        ['The Wild Traveler - Episode #2', ['James Pedeaston'], 1992, null],
        ['Gardening with Maurice - Episode #1', ['Maurice'], 1992, null],
        ['Gardening with Maurice - Episode #2', ['Maurice'], 1992, null],
        ['Gardening with Maurice - Teaser #1', ['Maurice'], 1992, null],
        ['Gardening with Maurice - Teaser #2', ['Maurice'], 1992, null],
        ['I Say, You Say - Episode #1', ['Peyton Phillips', 'Mary Phillips'], 1992, null],
        ['I Say, You Say - Episode #2', ['Peyton Phillips', 'Mary Phillips'], 1992, null],
        ['Lonely Hearts - Episode #1', ['Christy MacIntyre'], 1992, null],
        ['Lonely Hearts - Episode #2', ['Christy MacIntyre'], 1992, null],
        ['Lonely Hearts - Episode #3', ['Christy MacIntyre'], 1992, null],
    ]
}

let stations: Station[]|null;

export function getStations(): Station[] {
    if (!stations) {
        stations = [
            new BounceFM(),
            new CSR(),
            new KDst(),
            new KJah(),
            new KRose(),
            new MasterSounds(),
            new PlaybackFM(),
            new RadioX(),
            new SFUR(),
            new RadioLosSantos(),
            new WCTR()
        ];
    }

    return stations;
}

export function getStationByName(name: string): Station|null {
    return getStations().find(station => station.name.toLowerCase() === name.toLowerCase()) ?? null;
}
