const random = require("./random");
const { sendToRabbit } = require("./rabbitConnection");

// El ganador se elige random
const game1 = async (players) => {
  const game_name = "Piedra, Papel o Tijeras";
  let winner = random(1, players);
  const result = await sendLog(1, players, game_name, winner);
  if (result === -1) return "Error in game1";
  return "Success game1";
}

// El ganador siempre es el ultimo jugador
const game2 = async (players) => {
  const game_name = "Cara o Cruz";
  const result = await sendLog(2, players, game_name, players);
  if (result === -1) return "Error in game2";
  return "Success game2";
}

// Siempre gana el jugador que corresponde a la mitad del total de jugadores, si es impar se redondea
const game3 = async (players) => {
  const game_name = "Numero mayor";
  let winner;
  if (players % 2 === 0) {
    winner = players / 2;
  } else {
    winner = Math.round(players / 2);
  }
  const result = await sendLog(3, players, game_name, winner);
  if (result === -1) return "Error in game3";
  return "Success game3";
}

// El ganador se elige de manera aleatoria únicamente en los números pares
const game4 = async (players) => {
  const game_name = "Numero menor";
  let arr = [];
  for(let i = 1; i <= players; i++){
      if(i%2===0) arr.push(i)
  }
  let winner = arr[random(0,arr.length-1)]
  const result = await sendLog(4, players, game_name, winner);
  if (result === -1) return "Error in game4";
  return "Success game4";
}

// El ganador se elige de manera aleatoria únicamente en los números impares
const game5 = async (players) => {
  const game_name = "Ruleta";
  let arr = [];
  for(let i = 1; i <= players; i++){
      if(i%2!==0) arr.push(i)
  }
  let winner = arr[random(0,arr.length-1)]
  const result = await sendLog(5, players, game_name, winner);
  if (result === -1) return "Error in game5";
  return "Success game5";
}

const sendLog = async (Game_id, Players, Game_name, Winner) => {
  const data = {
    Game_id,
    Players,
    Game_name,
    Winner,
    Queue: "RabbitMQ"
  }
  const result = await sendToRabbit(data);
  return result;
}

module.exports = {
  game1,
  game2,
  game3,
  game4,
  game5
}