let fetchByName = (title, year, plotLen) => {

	$.ajax({
		type: "GET",
		datatype: "JSON",
		async: true,
		url: `https://www.omdbapi.com/?s=${title}&y=${year}&plot=${plotLen}&apikey=7b29e36d`,
		success : (response) => {
			console.log(response);
			if(response.Response == "True") {
				console.log(response.Search);
				let movies = response.Search;

				for(let movie of movies) {
					console.log(movie);
					let id = movie.imdbID;
					fetchByID(id, plotLen);
				}
			}
			else {
				alert(response.Error);
			}
		},
		error : (err) => {
			console.log(err);
		}
	});
}
