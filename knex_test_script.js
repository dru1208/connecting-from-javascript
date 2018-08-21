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

const input = process.argv[2]

const printResult = (result) => {
  console.log(`Searching...\nFound ${result.length} person(s) by the name of '${input}':`);
  let count = 1;
  for (let match of result) {
    console.log(`- ${count}: ${match.first_name} ${match.last_name}, born ${String(match.birthdate).slice(0, 10)}`);
    count += 1;
  }
}

function knexGetPeople (callback) {
  knex.select('first_name', 'last_name', 'birthdate')
    .from('famous_people')
    .where('first_name', '=', input)
    .orWhere('last_name', '=', input)
    .asCallback(function(err,  result) {
      if (err) return console.log(err)
      printResult(result);
      knex.destroy()
    })
}

knexGetPeople();