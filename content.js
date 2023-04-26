 
	const YOUTUBE_PLAYER_BASE_URL = "https://www.youtube.com/embed/";
	const YOUTUBE_PLAYER_PARAMS = {
	  autoplay: 1,
	  modestbranding: 1,
	  enablejsapi: 1,
	  origin: window.location.origin,
	};
	const YOUTUBE_VIDEO_ID_REGEX = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
	const YOUTUBE_PLAYER_SIZE = {
	  width: "100%",
	  height: "355px",
	};
  
	function init() {
	  $(document).on("click", "a", handleClick);
	}
  
	function handleClick(event) {
	  const link = event.currentTarget;
	  const videoId = getVideoId(link.href);
  
	  if (!videoId) return;
  
	  event.preventDefault();
	  event.stopPropagation();
  
	  pauseAllPlayers();
  
	  const player = createPlayer(videoId);
	  link.replaceWith(player);
	}
  
	function getVideoId(url) {
	  const match = url.match(YOUTUBE_VIDEO_ID_REGEX);
	  return match ? match[1] : null;
	}
  
	function createPlayer(videoId) {
	  const player = document.createElement("iframe");
	  player.src = createPlayerUrl(videoId);
	  player.frameBorder = "0";
	  player.allowFullscreen = true;
	  player.title = "YouTube Video Player";
	  player.setAttribute("aria-label", "Embedded YouTube Video Player");
	  Object.assign(player.style, YOUTUBE_PLAYER_SIZE);
  
	  return player;
	}
  
	function createPlayerUrl(videoId) {
	  const params = Object.entries(YOUTUBE_PLAYER_PARAMS)
		.map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
		.join("&");
	  return `${YOUTUBE_PLAYER_BASE_URL}${videoId}?${params}`;
	}
  
	function pauseAllPlayers() {
	  const players = document.querySelectorAll("iframe[src^='https://www.youtube.com/embed/']");
  
	  players.forEach((player) => {
		player.contentWindow.postMessage(JSON.stringify({ event: "command", func: "pauseVideo" }), "*");
	  });
	}
  
	init();
 