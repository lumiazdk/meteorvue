Meteor.methods({
  post(op) {
    return {
      data: Post.find({}, { limit: op.limit * op.page }).fetch(),
      page: Math.ceil(Post.find({}).count() / op.limit)
    };
  }
});
