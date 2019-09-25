class Preload extends Phaser.State {

	preload() {

		this.game.load.image('background', 'assets/images/backgrounds/background.jpg')
		this.game.load.image('logo', 'assets/images/donuts_logo.png')
		this.game.load.image('btn-play', 'assets/images/btn-play.png')
		this.game.load.image('red', 'assets/images/game/gem-01.png')
		this.game.load.image('violet', 'assets/images/game/gem-02.png')
		this.game.load.image('green', 'assets/images/game/gem-03.png')
		this.game.load.image('blue', 'assets/images/game/gem-04.png')
		this.game.load.image('yellow', 'assets/images/game/gem-05.png')
		this.game.load.image('pink', 'assets/images/game/gem-06.png')
		this.game.load.image('score', 'assets/images/bg-score.png')
		this.game.load.image('btn-sfx', 'assets/images/btn-sfx.png')
		this.game.load.audio('background-audio', 'assets/audio/background.mp3')
		this.game.load.audio('kill', 'assets/audio/kill.mp3')
		this.game.load.image('menu', 'assets/images/game/gem-07.png')
		this.game.load.image('ver-arrows', 'assets/images/game/gem-09.png')
		this.game.load.image('hor-arrows', 'assets/images/game/gem-10.png')
		this.game.load.image('seconds', 'assets/images/game/gem-11.png')
		this.game.load.image('hand', 'assets/images/game/hand.png')
		this.game.load.image('timeup', 'assets/images/text-timeup.png')
	}

	create() {
		this.game.state.start("GameTitle", false, false);
	}

}

export default Preload;