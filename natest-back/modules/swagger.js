const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "natest",
      version: "1.0.0",
      description: "Natest Node.js Swaager swagger-jsdoc 방식 RestFul API 클라이언트 UI",
    },
    servers: [
      {
        url: "http://localhost:3065", // 요청 URL
      },
    ],
  },
  apis: ["./routes/*.js", "./swagger/*"], //Swagger 파일 연동
};
const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
