/*Movie search pg*/ 
const inputSearchBar = document.getElementById('search_bar')
const movieSearchBtn = document.getElementById('search_btn')
let movieContainer = document.getElementById('movie_container')
const txtHidden = document.getElementById('txt-hidden')
const filmTapeIcon = document.getElementById('film-tape-icon')


/*Empty arrays and object*/ 
let film = {}
const filmArray = []
const addToWatchListArray = []


 /*API key*/ 
 let key = 'ec62dd99'
 /*for search input value*/ 
 let searchValue = inputSearchBar.value 
 let url;

/*targeting the value of the input seaarch*/  
inputSearchBar.addEventListener('input', (e)=>{
    url = `http://www.omdbapi.com/?s=${e.target.value}&apikey=${key}`
})

/*function to help fetch movie data*/ 
let getMovieData = async ()=> {
    const resp = await fetch(url)
    const data = await resp.json()
    let filmHtml = ``;

    if(data.Response === 'False'){
        filmTapeIcon.style.display = 'none'
        txtHidden.style.display = 'block'
    }else{
        /*storing the imdbId for each movies*/ 
        const arrayOfImdbIds = []
        /*the Search is the value form the input field*/ 
        data.Search.forEach(film =>{ arrayOfImdbIds.push(film.imdbID)})
        console.log(arrayOfImdbIds)

        /*storing into localstorage*/ 
        localStorage.setItem('arrayOfImdbIds', JSON.stringify(arrayOfImdbIds))


        /*getting movies with their specific IDs from the arrayOfImdbIds*/ 
        arrayOfImdbIds.forEach(async filmID => {
            const resp = await fetch(`http://www.omdbapi.com/?i=${filmID}&apikey=${key}`) 
            const data = await resp.json()
            console.log(data)
            const filmTitle = data.Title
            const filmRating = data.imdbRating
            const filmYear = data.Year
            const filmRuntime = data.Runtime
            let filmPoster = data.Poster
            const filmGenre = data.Genre
            const filmPlot = data.Plot
            const filmActors = data.Actors
            let filmId = data.imdbID

            /*when film poster is not available a star image is placed to replace it*/ 
            if(filmPoster === "N/A"){
                filmPoster = "images/star-film.jpg"
            }

            /* the empty film object created at the begining is been filled with film object 
            to be pushed into the filmArray*/ 
            film = {
                'id': filmId,
                'title': filmTitle,
                'poster': filmPoster,
                'genre': filmGenre,
                'actor': filmActors,
                'ratings': filmRating,
                'runtime': filmRuntime,
                'year' : filmYear,
                'plot': filmPlot
            }

            /*the film object will be pushed into the filmarray*/
            filmArray.push(film) 

            /*setting local storage with the filmArray*/
            localStorage.setItem('filmArray', JSON.stringify(filmArray)) 

                 filmHtml = `
                <div class="movie_list_flex" id="film_list" data-film-id=${filmId}>
                        <img src="${filmPoster}" alt="film poster" class="movie-poster">
                    <div class="movie_list_txt">
                            <div class="first_txt_flx">
                                <h2 class="movie-title">${filmTitle}</h2>
                                <span class="movie-rating">⭐ ${filmRating}</span>
                            </div>
            
                        <div class="minandgenre-flex">
                            <h3 class="runtime">${filmYear}</h3>
                            <h3 class="runtime">${filmRuntime}</h3>
                            <h3 class="genre">${filmGenre}</h3>
                        </div>

                        <div class="actors">
                            <h3 class="runtime">${filmActors}</h3>
                            <div class="watchlistbtn">
                                <img src="images/addbtn.png" alt="" class="addbtn" id="addbtn" data-number=${filmId}>
                                <h3 class="watchlist">watchlist</h3>
                            </div>
                        </div>

                            <p class="plot">${filmPlot}</p>
                    </div>
            </div>
        ` 
            
            movieContainer.innerHTML += filmHtml
        })
    }

    
}


/*search btn to help retrieve movie datas*/ 
movieSearchBtn.addEventListener('click', ()=>{
    getMovieData()
    filmTapeIcon.style.display = 'none'
    txtHidden.style.display = 'none'
})


/*click eventlistner to make the addToWatchlist btn work so that when click 
it pushes the movie into the addToWatchListArray */ 
movieContainer.addEventListener('click',(e)=>{
    if(e.target.dataset.number && !addToWatchListArray.includes(e.target.dataset.number)){
        addToWatchListArray.push(e.target.dataset.number)
        console.log(addToWatchListArray)

        /*local storage to store the arrays of watchlist movie*/ 
        localStorage.setItem('addToWatchListArray',JSON.stringify(addToWatchListArray))
        alert('Added to the watchlist')
    }else {
        alert('already added to the watchlist')
    }
})

/* btn to help the search page*/ 
document.getElementById('refresh_btn').addEventListener('click', ()=>{
    location.reload()
})