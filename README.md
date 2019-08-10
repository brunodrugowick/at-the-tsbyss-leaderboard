# Leaderboard API for at-the-tsbyss

This is the Leaderboards API for the [at-the-tsbyss game](https://github.com/one-two/at-the-tsbyss).

## REST Endpoints

### GET on /api/leaderboard

Returns the leaderboard:

```json
{
  "docs": [
    {
      "_id": "5d2957ef2616604d11fb90e1",
      "name": "Bruno Drugowick",
      "score": 102,
      "killedby": "Orc",
      "createdAt": "2019-07-13T04:02:55.158Z",
      "updatedAt": "2019-07-13T05:47:24.347Z",
      "__v": 0
    },
    {
      "_id": "5d2967211016e15ccb929e86",
      "name": "Drugo",
      "score": 340,
      "killedby": "Spore",
      "createdAt": "2019-07-13T05:07:45.033Z",
      "updatedAt": "2019-07-13T05:07:45.033Z",
      "__v": 0
    }
  ],
  "total": 4,
  "limit": 2,
  "page": 1,
  "pages": 2
}
```

You can append query string to the leaderboard enpoint. Example:

```url
.../leaderboard?page=3&limit=20&sortType=desc&sortField=name
```

Valid values are:

- `page`, which defaults to `1`
- `limit`, which defaults to `10`
- `sortType`, which defaults to `desc` but also accepts `asc`
- `sortField`, which accepts any field from the model

### POST on /api/score

Creates a new Score. Body must be a JSON like so:

```json
{
  "name": "Drugo",
  "score": 999,
  "killedby": "Orc"
}
```

The new Score will only be saved if:

- it's a new player; OR
- the score is higher than an existing score of the same player `name`.

### GET on /api/score/:id

Returns one Score. `:id` must be a valid id from the database (_id on MongoDB). For example `5d296aa4d72d7660544850ac`. Return example:

```json
{
  "_id": "5d2957ef2616604d11fb90e1",
  "name": "Bruno Drugowick",
  "score": 102,
  "killedby": "Orc",
  "createdAt": "2019-07-13T04:02:55.158Z",
  "updatedAt": "2019-07-13T05:47:24.347Z",
  "__v": 0
}
```

## GraphQL (BETA)

Yes, there's a GraphQL API available! You can find the playground `/graphql`.

If you manage to find the GraphQL Playground, you know you have access to the schema documentation. But here are the three available operations already defined for you to quick start:

```graphql
query leaderboard {
  leaderboard {
    ...commonFields
  }
}

query score {
  score(id: "5d3e21a3c0c29f243247aae0") {
    ...allFields
  }
}

mutation createScore {
  score(
    name: "GraphQL Scorer",
    score: 123.21,
    killedby: "The truth",
  ) {
    ...allFields
    message
  }
}

fragment allFields on Score {
  id
  name
  score
  killedby
  createdAt
  updatedAt
}

fragment commonFields on Score {
  name
  score
  killedby
}
```

## Environment Variables for the application to work properly

For development, I recommend the use of `dotenv` package, then you can have those env vars set on a .env file. For production, please, make sure to use at least the required env vars below:

- Optional. `PORT=<port>`. Specifies the port for the application to run, like `3000` for example. Defaults to `3333` if not present.
- Required. `DB=<connection url>`. Specifies the MongoDB connection URL.
- Optional. `GRAPHIQL=true|false`. Determines if the Graphiql interface will be available on the graphql endpoint.
