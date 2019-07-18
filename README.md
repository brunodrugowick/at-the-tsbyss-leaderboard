# Leaderboard API for at-the-tsbyss

This is the Leaderboards API for the [at-the-tsbyss game](https://github.com/one-two/at-the-tsbyss).

## Endpoints

### GET on /api/leaderboard
Returns the leaderboard:
```
{
  "docs": [
    {
      "_id": "5d2957ef2616604d11fb90e1",
      "name": "Bruno Drugowick",
      "score": "102",
      "createdAt": "2019-07-13T04:02:55.158Z",
      "updatedAt": "2019-07-13T05:47:24.347Z",
      "__v": 0
    },
    {
      "_id": "5d2967211016e15ccb929e86",
      "name": "Drugo",
      "score": "340",
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

You can append query string to the URL. Example:
```
.../leaderboard?page=3&limit=20
```

Valid values are:

- `page`, which defaults to `1`
- `limit`, which defaults to `10`
- `sortType`, which defaults to `desc` but also accepts `asc`
- `sortField`, which accepts any field from the model

### POST on /api/score
Creates a new Score. Body must be a JSON like so:
```
{
	"name": "Drugo",
	"score": "999"
}
```

### GET on /api/score/:id
Returns one Score. `:id` must be a valid id from the database (_id on MongoDB). For example `5d296aa4d72d7660544850ac`. Return example:
```
{
  "_id": "5d2957ef2616604d11fb90e1",
  "name": "Bruno Drugowick",
  "score": "102",
  "createdAt": "2019-07-13T04:02:55.158Z",
  "updatedAt": "2019-07-13T05:47:24.347Z",
  "__v": 0
}
```

### PUT on /api/score/:id'
Updates a Score. `:id` must be a valid id from the database (_id on MongoDB). For example `5d296aa4d72d7660544850ac`. Returns the updated Score (same as GET on the same endpoint).

Body must be a JSON like so (all values are optional):
```
{
	"name": "Drugo",
	"score": "999"
}
```

### DELETE on /api/score/:id
Removes a Score. `:id` must be a valid id from the database (_id on MongoDB). For example `5d296aa4d72d7660544850ac`. Returns nothing.

## Environment Variables for the application to work properly
For development, I recommend the use of `dotenv` package, then you can have those env vars set on a .env file. For production, please, make sure to use at least the required env vars below:

- Optional. `PORT=<port>`. Specifies the port for the application to run, like `3000` for example. Defaults to `3333` if not present.
- Required. `DB=<connection url>`. Specifies the MongoDB connection URL.

## Code examples for development of this project

### Create a new score at MongoDB

```
const Score = mongoose.model('Score');
Score.create({
    name: "Bruno Drugowick",
    score: "100"
});
```
