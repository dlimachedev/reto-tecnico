'use strict';
const axios = require('axios');

module.exports.planets = async (event) => {
  try {
    const { data: { results } } = await axios.get('https://swapi.py4e.com/api/planets/');
    const resultado = results.map( ( item ) => {
      return {
        nombre : item.name,
        periodo_de_rotacion: item.rotation_period,
        periodo_orbital: item.orbital_period,
        diametro: item.diameter,
        clima: item.climate,
        gravedad: item.gravity,
        terreno: item.terrain,
        superficie_del_agua: item.surface_water,
        poblacion: item.population,
        residentes: item.residents,
        peliculas: item.films,
        creado: item.created,
        editado: item.edited,
        url: item.url,
      }
    });
  
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          succes: true,
          message: 'List of planets',
          data: resultado,
        }
      ),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          succes: false,
          message: 'talk to the administrator',
        }
      ),
    };
  }

};