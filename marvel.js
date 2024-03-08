const inputElement = document.querySelector(".search");
const previousButton = document.querySelector(".previousButton");
const nextButton = document.querySelector(".nextButton");
const date = new Date();
console.log(date.getTime());
const imgElement = document.querySelector(".imageBox img");
const marvelMemberDescription = document.querySelector(".mainDescription");
const marvelMemberName = document.querySelector(".avengerDescription h3");
const buttonElement = document.querySelector(".searchValue");
const displayCards = document.querySelector(".displayCards-region");
const movies = document.querySelector(".moviesActed");
const publicKey = "2c5c25f0f87de10b0d01843939082a88";
const private_key = "fb94652c0b04258a22ae6ad3b5c45596a3d6717e";
const timeStamp = "1709823742488";
const hashValue = "0fc072c17bd06754d484e34c5b0744ee";
const showMoreMoviesButton = document.querySelector(".showMoreMovies")
let limit = 50;


    const getAvengersApi = async () => {
        const url =`https://gateway.marvel.com:443/v1/public/characters?ts=${timeStamp}&limit=${limit}&apikey=${publicKey}&hash=${hashValue}&nameStartsWith=${inputElement.value.trim()}`
        const response = await fetch(url)
        const data = await response.json()
        let dataHtml = "";
        data.data.results.forEach((result) => {
            dataHtml += `<div class="imageBox">
                            <img src="${result.thumbnail.path}.${result.thumbnail.extension}" alt=""> 
                            <span class="avengerDescription">
                                <h3>${result.name}</h3>
                                <div class="mainDescription">
                                    ${result.description}
                                </div>
                            </span>
                        </div>`
        });
        displayCards.innerHTML = dataHtml;

        const fetchMovies = () => {
            let moviesActedHtml = "";
            data.data.results.forEach((result) => {
                result.series.items.forEach((series => {
                    moviesActedHtml += `<div class = "movie">${series.name}</div>`
                }));
                movies.innerHTML = moviesActedHtml;
            })
        }
        

        const fetchMoreMovies = () => {
            let moviesActedHtml = "";
            data.data.results.forEach((result) => {
                result.events.items.forEach((event => {
                    moviesActedHtml += `<div class = "movie">${event.name}</div>`
                }));
                movies.innerHTML = moviesActedHtml;
            })
        }
        fetchMoreMovies()

        fetchMovies();

        previousButton.addEventListener("click", ()=> {
            fetchMovies()
        });
        nextButton.addEventListener("click", () => {
            fetchMoreMovies();
        });
    }

    if (inputElement.value === "") {
        inputElement.value = "avengers"
        getAvengersApi()
    }


buttonElement.addEventListener("click", () => {
    getAvengersApi()
})


getAvengersApi()