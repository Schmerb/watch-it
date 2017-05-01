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
	var resultElement = '';
	results.forEach(function(item){
		resultElement += '<li><img class="Img" id="' + item.id.videoId + '" src="' + item.snippet.thumbnails.medium.url + '"></li>';
	});

	$('.js-results ul').html(resultElement);
}


// 
// 
// 
function watchResults() {
	$('ul').on('click', 'img', function(e){
		e.preventDefault();
		alert('Video id = ' + $(this).attr('id'));
	});
}


function watchSubmit() {
	$('.js-query-form').submit(function(e) {
		e.preventDefault();
		var query = $(this).find('.js-query').val();
		getDataFromApi(query, displayYoutubeSearchData);
	});
}

$(function() {
	watchSubmit();
	watchResults();
});