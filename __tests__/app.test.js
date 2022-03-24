const request = require('supertest');
const app = require('../app.js');
const mongoose = require('mongoose');
const seed = require('../data/seed.js');
const testdata = require('../data/test-data.json');
const games = require('../models/games.js');

let gamesSeed;
afterAll(() => {
  return mongoose.disconnect();
});
beforeEach(() => {
  return seed(testdata).then((res) => {
    gamesSeed = res;
  });
});

describe('GET /api/games/:id', () => {
  test('status 200, should return a game and asset', () => {
    return request(app)
      .get(`/api/games/${gamesSeed[0]._id.valueOf()}`)
      .expect(200)
      .then((res) => {
        const games = res.body.soloGame;
        expect(games).toEqual(
          expect.objectContaining({
            game_name: expect.any(String),
            assets: expect.any(Array),
          })
        );
        games.assets.forEach((element) => {
          expect(element).toEqual(
            expect.objectContaining({
              longitude: expect.any(Number),
              latitude: expect.any(Number),
              asset_name: expect.any(String),
            })
          );
        });
      });
  });
  test('status 400: should return an error message if bad request is received', () => {
    return request(app)
      .get('/api/games/not_a_game_id')
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe(
          'Cast to ObjectId failed for value "not_a_game_id" (type string) at path "_id" for model "games"'
        );
      });
  });
  test('status 404: page not found', () => {
    return request(app)
      .get('/api/games')
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe('Path not found');
      });
  });
});

describe('POST- /api/games/:id', () => {
  test('Post should add a new game', () => {
    const postGame = {
      game_name: 'Kalums-football-party',
      assets: [
        { longitude: 55.27598, latitude: -2.63349, asset_name: 'mushroom' },
        { longitude: 53.26238, latitude: -2.33359, asset_name: 'mushroom' },
        { longitude: 52.17798, latitude: -2.62659, asset_name: 'mushroom' },
        {
          longitude: 52.77238,
          latitude: -2.86659,
          asset_name: 'treasure-box',
        },
        {
          longitude: 53.86238,
          latitude: -2.55659,
          asset_name: 'treasure-box',
        },
      ],
    };
    return request(app)
      .post('/api/games')
      .send(postGame)
      .expect(201)
      .then((res) => {
        const newGame = res.body.game_name;
        expect(typeof res.body.objectId.valueOf()).toBe('string');
      });
  });
  test('status 400: should return an error message if incorrect object key is received', () => {
    const postGame = {
      game_fame: 'Kalums-football-party',
      assets: [
        { longitude: 55.27598, latitude: -2.63349, asset_name: 'mushroom' },
        { longitude: 53.26238, latitude: -2.33359, asset_name: 'mushroom' },
        { longitude: 52.17798, latitude: -2.62659, asset_name: 'mushroom' },
        {
          longitude: 52.77238,
          latitude: -2.86659,
          asset_name: 'treasure-box',
        },
        {
          longitude: 53.86238,
          latitude: -2.55659,
          asset_name: 'treasure-box',
        },
      ],
    };
    return request(app)
      .post('/api/games')
      .send(postGame)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe(
          'games validation failed: game_name: Path `game_name` is required.'
        );
      });
  });
  test('status 400: should return an error message if incorrect value is received ', () => {
    const postGame = {
      game_name: 'Kalums-football-party',
      assets: [
        { longitude: 'kalum', latitude: -2.63349, asset_name: 'mushroom' },
        { longitude: 53.26238, latitude: -2.33359, asset_name: 'mushroom' },
        { longitude: 52.17798, latitude: -2.62659, asset_name: 'mushroom' },
        {
          longitude: 52.77238,
          latitude: -2.86659,
          asset_name: 9,
        },
        {
          longitude: 53.86238,
          latitude: -2.55659,
          asset_name: 9,
        },
      ],
    };
    return request(app)
      .post('/api/games')
      .send(postGame)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe(
          'games validation failed: assets.0.longitude: Cast to Number failed for value "kalum" (type string) at path "longitude"'
        );
      });
  });
});
