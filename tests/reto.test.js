'use strict';

const reto = require('../api/reto');
const eventGenerator = require('../tests/eventGenerator');

describe( 'reto tests ', () => {
  
  test( 'save a user', async ()=>{

    const event = eventGenerator({
      fullname:'Diego Angel',
      email:'correo@prueba.com'
    });
    const res = await reto.submit(event);
    expect(res.statusCode).toBe(200);
  });

});