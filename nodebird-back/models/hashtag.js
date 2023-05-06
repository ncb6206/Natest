const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataType) => {
  const Hashtag = sequelize.define(
    "Hashtag",
    {
      // id가 기본적으로 들어있다.
      name: {
        type: DataTypes.STRING(20),
        allowNull: false, // 필수
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci", // 이모티콘 저장
    }
  );
  Hashtag.associate = (db) => {
    db.Hashtag.belongsToMany(db.Post, { through: "PostHashtag" });
  };
  return Hashtag;
};
