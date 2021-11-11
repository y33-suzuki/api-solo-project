// activity
const Activity = function(dbactivity) {
  this.id = dbactivity.id;
  this.user_id = dbactivity.user_id;
  this.user_name = dbactivity.user_name;
  this.sauna_id = dbactivity.sauna_id;
  this.sauna_name = dbactivity.sauna_name;
  this.report = dbactivity.report;
  this.relax_level = dbactivity.relax_level;
  this.created_at = dbactivity.created_at;
};

Activity.prototype.serialize = function() {
  // serialize を使用してオブジェクトをフォーマットし、
  // パスワードなどクライアントに送信すべきでない情報（パスワードなど）を削除します。
  return {
    id: this.id,
    user_id: this.user_id,
    user_name: this.user_name,
    sauna_id: this.sauna_id,
    sauna_name: this.sauna_name,
    report: this.report,
    relax_level: this.relax_level,
    created_at: this.created_at,
  };
};

module.exports = function(knex) {
  const getActivities = knex("activities")
    .innerJoin("saunas", "saunas.id", "activities.sauna_id")
    .innerJoin("users", "users.id", "activities.user_id")
    .select(
      "activities.id as id",
      "activities.user_id as user_id",
      "users.user_name as user_name",
      "activities.sauna_id as sauna_id",
      "saunas.sauna_name as sauna_name",
      "report as report",
      "relax_level as relax_level",
      "created_at as created_at"
    );

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
        "relax_level as relax_level",
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
  const createActivities = (params) => {
    const { user_id, sauna_id, report, relax_level } = params;

    return knex("activities")
      .insert({
        user_id,
        sauna_id,
        report,
        relax_level,
      })
      .then((result) => {
        return result;
      });
  };

  const updateActivities = (params) => {
    const { id, report, relax_level } = params;

    return knex("activities")
      .update({
        report,
        relax_level,
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

  return {
    list: getActivities.map((activity) => new Activity(activity)),
    selectSingle: getActivity,
    create: createActivities,
    update: updateActivities,
    delete: deleteActivities,
  };
};
