//Variáeis da Bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro =15;
let raio = diametro / 2;
let chanceDeErrar = 0;

let colidiu = false;

//Variaveis de velocidade
let velocidadeXBolinha = 7;
let velocidadeYBolinha = 7;
let velMovimentaRaqueteP1 = 7;
let velMovimentaRaqueteP2;

//Variaveis das Raquetes
let yRaquetePlayer2 = 150;
let yRaquetePlayer1 = 150;
let xRaquetePlayer2 = 590;
let xRaquetePlayer1 = 5;
let larguraRaquete = 7;
let alturaRaquete = 95;

//Variaveis do Placar
let pontosPlayer1 = 0;
let pontosPlayer2 = 0;

//Variaveis dos sons
let raquetada;
let ponto;
let trilhaFundo;

function preload() {
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  raquetePlayer1();
  movimentaRaquetePlayer1();
  raquetePlayer2();
  colisaoRaquetePlayer1();
  movimentaRaquetePlayer2();
  colisaoRaquetePlayer2();
  placar();
}

function mostraBolinha (){
  
  circle(xBolinha, yBolinha, diametro);
  xBolinha += velocidadeXBolinha;
  yBolinha = yBolinha + velocidadeYBolinha;
  
  if (xBolinha + raio > width || xBolinha - raio < 0) {
     velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
      velocidadeYBolinha = velocidadeYBolinha * -1;
  }
}

function raquetePlayer1 () {
  rect (xRaquetePlayer1, yRaquetePlayer1, larguraRaquete, alturaRaquete);
}

function raquetePlayer2 () {
  rect (xRaquetePlayer2, yRaquetePlayer2, larguraRaquete, alturaRaquete);
}

function movimentaRaquetePlayer1 () {
  if (keyIsDown(87)) {
    yRaquetePlayer1 -= velMovimentaRaqueteP1;
      if (yRaquetePlayer1 < 0){
        yRaquetePlayer1 += velMovimentaRaqueteP1;
      }
  }
  if (keyIsDown(83)) {
    yRaquetePlayer1 += velMovimentaRaqueteP1;
      if (yRaquetePlayer1 + alturaRaquete > height) {
        yRaquetePlayer1 -= velMovimentaRaqueteP1;
      }
    }
}

function movimentaRaquetePlayer2 () {
  velMovimentaRaqueteP2 = yBolinha - yRaquetePlayer2 - (alturaRaquete / 2) - 30;
  yRaquetePlayer2 += velMovimentaRaqueteP2 + chanceDeErrar;
  calculaChanceDeErrar();
}

function colisaoRaquetePlayer1 () {
  if (xBolinha - raio < xRaquetePlayer1 + larguraRaquete && yBolinha - raio < yRaquetePlayer1 + alturaRaquete && yBolinha + raio > yRaquetePlayer1) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
} 

function colisaoRaquetePlayer2 () {
  
  colidiu = collideRectCircle(xRaquetePlayer2, yRaquetePlayer2, larguraRaquete, alturaRaquete, xBolinha, yBolinha, raio)
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function placar () {
  textSize(16);
  stroke(250);
  fill(color(250, 140, 0));
  rect(135, 10, 40, 20);
  fill(255);
  text(pontosPlayer1, 150, 26);
  fill(color(250, 140, 0));
  rect(435, 10, 40, 20);
  fill(255);
  text(pontosPlayer2, 450, 26);
  stroke(0);
  
  if (xBolinha > 591) {
    pontosPlayer1 += 1;
    ponto.play();
  }
  if (xBolinha < 9) {
    pontosPlayer2 += 1;
    ponto.play();
  }
}

function calculaChanceDeErrar() {
  if (pontosPlayer2 >= pontosPlayer1) {
    chanceDeErrar += 1
    if (chanceDeErrar >= alturaRaquete / 2){
    chanceDeErrar = alturaRaquete / 2
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= -1 * (alturaRaquete / 2)){
    chanceDeErrar = alturaRaquete / 2
    }
  }
}