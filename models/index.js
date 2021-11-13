// activity
const Activity = function(dbactivity) {
  this.id = dbactivity.id;
  this.user_id = dbactivity.user_id;
  this.user_name = dbactivity.user_name;
  this.sauna_id = dbactivity.sauna_id;
  this.sauna_name = dbactivity.sauna_name;
  this.report = dbactivity.report;
  this.relax = dbactivity.relax;
  this.created_at = dbactivity.created_at;
};

// sauna
const Sauna = function(dbsauna) {
  this.id = dbsauna.id;
  this.sauna_name = dbsauna.sauna_name;
  this.sauna_temp = dbsauna.sauna_temp;
  this.water_temp = dbsauna.water_temp;
  this.presence_loyly = dbsauna.presence_loyly;
};

module.exports = function(knex) {
  const getActivities = () => {
    return knex("activities")
      .innerJoin("saunas", "saunas.id", "activities.sauna_id")
      .innerJoin("users", "users.id", "activities.user_id")
      .select(
        "activities.id as id",
        "activities.user_id as user_id",
        "users.user_name as user_name",
        "activities.sauna_id as sauna_id",
        "saunas.sauna_name as sauna_name",
        "report as report",
        "relax as relax",
        "created_at as created_at"
      )
      .then((activities) => {
        if (activities.length > 0) {
          return activities.map((activity) => new Activity(activity));
        }
        return Promise.reject("Error");
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  };

  const getActivities_async = () => {
    return knex("activities")
      .innerJoin("saunas", "saunas.id", "activities.sauna_id")
      .innerJoin("users", "users.id", "activities.user_id")
      .select(
        "activities.id as id",
        "activities.user_id as user_id",
        "users.user_name as user_name",
        "activities.sauna_id as sauna_id",
        "saunas.sauna_name as sauna_name",
        "report as report",
        "relax as relax",
        "created_at as created_at"
      );
  };

  const getActivity = (params) => {
    const { id } = params;
    return knex("activities")
      .innerJoin("saunas", "saunas.id", "activities.sauna_id")
      .innerJoin("users", "users.id", "activities.user_id")
      .select(
        "activities.id as id",
        "activities.user_id as user_id",
        "users.user_name as user_name",
        "activities.sauna_id as sauna_id",
        "saunas.sauna_name as sauna_name",
        "report as report",
        "relax as relax",
        "created_at as created_at"
      )
      .where({ "activities.id": id })
      .then((activities) => {
        if (activities.length > 0) {
          return new Activity(activities.pop());
        }
        return Promise.reject("Error");
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  };

  const getActivity_async = async (params) => {
    const { id } = params;
    const result = await knex("activities")
      .innerJoin("saunas", "saunas.id", "activities.sauna_id")
      .innerJoin("users", "users.id", "activities.user_id")
      .select(
        "activities.id as id",
        "activities.user_id as user_id",
        "users.user_name as user_name",
        "activities.sauna_id as sauna_id",
        "saunas.sauna_name as sauna_name",
        "report as report",
        "relax as relax",
        "created_at as created_at"
      )
      .where({ "activities.id": id });

    if (result.length > 0) {
      return new Activity(result.pop());
    }
  };

  const createActivities = (params) => {
    const { user_id, sauna_id, report, relax } = params;

    return knex("activities")
      .insert({
        user_id,
        sauna_id,
        report,
        relax,
      })
      .then((result) => {
        return result;
      });
  };

  const updateActivities = (params) => {
    const { id, report, relax } = params;

    return knex("activities")
      .update({
        report,
        relax,
      })
      .where({ id })
      .then((result) => {
        return result;
      });
  };

  const deleteActivities = (params) => {
    const { id } = params;

    return knex("activities")
      .delete()
      .where({ id })
      .then((result) => {
        return result;
      });
  };

  const getSaunas = knex("saunas").select();

  return {
    // list: getActivities().map((activity) => new Activity(activity)),
    list: getActivities,
    list_async: getActivities_async,
    selectSingle: getActivity,
    selectSingle_async: getActivity_async,
    create: createActivities,
    update: updateActivities,
    delete: deleteActivities,
    getSauna: getSaunas.map((sauna) => new Sauna(sauna)),
  };
};
