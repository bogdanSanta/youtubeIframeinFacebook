//My today song  awesome chrome extension
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
		$('.youtube_frame').each(function () {
				this.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
			}

		);
		var element = document.createElement("iframe");

		element.className = 'youtube_frame';
		element.src = '//www.youtube.com/embed/' + href + '?autoplay=1&enablejsapi=1';
		element.frameBorder = '0';

		element.allowFullscreen = true;
		element.width = '476';
		element.height = '267';


		var parent = $(this).closest(".userContentWrapper").find(".mtm");
	          parent.replaceWith(element);

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