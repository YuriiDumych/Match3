
class Main extends Phaser.State {

	create() {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.add.image(0 , 0, 'background');

		let bgScore = this.add.sprite(this.game.world.centerX,575,'score');
		bgScore.scale.set(0.5, 0.5)
		bgScore.anchor.set(0.5,0.5)

		this.refresh = this.add.text(420, 520, 'REFRESH', {font: '30px Fredoka One', fill: '#ffffff'});
		this.refresh.anchor.set(0.5, 0.5);
		this.refresh.events.onInputDown.add(this.refreshField, this);

		this.menu = this.add.text(420, 580, 'MENU', {font: '30px Fredoka One', fill: '#ffffff'});
		this.menu.anchor.set(0.5, 0.5);
		this.menu.inputEnabled = true;
		this.menu.events.onInputDown.add(() => this.game.state.start('Menu', true, false), this);

		this.timer = 120;
		this.timerText = this.add.text(this.game.world.centerX, 510, '2:00', {font: '30px Fredoka One', fill: '#ffffff'});
		this.timerText.anchor.set(0.5, 0.5)

		let btn_sfx = this.add.button(50, 550, 'btn-sfx', this.mute, this);
		btn_sfx.scale.set(0.5, 0.5)
		btn_sfx.anchor.set(0.5, 0.5)

		this.donutColors = ['red', 'violet', 'green', 'yellow', 'blue', 'pink'];

		this.scoreText = this.add.text(this.game.world.centerX,575, 0,{font:'30px Fredoka One',fill: '#ffffff'});
		this.scoreText.anchor.set(0.5,0.5)
		this.score = 0;

		this.secondsSprite = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'seconds');
		this.secondsSprite.anchor.set(0.5, 0.5)
		this.secondsSprite.alpha = 0;

		this.activeDonut1 = null;
		this.activeDonut2 = null;
		this.canMove = false;

		this.sound = this.game.add.audio('background-audio', 0.2, true)
		this.sound.play();
		this.killSound = this.game.add.audio('kill', 0.3, false);

		this.grid = [
			[null, null, null, null, null],
			[null, null, null, null, null],
			[null, null, null, null, null],
			[null, null, null, null, null],
			[null, null, null, null, null]
		]

		this.createDonutsField();

		setInterval(() => {
			this.timer--;
			if(this.timer == 0) this.game.state.start("GameOver")
		}, 1000)	
	}

	check(){
		this.refresh.inputEnabled = false;
		let matches = [];
		//vertical
		for(let i = 0; i < this.grid.length; i++){
			for(let j = 0; j < this.grid[i].length - 2; j++){
				let color1 = this.grid[i][j].key;
				let color2 = this.grid[i][j+1].key;
				let color3 = this.grid[i][j+2].key;
				if(color1==color2 && color1==color3){
					matches.push([this.grid[i][j], this.grid[i][j+1], this.grid[i][j+2]]);
				}
			}
		}

		//horizontal
		for(let i = 0; i < this.grid.length - 2; i++){
			for(let j = 0; j < this.grid[i].length; j++){
				let color1 = this.grid[i][j].key;
				let color2 = this.grid[i+1][j].key;
				let color3 = this.grid[i+2][j].key;
				if(color1==color2 && color1==color3){
					matches.push([this.grid[i][j], this.grid[i+1][j], this.grid[i+2][j]]);
				}
			}
		}

		if(matches.length) {
			this.clearMatches(matches)
			this.resetDonuts();
		} else if (this.activeDonut2 && this.activeDonut1 && !matches.length){
			this.switchDonuts();
			this.resetDonuts();
		} else {
			this.canMove = true;
			this.refresh.inputEnabled = true;
		}
	}

	createDonutsField(){
		this.donuts = this.game.add.group();
		this.donuts.enableBody = true;
		for(let i = 0; i < this.grid.length; i++){
			for(let j = 0; j < this.grid[i].length; j++){
				let color = this.donutColors[this.rnd.integerInRange(0, this.donutColors.length - 1)]
				let donut = this.donuts.create(i*100, j*100, color)
				donut.inputEnabled = true;
				donut.events.onInputDown.add(this.click, this);
				this.grid[i][j] = donut;
				this.add.tween(donut).from({y: -1000}, 500, Phaser.Easing.Linear.In, true)
			}
		}
		this.time.events.add(700, this.check, this);
	}

	update() {

		if(this.activeDonut1 && this.canMove){
			let x = Math.floor(this.input.x / 100);
			let y = Math.floor(this.input.y / 100);
			if((this.activeDonut1.world.x/100 == x && Math.abs(this.activeDonut1.world.y/100 - y) == 1 ) || (Math.abs(this.activeDonut1.world.x/100 - x) == 1 && this.activeDonut1.world.y/100 == y)){
				if(this.grid[x][y]){
					this.canMove = false;
					this.activeDonut2 = this.grid[x][y];
					this.switchDonuts();
				}
			}
		}
 		this.timerText.setText(`${Math.floor(this.timer/60)}:${this.timer%60 < 10 ? '0'+this.timer%60 : this.timer%60}`);

	}

	mute(){
		if(!this.sound.paused){
			this.notSound = this.game.add.text(50, 520, 'X',{font: '60px Fredoka One', fill: '#ff0000'})
			this.notSound.anchor.set(0.5, 0,5)
			this.sound.pause();
		} else {
			this.notSound.destroy();
			this.sound.resume();
		}
	}

	click(donut){
		if(this.canMove){
			this.activeDonut1 = donut;
		}
	}

	switchDonuts(){
		let coords1 = {
			x: this.activeDonut1.position.x / 100,
			y: this.activeDonut1.position.y /100
		}
		let coords2 = {
			x: this.activeDonut2.position.x / 100,
			y: this.activeDonut2.position.y / 100
		}

		this.add.tween(this.activeDonut1).to({x: this.activeDonut2.position.x, y: this.activeDonut2.position.y}, 200, Phaser.Easing.Linear.In, true);
		this.add.tween(this.activeDonut2).to({x: this.activeDonut1.position.x, y: this.activeDonut1.position.y}, 200, Phaser.Easing.Linear.In, true);
		this.grid[coords1.x][coords1.y] = this.activeDonut2;
		this.grid[coords2.x][coords2.y] = this.activeDonut1;

		this.time.events.add(700, this.check, this);	
	}

	clearMatches(matches){
		for(let i = 0; i < matches.length; i++){
			for(let j = 0; j < matches[i].length; j++){
				let x = matches[i][j].position.x / 100;
				let y = matches[i][j].position.y / 100;
				this.donuts.remove(matches[i][j])
				this.grid[x][y] = null;
			 }
			 this.killSound.play();
		}
		this.putDonutsDown();
	}
	
	putDonutsDown(){
		for(let i = 0; i < this.grid.length; i++){
			for(let j = this.grid[i].length - 1; j > 0; j--){
				if(this.grid[i][j] == null && this.grid[i][j-1] != null){
					let donut = this.grid[i][j-1];
					this.grid[i][j] = donut;
					this.grid[i][j-1] = null;
					this.game.add.tween(donut).to({y: j*100}, 200, Phaser.Easing.Linear.In, true);
					j = this.grid[i].length
				}
			}
		}
		this.fillHoles();
	}

	fillHoles(){
		for(let i = 0; i < this.grid.length; i++){
			for(let j = 0; j < this.grid[i].length; j++){
				if(this.grid[i][j] == null){
					this.score += 5;
					if(this.score % 50 == 0){
						this.timer += 5;
						this.game.world.bringToTop(this.secondsSprite)
						this.add.tween(this.secondsSprite).to({alpha: 1}, 500, Phaser.Easing.Linear.In, true, 200, 1, true)
					}
					let color = this.donutColors[this.rnd.integerInRange(0, this.donutColors.length - 1)]
					let donut = this.donuts.create(i*100, j*100, color)
					donut.inputEnabled = true;
					donut.events.onInputDown.add(this.click, this);
					this.grid[i][j] = donut;
					this.add.tween(donut).from({y: -1000}, 500, Phaser.Easing.Linear.In, true)
				}
			}
		}
		this.setScore();
		this.time.events.add(700, this.check, this);	
	}

	setScore(){
		this.scoreText.setText(this.score)
	}

	resetDonuts(){
				this.activeDonut1 = null;
				this.activeDonut2 = null;
	}

	refreshField(){
		for(let i = 0; i < this.grid.length; i++){
			for(let j = 0; j < this.grid[i].length; j++){
				this.add.tween(this.grid[i][j]).to({y: 4000}, 500, Phaser.Easing.Linear.In, true)
			}
		}
		this.createDonutsField();
	}
}

export default Main;
