'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); 

//Conexion a DynamoDB
const dynamoDb = new AWS.DynamoDB.DocumentClient({region: 'us-east-2'});

module.exports.submit = async (event) => {

  const userInfo = ( fullname, email ) => {
    const timestamp = new Date().getTime();
    return {
      id: uuid.v1(),
      fullname: fullname,
      email: email,
      submittedAt: timestamp,
      updatedAt: timestamp,
    }
  }

  const submitUser = async ( user ) => {
    console.log('Submitting user');
    const userInfo = {
      TableName: 'users',
      Item: user,
    };

    try {
      await dynamoDb.put(userInfo).promise()
    } catch (error) {
      return error
    }
  };

  try {
    
    const { fullname, email } = JSON.parse(event.body);
    await submitUser( userInfo( fullname, email ) );
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          succes: true,
          message: `Sucessfully submitted user with email ${email}`,
        }
      ),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          succes: false,
          message: `Unable to submit user with email ${email}`,
        }
      ),
    };
  }

};

module.exports.list = async (event) => {
  
  try {
    
    const params = {
      TableName: 'users',
      ProjectionExpression: "id, fullname, email"
    };
    const result = await dynamoDb.scan(params).promise()
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          succes: true,
          message: `Sucessfully list users`,
          data: result
        }
      ),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          succes: false,
          message: `failed to load data`,
          error
        }
      ),
    };
  }

};