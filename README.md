# [GTATunes](https://gtatunes.net)

Play all the radio stations from the GTA 3D Universe games in one place!

# API Usage

## Objects

### Station Object

```json5
{
    "name": "Station Name",
    "icon": "Station Icon URL",
    "songs": [
        // song objects
    ]
}
```

### Song Object

```json5
{
    "name": "Song Name",
    "artist": ["Song Artists"],
    "year": "Song Year Released"
}
```

## Get Stations

GET `/api/stations` (source: `/server/api/stations.get.ts`)

```json5
{
    "sa": [
        // station objects
    ],
    "vc": [
        // station objects
    ],
    "iii": [
        // station objects
    ]
}
```

## Get Game Stations

GET `/api/stations/:game` (source: `/server/api/stations/[game].get.ts`)

```json5
[
  // station objects
]
```

## Play Music

GET `/api/play` (source: `/server/api/play.get.ts`)

### Query Parameters

- `station` (required): The name of the station to play
- `song` (optional): The name of the song to play. (default: Random song)
- `intro` (optional): Which intro to play, usually 1-3, set 0 for no DJ (default: Random intro)*
- `outro` (optional): Which outro to play, usually 1-3, set 0 for no DJ (default: Random outro)*
- `stream` (optional): Whether to respond with an audio stream or wait until the audio is concatenated.**
- `segment` (optional): Insert a segment before the song starts this parameter can be either `ID`, `Caller`, or `DJ`.***

*Note: SFUR doesn't have audio files without the DJ, so setting `intro` and `outro` to 0 will still play the DJ.

**Note: Using an audio stream gets a faster response but be warned that if you are using the audio stream parameter on mobile devices, there is a high chance the audio will break or restart throughout the song. I'm not entirely sure why, but I believe this is due to mobile browsers closing the stream connection prematurely.

***Note: As of now you can't select a specific segment from the type but I would like to make the API more verbose to allow for this in the future.

# DISCLAIMER

Due to the API eventually needed to support multiple games (SA, VC, III) the API **WILL** change in the near future to support this. I will add versioning to the endpoints to help mitigate breaking changes and give them time to update their applications the utilize the API.
