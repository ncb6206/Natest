const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataType) => {
  const Comment = sequelize.define(
    "Comment",
    {
      // id가 기본적으로 들어있다.
      content: {
        type: DataTypes.TEXT,
        allowNull: false, // 필수
      },
      //  belongsTo가 들어가는 곳에 아래에 있는 것들이 생긴다
      //  UserOf: 1
      //  PostId : 3
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci", // 이모티콘 저장
    }
  );
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  };
  return Comment;
};
