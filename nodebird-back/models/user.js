const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataType) => {
  const User = sequelize.define(
    "User",
    {
      // MySQL에는 users 테이블 생성
      // id가 기본적으로 들어있다.
      email: {
        type: DataTypes.STRING(30), // 데이터 타입은 STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME 이 존재
        allowNull: false, // 필수
        unique: true, // 고유한 값
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false, // 필수
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false, // 필수
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci", // 한글 저장
    }
  );
  User.associate = (db) => {
    db.User.hasMany(db.Post); // 사람이 Post를 여러개 가질수 있다
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followers",
      foreignKey: "FollowingId",
    });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followings",
      foreignKey: "FollowerId",
    });
  };
  return User;
};
