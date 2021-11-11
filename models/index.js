// activity
const Activity = function(dbactivity) {
  this.id = dbactivity.id;
  this.sauna_id = dbactivity.sauna_id;
  this.report = dbactivity.report;
  this.relax_level = dbactivity.relax_level;
  this.created_at = dbactivity.created_at;
};

Activity.prototype.serialize = function() {
  // serialize を使用してオブジェクトをフォーマットし、
  // パスワードなどクライアントに送信すべきでない情報（パスワードなど）を削除します。
  return {
    id: this.id,
    sauna_id: this.sauna_id,
    report: this.report,
    relax_level: this.relax_level,
    created_at: this.created_at,
  };
};

module.exports = function(knex) {
  const activitys = knex("activities").select();
  return {
    list: activitys.map((activity) => new Activity(activity)),
  };
};
