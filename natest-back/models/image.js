const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Image extends Model {
  static init(sequelize) {
    return super.init(
      {
        // id가 기본적으로 들어있다.
        src: {
          //  belongsTo가 들어가는 곳에 아래에 있는 것들이 생긴다
          type: DataTypes.STRING(200),
          allowNull: false, // 필수
        },
      },
      {
        modelName: "Image",
        tableName: "images",
        charset: "utf8",
        collate: "utf8_general_ci", // 이모티콘 저장
        sequelize,
      }
    );
  }
  static associate = (db) => {
    db.Image.belongsTo(db.Post);
  };
};
