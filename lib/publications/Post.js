Meteor.publish("Post", function tasksPublication() {
  // 实时订阅 todos 总数
  Counts.publish(this, "PostCounts", Post.find({}));
  return Post.find({});
});
