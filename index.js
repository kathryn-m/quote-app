//reference
//random quotes url  = "https://quote-garden.herokuapp.com/api/v2/quotes/random"
//quotes by genre limited by 1 page of 10 = `${urlBase}genres/${genreString}?page=1&limit=10`
// access the quote itself = citations.quotes[0].quoteText


//variables

const citation = document.querySelector(".citation")
const author = document.querySelector(".author")
const urlBase ="https://quote-garden.herokuapp.com/api/v2/"

const selectCitation = document.getElementById('selectCitation')


let oldIndex =""
let newIndex =""

async function getQuote() {
    const quotePromise = await fetch(`${urlBase}quotes/random`)
    const response = await quotePromise.json()
    citation.textContent = response.quote.quoteText
    author.textContent = response.quote.quoteAuthor

}

getQuote()


async function getQuoteByGenre(genreString) {
   // generate an index that's different from the previous one 
    do{
        newIndex = Math.floor(Math.random() * 10)
    } while (newIndex === oldIndex)


    //use the index to select the quote
    const quotePromise = await fetch (`${urlBase}genres/${genreString}/`)
    const citations = await quotePromise.json()
    citation.textContent = citations.quotes[newIndex].quoteText
    author.textContent = citations.quotes[newIndex].quoteAuthor

    //move the just used index to a placeholder
    oldIndex = newIndex

}


selectCitation.addEventListener("click", e => {
    const value = e.target.value

    switch (value) {
        case "random":
            getQuote()
            break
        
        case "nature":
            getQuoteByGenre("nature")
            break

        case "love":
            getQuoteByGenre("love")
            break
        
        case "sport":
            getQuoteByGenre("sport")
            break
    }
}
)




