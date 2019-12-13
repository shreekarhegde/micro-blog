const users = require('./users/users.service.js');
const blogs = require('./blogs/blogs.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(blogs);
};
