const amqp = require("amqplib");

const sendToRabbit = async (data) => {
  const rabbitSettings = {
    protocol: "amqp",
    hostname: process.env.HOSTNAME_RABBIT,
    port: process.env.PORT_RABBIT,
    username: process.env.USERNAME_RABBIT,
    password: process.env.PASSWORD_RABBIT,
    whost: "/",
    authMechanism: ["PLAIN","AMQPLAIN","EXTERNAL"]
  }
  try{
    const conn = await amqp.connect(rabbitSettings);  //Creamos conexion
    const chanel = await conn.createChannel();        //Creamos un canal
    const res = await chanel.assertQueue("games");    //Creamos la cola y si aya existe se utiliza
    await chanel.sendToQueue("games", Buffer.from(JSON.stringify(data)));
    console.log("Dato enviado a la cola rabbit");
    return 1;
  }catch(err){
    console.error(`Error -> ${err}`);
    return -1;
  }
}

const createConnection = async () => {
  const rabbitSettings = {
    protocol: "amqp",
    hostname: process.env.HOSTNAME_RABBIT,
    port: process.env.PORT_RABBIT,
    username: process.env.USERNAME_RABBIT,
    password: process.env.PASSWORD_RABBIT,
    whost: "/",
    authMechanism: ["PLAIN","AMQPLAIN","EXTERNAL"]
  }
  try{
    const conn = await amqp.connect(rabbitSettings);  //Creamos conexion
    const chanel = await conn.createChannel();        //Creamos un canal
    const res = await chanel.assertQueue("games");    //Creamos la cola y si ya existe se utiliza
  }catch(err){
    console.error(`Error -> ${err}`);
    return -1;
  }
}

module.exports = {
  sendToRabbit,
  createConnection
}