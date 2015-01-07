$(document).ready(function() {
	'use strict';

	$('.toogler i').on('click', function(e) {
		e.stopPropagation();
		var $this = $(this);
		var $toogler = $this.parent();
		if($this.hasClass('arrow-down')){
			$this.removeClass('arrow-down').addClass('arrow-right');
			$toogler.parent().children('ul').hide();
		} else {
			$this.removeClass('arrow-right').addClass('arrow-down');
			$toogler.parent().children('ul').show();
		}
	});
});