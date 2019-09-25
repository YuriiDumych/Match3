class GameOver extends Phaser.State {

	create() {
		this.add.image(0 , 0, 'background');
		let timeup = this.add.sprite(this.game.world.centerX, 100, 'timeup')
		timeup.scale.set(0.8, 0.8)
		timeup.anchor.set(0.5, 0.5);
		let text = this.add.text(this.game.world.centerX, this.game.world.centerY, 'RESTART', {font: '60px Fredoka One', fill: '#ffffff'})
		text.anchor.set(0.5, 0.5);
		text.inputEnabled = true;
		text.events.onInputDown.add(this.restartGame, this)
	}

	restartGame() {
		this.game.state.start("Main");
	}

}

export default GameOver;
