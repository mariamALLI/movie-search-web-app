/*Movie search pg*/ 
const inputSearchBar = document.getElementById('search_bar')
const movieSearchBtn = document.getElementById('search_btn')
let movieContainer = document.getElementById('movie_container')
const txtHidden = document.getElementById('txt-hidden')
let film = {}
const filmArray = []
const addToWatchListArray = []

// localStorage.clear()


const filmTapeIcon = document.getElementById('film-tape-icon')
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

        data.Search.forEach(film =>{ arrayOfImdbIds.push(film.imdbID)})
        console.log(arrayOfImdbIds)

        /*storing into localstorage*/ 
        localStorage.setItem('arrayOfImdbIds', JSON.stringify(arrayOfImdbIds))


        /*getting movies with their specific IDs*/ 
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

            if(filmPoster === "N/A"){
                filmPoster = "images/star-film.jpg"
            }

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
            /*setting local storage with the filmarray*/
            localStorage.setItem('filmArray', JSON.stringify(filmArray)) 

                 filmHtml = `
        <div class="movie_list_flex" id="film_list" data-film-id=${filmId}>
                <img src="${filmPoster}" alt="film poster" class="movie-poster">
             <div class="movie_list_txt">
                    <div class="first_txt_flx">
                        <h2 class="movie-title">${filmTitle}</h2>
                        <span class="movie-rating">⭐${filmRating}</span>
                    </div>
            
                    <div class="minandgenre-flex">
                        <h3 class="runtime">${filmYear}</h3>
                        <h3 class="runtime">${filmActors}</h3>
                        <h3 class="runtime">${filmRuntime}</h3>
                        <h3 class="genre">${filmGenre}</h3>
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



movieContainer.addEventListener('click',(e)=>{
    if(e.target.dataset.number && !addToWatchListArray.includes(e.target.dataset.number)){
        addToWatchListArray.push(e.target.dataset.number)
        console.log(addToWatchListArray)
        localStorage.setItem('addToWatchListArray',JSON.stringify(addToWatchListArray))
        alert('Added to the watchlist')
    }else {
        alert('already added to the watchlist')
    }
})

document.getElementById('refresh_btn').addEventListener('click', ()=>{
    location.reload()
})