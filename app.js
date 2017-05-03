var state = {
	videos: []
};

var YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';


// ================================================================================
// Lightbox and video functionality methods
// ================================================================================ 

// 
// Handles lightbox playback & interaction
// 
function videoHandler(videoID) {
	var videoObj = getVideoObj(videoID);

	openVideoLightbox(videoID);
	displayYoutubeChannel(videoObj);
}


// 
// Fetches the object associated with the given video ID
// 
function getVideoObj(videoID) {
	var videoObj;
	state.videos.forEach(function(video) {
		if(video.id.videoId == videoID) {
			videoObj = video;
			return;
		};
	});
	return videoObj;
}

// 
// Displays the lightbox & automatically plays the given video
// 
function openVideoLightbox(videoID) {
	$('#myModal').show();
	$('iframe').attr('src', 'https://www.youtube.com/embed/' 
							+ videoID + '?autoplay=1&controls=1');	
}					 


// 
// Displays a link to the channel associated with the video
//  & invokes an event listener on link 
// 
function displayYoutubeChannel(videoObj) {
	$('#chanelName').text(videoObj.snippet.channelTitle);

	// Event Listener for YouTube channel
	$('#chanelName').click(function(e){
		e.preventDefault();
		var channelID = videoObj.snippet.channelId;
		openYoutubeChannel(channelID);
	});
}


// 
// Stops video from playing, resets counter to beginning
// 
function stopVideo() {
	var iframe = $('#myModal iframe');
	iframe.attr('src', iframe.attr('src'));
}


// 
// Opens the video's YouTube channel in a new window
// 
function openYoutubeChannel(channelID) {
	var win = window.open('https://www.youtube.com/channel/' + channelID, '_blank');
	if (win) {
		win.focus();
	} else {
		alert('Please enable pop-ups for this website');
	}
}



// ================================================================================
// API calls and data storage & display
// ================================================================================ 

// 
// Displays the results from the API call in the browser
// 
function displayYoutubeSearchData() {
	var results = state.videos;
	results.forEach(function(item){
		var img = $('<img class="thumbnail">');
		img.attr('src', item.snippet.thumbnails.medium.url);
		img.attr('id', item.id.videoId);
		$('.js-results ul').append(img);
		$('.js-more').removeClass('hidden');
	});
}


// 
// Stores each data (video) object from API
//  into an array in the state object.
// Then makes call to display data.
// 
function storeYoutubeSearchData(data) {
	console.log(data);
	state.videos = data.items;
	displayYoutubeSearchData();
}


// 
// Call to API to fetch data based on 
// search criteria given
// 
function getDataFromApi(searchTerm, callback) {
	var query = {
		part: 'snippet',
		key: 'AIzaSyArJZeQtHAkxb2QjD3ho-2H-XR4NcWOkss',
		q: searchTerm,
		type: 'video',
		maxResults: 50
	};
	$.getJSON(YOUTUBE_BASE_URL, query, callback);
}


// ================================================================================
// Event Listeners 
// ================================================================================
function formSubmit() {
	$('.query-form').submit(function(e) {
		e.preventDefault();
		$('.js-results ul').empty();
		var query = $(this).find('.js-query').val();
		getDataFromApi(query, storeYoutubeSearchData);
	});
}

function toggleVideo() {
	$('ul').on('click', 'img', function(e){
		e.preventDefault();
		//openVideo($(this).attr('id'));
		var videoID = $(this).attr('id');
		videoHandler(videoID);
	});
}

function closeLightbox() {
	$('.js-close').click(function(e)  {
		e.preventDefault();
		stopVideo();
		$('#myModal').hide();
	});
	$('#myModal').click(function(e){
		e.preventDefault();
		if(e.target == $('.modal').get()[0]) {
			stopVideo();
			$('#myModal').hide();
		}
	});
}


// ================================================================================
// Entry point event-listeners 
// ================================================================================
$(function() {
	formSubmit();
	toggleVideo();
	closeLightbox();
});