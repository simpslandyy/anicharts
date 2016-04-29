$(document).ready(function(){
	$(this).scroll(function() {
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
		withinThreshold = $(window).height() - 1/2*($(this).height());

		// if the element is within threshold set to true, else false
		visible =  elm < withinThreshold

		if (visible == true) {
			$(this).removeClass('hideMe').addClass('showMe').fadeIn("slow");
		}
		
	})
}