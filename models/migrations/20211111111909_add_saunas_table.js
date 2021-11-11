exports.up = async (knex) => {
  await knex.schema.createTable("saunas", (t) => {
    t.increments().index();

    t.varchar("sauna_name", 50).notNullable();

    t.integer("sauna_temp").notNullable();

    t.integer("water_temp").notNullable();

    t.boolean("presence_loyly").notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable("saunas");
};
