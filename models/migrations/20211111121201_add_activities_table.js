exports.up = async (knex) => {
  await knex.schema.createTable("activities", (t) => {
    t.increments().index();

    t.integer("user_id")
      .references("users.id")
      .notNullable()
      .index();

    t.integer("sauna_id")
      .references("saunas.id")
      .notNullable()
      .index();

    t.varchar("report", 100).notNullable();

    t.integer("relax").notNullable();

    t.timestamp("created_at")
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable("activities");
};
