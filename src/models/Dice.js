import cuid from 'cuid';

export default class Dice {
  constructor(eyes) {
    this.eyes = parseInt(eyes) || 6;
    this.lastToss = 0;
    this.id = cuid();
    this.color = 'white';
    this.toss();
  }

  toss() {
    this.lastToss = Math.floor(Math.random() * this.eyes) + 1;
    return this.lastToss;
  }
}