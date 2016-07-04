$(document).ready(function(){
	// figure out if any hideMe element on load of the page is visible
	isVisible();

	$(this).scroll(function() {
		// On each scroll event, figure out if an hideMe element is visible.
		isVisible();
	})
})

/**
	isVisible
		For each element with a class of 'hideMe', if element is visible reveal
		fade in element slowly.
**/
function isVisible() {
	$('.hideMe').each(function() {
		// element top offset, relative to the window
		elm = $(this).offset().top - $(window).scrollTop()

		// within what threshold should the element be deemed "visible"
		withinThreshold = $(window).height() - ($(this).height()) * 0.5;

		// if the element is within threshold set to true, else false
		visible =  elm < withinThreshold;

		if (visible == true) {
			$(this).removeClass('hideMe').addClass('showMe').fadeIn("slow");
		}
		
	})
}