const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Comment extends Model {
  static init(sequelize) {
    return super.init(
      {
        // id가 기본적으로 들어있다.
        content: {
          //  belongsTo가 들어가는 곳에 아래에 있는 것들이 생긴다
          type: DataTypes.TEXT,
          allowNull: false, // 필수
        },
        //  UserId: 1
        //  PostId : 3
      },
      {
        modelName: "Comment",
        tableName: "Comments",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 이모티콘 저장
        sequelize,
      }
    );
  }
  static associate = (db) => {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  };
};
