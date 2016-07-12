$(document).ready(function() {
	isDropMenu();
		
	$(window).resize(function(){
		isDropMenu();		
	});
})

/*
	Decides if the dropdown menu should be shown or hidden
*/
function isDropMenu() {
	winSize = $(window).width();
	docSize = $(document).width();
	console.log(winSize, docSize);
	if (docSize > winSize) {
		console.log('SHOW!');
		showDropMenu();
	} else {
		console.log('HIDE!');
		hideDropMenu();
	}
}

function showDropMenu() {
	if (!$(".dropdown-toggle").length) {

		// Add a dropdown button to the mobile menu
		$("ul.mobile-nav").before("<a class='dropdown-toggle' data-toggle='dropdown' href='#' role='button' aria-haspopup='true' aria-expanded='false'> Navigation <span class='caret'></span> </a>");

		// add the dropdown menu class to the mobile menu
		$("ul.mobile-nav").toggleClass("dropdown-menu");

		// hide the other to links
		$(".navbar-right").css("display", "none");
	}
}

function hideDropMenu() {
	$(".dropdown-toggle").remove();
	$("ul.mobile-nav").removeClass("dropdown-menu");
	$('.navbar-right').css("display", "inherit");
}