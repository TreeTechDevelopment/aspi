module.exports = {
  apps : [{
    name: "app",
    script: "./server/server.js",
    env: {
      NODE_ENV: "development",
	DB:"mongodb+srv://aspiDBAdmin:Eplmw2hV1I0BNAp0@cluster0-acozv.mongodb.net/aspi?retryWrites=true&w=majority",
        JWT_KEY:"ASPI-qsdj5823e$%&Efmaw234",
        SESSION_SECRET_KEY:"ASPI-qsdj5823e"
    },
    env_production: {
      DB:"mongodb+srv://aspiDBAdmin:Eplmw2hV1I0BNAp0@cluster0-acozv.mongodb.net/aspi?retryWrites=true&w=majority",
	JWT_KEY:"ASPI-qsdj5823e$%&Efmaw234",
	SESSION_SECRET_KEY:"ASPI-qsdj5823e",
	NODE_ENV:"production"
    }
  }]
}
