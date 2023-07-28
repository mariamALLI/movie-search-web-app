/*Movie search pg*/ 
const inputSearchBar = document.getElementById('search_bar')
const movieSearchBtn = document.getElementById('search_btn')
let movieContainer = document.getElementById('movie_container')
let film = {}
let filmArray = []

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

    for(let i=0; i<data.Search.length; i++){

        const filmDetailUrl = `http://www.omdbapi.com/?apikey=${key}&i=${data.Search[i].imdbID}`
        const getFilmResp = await fetch(filmDetailUrl)
        const getFilData = await getFilmResp.json()
        const datas = getFilData
        // console.log(datas)
        const filmTitle = datas.Title
        const filmRated = datas.Rated
        const filmRating = datas.imdbRating
        const filmYear = datas.Year
        const filmRuntime = datas.Runtime
        const filmPoster = datas.Poster
        const filmReleased = datas.Released
        const filmGenre = datas.Genre
        const filmPlot = datas.Plot
        const filmActors = datas.Actors
        const filmError = datas.Error
        let filmId = datas.imdbID
        // console.log(filmId)
       


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
                            <img src="images/addbtn.png" alt="" class="addbtn" id="addbtn">
                            <h3 class="watchlist">watchlist</h3>
                        </div>
                    </div>

                        <p class="plot">${filmPlot}</p>
                </div>
            </div>
        `

        if(datas.Response){
            movieContainer.innerHTML += filmHtml
        }else if(datas.Response === 'false'){
            movieContainer.innerHTML = `<h3>Unable to find what you're looking for. Please try another search.</h3>`
        }

        
    }

    
}


/*search btn to help retrieve movie datas*/ 
movieSearchBtn.addEventListener('click', ()=>{
    // console.log('clicked')
    getMovieData()
    filmTapeIcon.style.display = 'none'
})

movieContainer.addEventListener('click',(e)=>{
    if(e.target.classList.contains("addbtn")){
        const filmData = e.target.closest("#film_list")
        console.log(filmData)

        const filmIds = filmData.dataset.filmId
        addToFilmWatchList(filmIds)
        console.log(filmIds)
    }
})

function addToFilmWatchList(filmId){
    let filmwatchlist = getFilmWatchListFromStorage()
    if(filmwatchlist.includes(filmId)){
        alert("already added to the watchlist!!")
        return
    }

    filmwatchlist.push(filmId)
    localStorage.setItem("filmwatchlist", JSON.stringify(filmwatchlist))
    alert('added to the watchlist!')
}

function getFilmWatchListFromStorage(){
    const filmListData = localStorage.getItem("filmwatchlist")
    return filmListData ? JSON.parse(filmListData) : []
}
