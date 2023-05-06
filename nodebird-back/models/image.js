const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataType) => {
  const Image = sequelize.define(
    "Image",
    {
      // id가 기본적으로 들어있다.
      src: {
        type: DataTypes.STRING(200),
        allowNull: false, // 필수
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci", // 이모티콘 저장
    }
  );
  Image.associate = (db) => {
    db.Image.belongsTo(db.Post);
  };
  return Image;
};
