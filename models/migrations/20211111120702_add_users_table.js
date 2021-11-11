exports.up = async (knex) => {
  await knex.schema.createTable("users", (t) => {
    t.increments().index();

    t.varchar("user_name", 50).notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable("users");
};
