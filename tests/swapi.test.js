'use strict';

const swapi = require('../api/swapi');

describe( 'status code', () => {
  
  test( 'status code 200', async ()=>{
    const res = await swapi.planets();
    expect(res.statusCode).toBe(200);
  });

});