# Grand Theft Auto Tunes

Listen to all of the radio stations from the GTA 3D universe in one place!

# API Docs

## Objects

### Station Object

```json5
{
  "name": "string",
  "key": "string",
  "icon": "string",
  "songs": "array of song objects"
}
```

### Song Object

```json5
{
  "title": "string",
  "artists": "array of strings",
  "year": "number",
  "audio": "string"
}
```

## Endpoints

### GET `/api/stations`

Returns a list of all the radio stations in the GTA 3D universe.

```json5
{
  "sa": {
    "station_key": "station object"
  },
  "iii": {
    "station_key": "station object"
  },
  "vc": {
    "station_key": "station object"
  }
}
```

### GET `/api/stations/:game`

Returns an all the radio stations in the specified game.

```json5
{
  "station_key": "station object"
}
```

### GET `/api/stations/:game/:station`

Returns the specified radio station.

```json5
{
  "name": "string",
  "key": "string",
  "icon": "string",
  "songs": "array of song objects"
}
```

### GET `/api/stations/:game/:station/songs`

Returns an array of all the songs in the specified radio station.

```json5
[
  {
    "title": "string",
    "artists": "array of strings",
    "year": "number",
    "audio": "string"
  }
]
```