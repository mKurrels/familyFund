var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: __dirname + "/ff.sqlite"
  }
});

db = require('bookshelf')(knex);

db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    console.log('nope, doesnt exist');
    return knex.schema.createTable('users', function(t) {
      t.increments('id').primary();
      t.string('venmoID');
      t.decimal('value');
      t.boolean('isManager');
      t.timestamps();
      // t.integer('pot_id').references('id').inTable('pots');
      // t.date('createdAt');
      // t.date('updatedAt');
    });
  } else {
    console.log('yep, users exists!!!');
  }
});

// db.knex.schema.hasTable('pots').then(function(exists) {
//   if (!exists) {
//     return knex.schema.createTable('pots', function(t) {
//       t.increments('id').primary();
//       t.string('venmoID');
//       t.decimal('value');
//       t.timestamps();
//       // t.date('createdAt');
//       // t.date('updatedAt');
//     });
//   } else {
//     console.log('yep, pot exists!!!');
//   }
// });

db.knex.schema.hasTable('transactions').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('transactions', function(t) {
      t.increments('id').primary();
      t.decimal('value');
      t.timestamps();
      t.integer('user_id').references('id').inTable('users');
    })
    .then(function(photos){
      console.log('Create Table transactions');
    }).catch(function(err){
      console.log('error creating table transactions: ', err);
    });
  }
});

//hi
exports.db = db;