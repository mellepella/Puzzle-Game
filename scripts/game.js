// Time-trackers

const START_TIME = new Date();

const ONE_SECOND = 1000;

// Variables used all around

const KEY_CODES = {
	'w': 119,
	'a': 97,
	's': 115,
	'd': 100,
	'r': 114
}

const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 500;

let currentScene = scenes.length - 1;

const FONT = "Arial";

let gameIsRunning = true;

const UPDATE_TIME = 5;

const UNIT_SIZE = 50;

const PLAYER_VELOCITY = UNIT_SIZE/10;

let startingX = UNIT_SIZE * 9;
let startingY = UNIT_SIZE * 4;


// Cubes

const PLAYER_CUBE = new PlayerCube(startingX, startingY);

class Game {
	static calculateTime() {
		const endTime = new Date();

		const elapsedMilliseconds = endTime.getTime() - START_TIME.getTime();

		let elapsedSeconds = Math.round(elapsedMilliseconds/ONE_SECOND);

		const elapsedMinutes = Math.floor(elapsedSeconds/60);

		elapsedSeconds = elapsedSeconds - elapsedMinutes * 60;

		return [elapsedSeconds, elapsedMinutes];
	}

	static clearCanvas() {
		ctx.fillStyle = "#f0f0f0";
		ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
	}

	static detectKeyPress(event) {
		switch(event.charCode) {
			case KEY_CODES.w:
				PLAYER_CUBE.go('up');
				break;
			
			case KEY_CODES.s:
				PLAYER_CUBE.go('down');
				break;

			case KEY_CODES.a:
				PLAYER_CUBE.go('left');
				break;
			
			case KEY_CODES.d:
				PLAYER_CUBE.go('right');
				break;
			
			case KEY_CODES.r:
				this.restart();
				break;
		}
	}

	static restart() {
		PLAYER_CUBE.stop(startingX, startingY);
		PLAYER_CUBE.isColliding = false;
	}

	static update() {
		if(gameIsRunning) {
			Game.clearCanvas();
			PLAYER_CUBE.update();
			UserInterface.displayText( {x: 17.2, y: 2, size: "20px", content: `${this.calculateTime()[1]} : ${this.calculateTime()[0]}`} );
			UserInterface.displayText( { x: 17, y: 1, size: "20px", content: `Level ${currentScene}` });
		}

		scenes[currentScene - 1]();
	}

}

// Animate

setInterval(function() {
	Game.update();
}, UPDATE_TIME);