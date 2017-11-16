
//My today song  awsome chrome extension
// Made by Santa B 2017

$(document).ready(function () {
	$(document).on("click", 'a', function (event) {
		var href = $(this).attr('href');
		href = getId(href);
		if (href == 'error') {
			return;
		}
		
		event.preventDefault();
		
		// pause all curently playing youtube frames
		$('.youtube_frame').each(function(){
		this.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
	}

	);
		$(this).replaceWith('<iframe class="youtube_frame"  src="//www.youtube.com/embed/' + href + '?autoplay=1&enablejsapi=1" frameborder="0" allowfullscreen></iframe>');

	});
	function getId(url) {
		var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
		var match = url.match(regExp);

		if (match && match[2].length == 11) {
			return match[2];
		} else {
			return 'error';
		}
	}
	 
  

});