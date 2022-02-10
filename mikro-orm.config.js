const path = require("path");

module.exports = {
  baseDir: path.resolve(__dirname),
  debug: true,
  dbName: "core",
  entities: [require("./output/entity").CoreEntity],
  type: "postgresql",
};
