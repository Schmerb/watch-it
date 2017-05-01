var YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

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

function displayYoutubeSearchData(data) {
	console.log(data);
	var results = data.items;
	results.forEach(function(item){
		var img = $('<img class="Img">');
		img.attr('src', item.snippet.thumbnails.medium.url);
		img.attr('id', item.id.videoId);
		$('.js-results ul').append(img);
		//img.wrap($("<li></li>"));
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


// 
// 
// 
function watchResults() {
	$('ul').on('click', 'img', function(e){
		e.preventDefault();
		openVideo($(this).attr('id'));
	});
}


function watchSubmit() {
	$('.query-form').submit(function(e) {
		e.preventDefault();
		alert('submit');
		var query = $(this).find('.js-query').val();
		getDataFromApi(query, displayYoutubeSearchData);
	});
}


function watchModal() {
	$('.js-modal-btn').click(function(e) {
		e.preventDefault();
		$('#myModal').show();
	});

	$('.js-close').click(function(e)  {
		e.preventDefault();
		$('#myModal').hide();
	});

	$('#myModal').click(function(e){
		e.preventDefault();
		if(e.target == $('.modal').get()[0]) {
			$('#myModal').hide();
		}
	});
}

$(function() {
	watchSubmit();
	watchResults();
	watchModal();
});