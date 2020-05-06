import * as Phaser from 'phaser';

var config = {
  type: Phaser.CANVAS,
  width: 800,
  height: 600,
  scene: {
    create: create
  }
};

var game = new Phaser.Game({ ...config, width: window.innerWidth, height: window.innerHeight });

function create() {

  const text = this.add.text(window.innerWidth / 2, window.innerHeight / 2, 'Hello World', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
}
