// activity
const Activity = function(dbactivity) {
  this.id = dbactivity.id;
  this.name = dbactivity.name;
};

Activity.prototype.serialize = function() {
  // serialize を使用してオブジェクトをフォーマットし、
  // パスワードなどクライアントに送信すべきでない情報（パスワードなど）を削除します。
  return {
    id: this.id,
    name: this.name,
  };
};

module.exports = function(knex) {
  const activitys = knex("activitys").select();
  return {
    list: activitys.map((activity) => new Activity(activity)),
  };
};
