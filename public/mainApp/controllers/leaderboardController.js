angular.module('game').controller('leaderboardController' , LeaderboardController);

function LeaderboardController(Game) {

	var self = this;

	self.players = Game.players;

	return self;

}