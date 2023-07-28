/*for watchlist pg*/ 
const addMovieBtn = document.getElementById('addmoviebtn')
const watchlistContainer = document.getElementById('watchlist_movie_container')
const watchListTxt = document.getElementById('watchlisttxt')
let key = 'ec62dd99'
 /*for search input value*/ 
 let url;



document.addEventListener('DOMContentLoaded', ()=>{
    let filmlist = getFilmWatchListFromStorage()

    if(filmlist.length > 0){
        watchListTxt.style.display = 'none'
         for(let filmid of filmlist){
            getFilmData(filmid)
         }
    }

    let getFilmData = async (filmId)=> {
        url = `http://www.omdbapi.com/?apikey=${key}&i=${filmId}`
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
        <div class="movie_list_flex" id="film-list" data-film-id=${filmId}>
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
                            <img src="images/removebtn.png" alt="" class="removebtn" id="removebtn" data-number= ${filmId}>
                            <h3 class="watchlist">Remove</h3>
                        </div>
                    </div>

                        <p class="plot">${filmPlot}</p>
                </div>
            </div>
        `

        
            watchlistContainer.innerHTML += filmHtml

        
    }
    }

    function getFilmWatchListFromStorage(){
        const filmListData = localStorage.getItem("filmwatchlist")
        return filmListData ? JSON.parse(filmListData) : []
    }


    watchlistContainer.addEventListener('click', (e)=>{
        if(e.target.id === "removebtn"){
            const filmData = e.target.closest("#film-list")
            const filmID = filmData.getAttribute("data-film-id")
            removeFromWatchList(filmID)
            filmData.remove()
        }
    })

    function removeFromWatchList(filmId){
        let filmlist = getFilmWatchListFromStorage()
        const listIndex = filmlist.indexOf(filmId)

        if(listIndex !== -1){
            filmlist.splice(listIndex, 1)
            localStorage.setItem("filmlist", JSON.stringify(filmlist))
            alert('removed from watchlist')
        }
    }
})

