class Menu extends Phaser.State{

  create(){

    this.menu = this.add.image(0, 0, 'background')

    let text = this.add.text(this.game.world.centerX, 50, 'Use swipe to get at least\n 3 donuts the same color', {font: '30px Fredoka One', fill: '#ffffff'})
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

    this.hand2 = this.add.sprite(250, 400, 'hand')
    this.hand2.scale.set(0.8, 0.8)
    this.hand2.anchor.set(0.5, 0.5);

    this.add.tween(this.hand1).to({x: 250}, 1000, Phaser.Easing.Linear.In, true, 500, -1, true)
    this.add.tween(this.hand2).to({y: 350}, 1000, Phaser.Easing.Linear.In, true, 500, -1, true)

    this.donuts = this.game.add.group();
    this.donuts.enableBody = true;
    this.donuts.scale.set(0.5, 0.5);

        
        let donut1 = this.donuts.create(320, 200, 'green');
        let donut2 = this.donuts.create(420, 200, 'pink');
        this.donuts.create(520, 200, 'green');
        this.donuts.create(620, 200, 'green');

        this.add.tween(donut1).to({x: 420}, 1000, Phaser.Easing.Linear.In, true, 1500, -1, true)
        this.add.tween(donut2).to({x: 320}, 1000, Phaser.Easing.Linear.In, true, 1500, -1, true)
        
        let donut3 = this.donuts.create(320, 560, 'red');
        let donut4 = this.donuts.create(320, 660, 'violet');
        this.donuts.create(320, 760, 'red');
        this.donuts.create(320, 860, 'red');

        this.add.tween(donut3).to({y: 660}, 1000, Phaser.Easing.Linear.In, true, 1500, -1, true)
        this.add.tween(donut4).to({y: 560}, 1000, Phaser.Easing.Linear.In, true, 1500, -1, true)
  }

  startGame(){
    this.game.state.start("Main", true, false);
  }


}

export default Menu;