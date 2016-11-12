var p1 = true;

/*
 * Represent the cells by an array of 9 elements.
 * Initialize with a value of -1
 * 0 represents O
 * 1 represents X
 */
var res = [];
for (var i = 0; i < 9; i++) res.push(-1);

var playCount = 0;


$( document ).ready(function() {
	//$('#myModal').modal('show');
    $( ".cell" ).each(function( index ) {
	  	$(this).click( function() {
	  		var index = $(this).index('.cell');
			if (res[index] == -1) {
				$(this).css('background', "rgb(150, 150, 150)");
		        var img = $('<img>');
				img.attr('src', p1 ? 'images/O.png' : 'images/X.png');
				img.appendTo($(this));

				// update res
				res[index] = (p1) ? 0 : 1;

				playCount++;

				// check results 
				if (checkResults(p1)) {
					playCount = 0;
					updateView(p1);
					p1 = true;
				} 
				// game is a draw
				else if (playCount == 9) {
					updateViewDraw();
					p1 = true;
				} 
				else {
					p1 = !p1;
				}
			}
    	});
	});

	$(".cell").each(function() {
		$(this).hover( 
			function() {
				// if not already selected, show move
				var index = $(this).index('.cell');
				if (res[index] == -1) {
					var background = p1 ? "url('images/O-translucent.png')" : "url('images/X-translucent.png')";
					background += " " + $(this).css('backgroundColor');
					$(this).css('background', background);
				}
			}, 
			function() {
				$(this).css('background', "rgb(150, 150, 150)");
			});
	});

	$( "#restart-btn" ).click(function() {
		for (var i = 0; i < res.length; i++) {
			res[i] = -1;
		}

		// remove all images
		for (var i= document.images.length; i-->0;)
			document.images[i].parentNode.removeChild(document.images[i]);

		// close modal
		$('#myModal').modal('hide');
	});
});

function checkResults(OTurn) {
	var toCheck = (OTurn) ? 0 : 1;
	// check rows
	for (var i = 0; i < 3; i++) {
		var thisRow = true;
		for (var j = 0; j < 3; j++) {
			if (res[(3 * i) + j] != toCheck) {
				thisRow = false;
				break;
			}
		}
		if (thisRow) return true;
	}

	// check columns
	for (var i = 0; i < 3; i++) {
		var thisCol = true;
		for (var j = 0; j < 3; j++) {
			if (res[i + (3 * j)] != toCheck) {
				thisCol = false;
				break;
			}
		}
		if (thisCol) return true;
	}

	// check diagonals
	if (res[0] == toCheck && res[0] == res[4] && res[0] == res[8]) return true;
	if (res[2] == toCheck && res[2] == res[4] && res[2] == res[6]) return true;

	return false;
}

function updateView(p1Winner) {
	// update text 
	var res = (p1Winner) ? "Player 1 Wins!" : "Player 2 Wins!";
	$('#result').html(res);

	$('#myModal').modal({
		show: true,
	    backdrop: 'static',
	    keyboard: false
	})
}

function updateViewDraw() {
	// update text 
	$('#result').html("The game is a draw! Play again!");

	// reset count
	playCount = 0;

	// show modal
	$('#myModal').modal({
		show: true,
	    backdrop: 'static',
	    keyboard: false
	})
}

