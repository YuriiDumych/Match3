class Menu extends Phaser.State{

  create(){
    this.menu = this.add.image(0, 0, 'background')
    this.menu.width = 500;
    this.menu.height = 600;

    let text = this.add.text(this.game.world.centerX, 50, 'Use swipe to switch donuts', {font: '30px Fredoka One', fill: '#ffffff'})
    text.anchor.set(0.5, 0.5)

    let hor_arrows = this.add.sprite(100, 200, 'hor-arrows');
    hor_arrows.anchor.set(0.5, 0.5);

    let ver = this.add.sprite(100, 350, 'ver-arrows');
    ver.anchor.set(0.5, 0.5);

    let button = this.add.button(this.game.world.centerX, 525, 'btn-play', this.startGame, this)
		button.scale.set(0.5, 0.5);
		button.anchor.set(0.5, 0.5);

    this.hand1 = this.add.sprite(200, 200, 'hand')
    this.hand1.scale.set(0.8, 0.8)
    this.hand1.anchor.set(0.5, 0.5);

    this.hand2 = this.add.sprite(200, 400, 'hand')
    this.hand2.scale.set(0.8, 0.8)
    this.hand2.anchor.set(0.5, 0.5);

    this.add.tween(this.hand1).to({x: 300}, 1000, Phaser.Easing.Linear.In, true, 500, -1, true)
    this.add.tween(this.hand2).to({y: 300}, 1000, Phaser.Easing.Linear.In, true, 500, -1, true)

  }

  startGame(){
    this.game.state.start("Main", true, false);
  }


}

export default Menu;