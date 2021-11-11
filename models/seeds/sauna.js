exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex("activities").del();
  await knex("saunas").del();
  await knex("users").del();

  await knex("saunas").insert([
    // Inserts seed entries
    {
      id: 1,
      sauna_name: "スカイスパYOKOHAMA",
      sauna_temp: 90,
      water_temp: 15,
      presence_loyly: true,
    },
    {
      id: 2,
      sauna_name: "今井湯",
      sauna_temp: 86,
      water_temp: 16,
      presence_loyly: false,
    },
    {
      id: 3,
      sauna_name: "草加健康センター",
      sauna_temp: 100,
      water_temp: 16,
      presence_loyly: true,
    },
  ]);

  await knex("users").insert([
    // Inserts seed entries
    {
      id: 1,
      user_name: "Yoshiaki Suzuki",
    },
  ]);

  await knex("activities").insert([
    // Inserts seed entries
    {
      user_id: 1,
      sauna_id: 1,
      report: "10分×3",
      relax: 5,
    },
    {
      user_id: 1,
      sauna_id: 2,
      report: "8分×4",
      relax: 1,
    },
  ]);
};
