$(document).ready(function() {
	'use strict';

	$('.toogleable').on('click', function(e) {
		e.stopPropagation();
		var $this = $(this);
		var $toogler = $this.find('i').first();
		if($toogler.hasClass('arrow-down')){
			$toogler.removeClass('arrow-down').addClass('arrow-right');
			$this.children('ul').hide();
		} else {
			$toogler.removeClass('arrow-right').addClass('arrow-down');
			$this.children('ul').show();
		} 
	});
});