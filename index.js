// endpoint
const YT_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";

function getApiData(searchTerm, callback) {
	// query schema for data 
	const query = {
		part: 'snippet',
		key: 'AIzaSyAs8jayFvRI7XXVbgQiWNUPo-XaVFAEh1k', 
		q: searchTerm
	};
	$.getJSON(YT_SEARCH_URL, query, callback);
}

function renderResult(result) {
  return `
		<div> 
			<a href="https://www.youtube.com/watch?v=${result.id.videoId}"><img class="js-image" src="${result.snippet.thumbnails.high.url}" alt="Video Thumbnail"></a>
		</div>
  `; 
}

function displayVideos(data) {
	const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getApiData(query, displayVideos);
  });
}

$(watchSubmit);
