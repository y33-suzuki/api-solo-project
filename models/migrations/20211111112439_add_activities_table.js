exports.up = async (knex) => {
  await knex.schema.createTable("activities", (t) => {
    t.increments().index();

    t.integer("sauna_id")
      .references("saunas.id")
      .unique()
      .notNullable()
      .index();

    t.varchar("report", 100).notNullable();

    t.integer("relax_level").notNullable();

    t.timestamp("created_at")
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable("activities");
};
