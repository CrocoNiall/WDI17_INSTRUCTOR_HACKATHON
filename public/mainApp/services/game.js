angular.module('game').service('Game' , GameService);

function GameService() {

	this.players = [];

	this.newPlayer = function(player) {

		 this.players.push(player); 

		 var speechString = 'Player ' + player.playerNo + ' joined.'
		 setTimeout(function(){ responsiveVoice.speak(speechString, "US English Female",  {rate: 1}); }, 1000)

	}

	this.getPlayer = function(id) {

		for(var i = 0 ; i < this.players.length ; i++) {

			var player = this.players[i];

			if(player.playerNo == id)
				return player;

		}

	}

	this.updateScore = function(id , correct) {

		var player = this.getPlayer(id);

		player.score += correct ? 1 : -1;

	}

}