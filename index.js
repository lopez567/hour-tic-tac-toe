$(document).ready(function() {

var x = 'X';
var xText = 'Turn: Player X';
var gameEnd = false;
var o = 'O';
var oText = 'Turn: Player O';
var turn = x;
var turnCount = 0;
var board = {
  0: {
    0: null,
    1: null,
    2: null
  },
  1: {
    0: null,
    1: null,
    2: null
  },
  2: {
    0: null,
    1: null,
    2: null
  }
}

var reset = function() {
  turn = x;
  $('.text').text(xText);
  for (var i in board) {
    for (var j in board[i]) {
      var id = i.toString() + j.toString();
      $('#'+id).text('');
      board[i][j] = null;
    }
  }
  turnCount = 0;
  gameEnd = false;
}

var changeTurn = function() {
  if (turn === x) {
    turn = o;
    $('.text').text(oText);
  } else {
    turn = x;
    $('.text').text(xText);
  }
  turnCount++;
  if (turnCount === 9) {
    gameEnd = true;
    $('.text').text('Draw! Click Me to Reset!');
  }
}

var handleWin = function() {
  var victoryText = 'Player ' + turn + ' Wins! Click Me to Reset!';
  gameEnd = true;
  $('.text').text(victoryText);
}

var checkRows = function() {
  for (var i in board) {
    var count = 0;
    for (var j in board[i]) {
      if (board[i][j] === turn) {
        count++
      }
    }
    if (count === 3) {
      handleWin()
    }
  }
}

var checkColumns = function() {
  for (var i in board) {
    var count = 0;
    for (var j in board[i]) {
      if (board[j][i] === turn) {
        count++
      }
    }
    if (count === 3) {
      handleWin()
    }
  }
}

var checkDiag = function() {
  var count = 0;
  var countTwo = 0;
  for (var i = 0; i < 3; i++) {
    if (board[i][i] === turn) {
      count++;
    }
    if (board[2-i][2-i] === turn) {
      countTwo++;
    }
  }
  if (count === 3 || countTwo === 3) {
    handleWin();
  }
}

var checkResults = function() {
  checkRows();
  checkColumns();
  checkDiag();
}


var handleClick = function(box) {
  if (board[box[0]][box[1]]) {
    return;
  } else {
    board[box[0]][box[1]] = turn;
    var changed = '#' + box.join('');
    $(changed).text(turn);
    checkResults(turn);
    if (!gameEnd) {
      changeTurn();
    }
  }
}


$('td').click(function(e) {
  if (!gameEnd) {
    var box = e.target.id.split('');
    handleClick(box);
  }
});

$('.text').click(function(){
  if (gameEnd) {
    reset();
  }
})

})
