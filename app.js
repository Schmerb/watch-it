var state = {
	videos: []
};


var YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
	var query = {
		part: 'snippet',
		key: 'AIzaSyArJZeQtHAkxb2QjD3ho-2H-XR4NcWOkss',
		q: searchTerm,
		type: 'video',
		maxResults: 10
	};
	$.getJSON(YOUTUBE_BASE_URL, query, callback);
}

function displayYoutubeSearchData(data) {
	console.log(data);
	var results = data.items;
	results.forEach(function(item){
		//console.log(item);
		state.videos.push(item);
		var img = $('<img class="thumbnail">');
		img.attr('src', item.snippet.thumbnails.medium.url);
		img.attr('id', item.id.videoId);
		$('.js-results ul').append(img);
		$('.js-more').removeClass('hidden');
	});
}

function openVideo(videoID) {
	var win = window.open('https://www.youtube.com/watch?v=' + videoID, '_blank');
	if (win) {
		win.focus();
	} else {
		alert('Please enable pop-ups for this website');
	}
}

function openYoutubeChannel(channelID) {
	var win = window.open('https://www.youtube.com/channel/' + channelID, '_blank');
	if (win) {
		win.focus();
	} else {
		alert('Please enable pop-ups for this website');
	}
}

function openLightbox(videoID) {
	$('#myModal').show();
	$('iframe').attr('src', 'https://www.youtube.com/embed/' 
							+ videoID + '?autoplay=1&controls=1');
	var videoObj = getVideoObj(videoID);
	$('#chanelName').text(videoObj.snippet.channelTitle);
	$('#chanelName').click(function(e){
		e.preventDefault();
		var channelID = videoObj.snippet.channelId;
		openYoutubeChannel(channelID);
	});
}					 


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
// 
// 
function watchResults() {
	$('ul').on('click', 'img', function(e){
		e.preventDefault();
		//openVideo($(this).attr('id'));
		var videoID = $(this).attr('id');
		openLightbox(videoID);
	});
}


function watchSubmit() {
	$('.query-form').submit(function(e) {
		e.preventDefault();
		$('.js-results ul').empty();
		var query = $(this).find('.js-query').val();
		getDataFromApi(query, displayYoutubeSearchData);
	});
}


function stopVideo() {
	var iframe = $('#myModal iframe');
	iframe.attr('src', iframe.attr('src'));
}


function watchModal() {
	$('.js-modal-btn').click(function(e) {
		e.preventDefault();
		$('#myModal').show();
	});

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

$(function() {
	watchSubmit();
	watchResults();
	watchModal();
});