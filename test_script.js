const pg = require("pg");
const settings = require("./settings"); // settings.json
const input = process.argv[2]; // input of search name

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const searchResult = (resultArray) => {
  console.log('Searching...')
  console.log(`Found ${resultArray.length} person(s) by the name of '${input}':`)
  let count = 1;
  for (let match of resultArray) {
    console.log(`- ${count}: ${match.first_name} ${match.last_name}, born ${String(match.birthdate).slice(0, 10)}`);
    count += 1;
  }
}

const query =
  `SELECT *
    FROM famous_people
    WHERE first_name = '${input}'
      OR last_name = '${input}';`;

const getPeople = (query, callback) => {
  client.connect((err) => {
    if (err) {
      return console.error("Connection Error", err);
    }

    client.query(query, [], (err, result) => {
      if (err) {
        return console.error("error running query", err);
      }
      let resultArray = result.rows;
      callback(resultArray);
      client.end();
    });
  });
};

getPeople(query, searchResult);