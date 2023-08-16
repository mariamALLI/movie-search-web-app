const addMovieBtn = document.getElementById('addmoviebtn')
const watchlistContainer = document.getElementById('watchlist_movie_container')
const watchListTxt = document.getElementById('watchlisttxt')

/*created an empty filmsArray for the watchlist page*/ 
let filmsArray = []

/*the filmArray created and stored in the local storage from the index.js for the
movie search page will be parsed and gotten back and saved to the filmsArray variable for use*/ 
filmsArray = JSON.parse(localStorage.getItem("filmArray"))

/*the addToWatchListArray created and stored in the local storage from the index.js for the
movie search page through the watchlistbtn will be parsed and gotten back and saved to the addToWatchListsArray variable for use*/ 
const addToWatchListsArray = JSON.parse(localStorage.getItem("addToWatchListArray")) || []


if(addToWatchListsArray === null){
    console.log('empty')
}else if(addToWatchListsArray.length !== 0){
    
    watchListTxt.style.display = 'none'

    /*an iteration of the filmsArray and addToWatchListsArray is done to help create an if
    statement that helps justify when they are both equall to each other in item and can be
    displayed via the variable created to help store what each represent*/ 
    for (let i = 0; i < addToWatchListsArray.length; i++){
        for(let x = 0; x < filmsArray.length; x++){
            if(addToWatchListsArray[i] === filmsArray[x].id){
                let indx = x
                const filmId = filmsArray[indx].id
                const filmTitle = filmsArray[indx].title
                const filmRating = filmsArray[indx].ratings
                const filmYear = filmsArray[indx].year
                const filmRuntime = filmsArray[indx].runtime
                const filmPoster = filmsArray[indx].poster
                const filmGenre = filmsArray[indx].genre
                const filmPlot = filmsArray[indx].plot
                const filmActors = filmsArray[indx].actor

                
                watchlistContainer.innerHTML += `
                <div class="movie_list_flex" id="film-list" data-film-id=${filmId}>
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
                                <img src="images/removebtn.png" alt="remove button" class="removebtn" id="removebtn" data-numbers= ${filmId}>
                                <h3 class="watchlist">Remove</h3>
                            </div>
                        </div>

                            <p class="plot">${filmPlot}</p>
                    </div>
               </div>
                `        
            }
        }
    }
}


/*click eventlistner to make the removeFromWatchList btn work so that when click 
it deletes one movie at a time from the WatchList */ 
document.getElementById('watchlist_movie_container').addEventListener('click', (e)=>{
    if(e.target.dataset.numbers){
        const numb = filmsArray.findIndex((film) => film.id === e.target.dataset.number)
        filmsArray.splice(numb, 1)
    
        if(e.target.id === 'removebtn'){
            console.log('click')
            let removingFilmId = e.target.dataset.numbers
            removeFromWatchList(removingFilmId)
            alert('removed from watchlist')     
        }
        localStorage.setItem("addToWatchListArray", JSON.stringify(addToWatchListsArray))
        localStorage.setItem("filmArray", JSON.stringify(filmsArray))
    }
})

/*this function is to help remove movies from the addToWatchListsArray*/ 
function removeFromWatchList(fimlidlist){
    let removeWatchlistIndx = addToWatchListsArray.indexOf(fimlidlist)
    console.log('removed: ',removeWatchlistIndx)
    if(removeWatchlistIndx !== -1){
        addToWatchListsArray.splice(removeWatchlistIndx, 1)   
    }
    console.log(addToWatchListsArray)
}