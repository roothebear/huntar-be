const request = require("supertest")
const app = require('../app.js')
const monogoose = require('mongoose')
const seed = require('../data/seed.js')
const testdata = require('../data/test-data.json')
const games = require("../models/games.js")

let gamesSeed;
afterAll(() =>{
    return monogoose.disconnect()
})
beforeEach(() => {return seed(testdata)
.then(res => {
    gamesSeed = res;
}) 
})


describe("GET /api/games/:id", () =>{
    test('status 200, should return a game and asset', () =>{
        return request(app)
        .get(`/api/games/${gamesSeed[0]._id.valueOf()}`)
        .expect(200)
        .then(res =>{
            const games = res.body.soloGame;
            expect(games)
            .toEqual(expect.objectContaining({
                        game_name: expect.any(String), 
                        assets: expect.any(Array)
                    }))
                        games.assets.forEach((element)=> {
                            expect(element).toEqual(
                                expect.objectContaining({
                                    longitude: expect.any(Number),
                                    latitude: expect.any(Number),
                                    asset_name: expect.any(String)
              
                                })
                            )
                
                        })

        })
   
    })
})



