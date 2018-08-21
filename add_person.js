const settings = require('./settings.json')
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});


function addPerson (){
  const input = process.argv
  knex('famous_people').insert({"first_name": input[2], "last_name": input[3], "birthdate": input[4]})
    .asCallback (function (err, result) {
      if (err) throw err
      console.log('Your message has been added.')
      knex.destroy()
    })
}

addPerson();