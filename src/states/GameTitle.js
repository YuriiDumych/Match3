class GameTitle extends Phaser.State {

	create() {
		this.add.image(0 , 0, 'background');
		let logo = this.add.sprite(this.game.world.centerX, 100, 'logo');
		logo.scale.set(0.5, 0.5);
		logo.anchor.set(0.5, 0.5);
		let button = this.add.button(this.game.world.centerX, 300, 'btn-play', this.startGame, this)
		button.scale.set(0.5, 0.5);
		button.anchor.set(0.5, 0.5);

		let menu = this.add.text(this.game.world.centerX, 400, 'Menu', {font: '60px Fredoka One', fill: '#ffffff'})
		menu.inputEnabled = true;
		menu.events.onInputDown.add(this.showMenu, this);
		menu.anchor.set(0.5, 0.5);

		
	}


	startGame() {
		this.game.state.start("Main", true, false);
	}

	showMenu(){
		this.game.state.start("Menu", true, false);
	}
}

export default GameTitle;
