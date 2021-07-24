require('dotenv').config()
const data = require('./MOCK_DATA.json')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const { UserModel } = require('../user')
let connection = null

const formattedData = data.map((user) => {

    try {
        user.hash = bcrypt.hashSync(user.password, 10)
    } catch (error) {
        console.log(error);
    }
    return user
})
// console.log(formattedData);
//generate hash
const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?authSource=admin&replicaSet=atlas-ov6942-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`
console.log(mongoURI);
 mongoose.connect( mongoURI, { useNewUrlParser: true, useUnifiedTopology: true } )
  .then(connResp => {
    connection = connResp
    return UserModel.insertMany(formattedData)
  })
  .then(insertResp => {
      console.log('successful data insertion')
  })
  .catch(err => {
    console.log(err)
  })
  .finally(() => {
      if (connection !== null) {
          connection.disconnect()
      }
  })