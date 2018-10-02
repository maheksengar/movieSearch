$ (document).ready (function() {
	$("#fs-1").hide();
	$("#fs-2").hide();

	let fs1 = 0;
	let fs2=  0;

	$("#title-btn").click( function() {
		if (fs1) {
			$("#fs-1").slideUp();
			fs1 = 0;
		}
		else {
			$("#fs-1").slideDown();
			fs1 = 1;
			$("#fs-2").slideUp();
			fs2 = 0;
		}
	});

	$("#id-btn").click( function() {
		if (fs2) {
			$("#fs-2").slideUp();
			fs2 = 0;
		}
		else {
			$("#fs-2").slideDown();
			fs2 = 1;
			$("#fs-1").slideUp();
			fs1 = 0;
		}
	});

	$("#srch-id").click(() => {
		let id = $("#inputid").val();
		let plotLen = $("#idplotlen").val();
		if(id){
			$(".card-container").empty();
			fetchByID(id, plotLen);
		} 
		else 
			alert("Please enter a valid IMDb id.");
	});

	$("#srch-title").click(() => {
		let name = $("#inputtitle").val();
		let year = $("#inputyear").val();
		let plotLen = $("#titleplotlen").val();
		if(name) {
			$(".card-container").empty();
			fetchByName(name, year, plotLen);
		}
		else 
			alert("Please enter a valid Movie name.");
	})

});


let fetchByID = (id, plotLen) => {

	$.ajax({
		type: "GET",
		datatype: "JSON",
		async: true,
		url: `https://www.omdbapi.com/?i=${id}&plot=${plotLen}&apikey=7b29e36d`,
		success : (response) => {
			console.log(response);
			if(response.Response == "True") {
				let img = "";
				if(response.Poster == "N/A") {
					img = "imgnotfound.png";
				}
				else {
					img = response.Poster;
				}
				let card = `<div class="card">
								<img class="card-img-top" src=${img} alt="Failed to load poster">
								<div class="card-body">
									<h5 class="card-title text-center" style="color:#000000">${response.Title}</h5>
									<h6 class="card-subtitle mb-2 text-muted text-center">Released:  ${response.Released}</h6>
									<p class="card-text mt-4 text-center" id="type">Type:  ${response.Type}</p>
									<p class="card-text text-center" id="genre">Genre:  ${response.Genre}</p>
									<p class="card-text text-center" id="lang">Language:  ${response.Language}</p>
									<p class="card-text text-center" id="runtime">Runtime:  ${response.Runtime}</p>
									<p class="card-text text-center" id="actor">Actors:  ${response.Actors}</p>
									<p class="card-text text-center" id="directed">Directed by:  ${response.Director}</p>
									<p class="card-text text-center" id="produced">Produced by:  ${response.Production}</p>
									<p class="card-text text-center" id="plot">Plot:  ${response.Plot}</p>
									<p class="card-text text-center" id="imdbr">IMDb rating:  ${response.imdbRating}</p>
									<p class="card-text text-center" id="imid">IMDb ID:  ${response.imdbID}</p>
								</div>
							</div>` ;
			
				$(".card-container").append(card);
				$(".card-container").addClass("d-flex justify-content-center");
				$(".card-container").slideDown();
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
