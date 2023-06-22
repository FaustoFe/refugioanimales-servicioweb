const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 5000
const app = express();

app.use(cors());
app.use(express.json());
app.use(require('./routes/index'));

app.listen(PORT);

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Refugio API",
        version: "1.0.0",
        description:
          "Documentacion de Refugio API",
        contact: {
          name: "Fausto Fernández",
        },
      },
      servers: [
        {
          url: "https://iaw-faustofe-servicio-web.herokuapp.com",
        },
      ],
    },
    apis: ["./routes/index.js"],
  };
  
  const specs = swaggerJsdoc(options);
  app.use(
    "/",
    swaggerUi.serve,
    swaggerUi.setup(specs)
  );





