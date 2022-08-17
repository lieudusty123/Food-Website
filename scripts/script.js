localStorage.clear()

const container = document.querySelector('.foodContainer')
let cardContainerArr = []

const foodArr = ['Hamburger', 'beef', 'pork', 'chicken', 'soup', 'pie', 'pasta', 'ravioli', 'linguini', 'cake', 'cookie', 'fries', 'chips', 'salad', 'noodles', 'sandwich', 'rice', 'sushi']

const getAPIData = async (searchTerm = foodArr[Math.floor(Math.random() * foodArr.length)], searchFilter = []) => {
    try {
        let axiosLink = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchTerm}&app_id=d607b69f&app_key=abf5d3e788d02d0d70cb47ff0ec906c1&`
        searchFilter.forEach(e => { axiosLink = `${axiosLink}&${e[0]}=${e[1]}` })
        let rawData = await axios.get(axiosLink)
        let data = await rawData.data
        // console.log(data)
        cardContainerArr = []
        createCards(data)
        clickMeButton(data)
        return data;
    }
    catch (e) {
        // console.log(e)
    }
}



const searchInput = document.querySelector('#searchInput')
const inputContainer = document.querySelector('.inputContainer')


const searchTerms = document.querySelectorAll('.searchTerm')
const filtersCont = document.querySelector('#filters')
let itemArr = []


// search and filters
inputContainer.addEventListener('submit', (e) => {
    e.preventDefault()
    // console.log(searchInput.value)
    searchTerms.forEach((current) => {
        if (current.checked && itemArr.indexOf(itemArr) == -1) {
            itemArr.push([current.dataset.category, current.id])
        }
        else if (current.checked && itemArr.indexOf(itemArr) >= 0) {
            itemArr.pop([current.dataset.category, current.id])
        }
    })
    // console.log(itemArr)
    getAPIData(searchInput.value, itemArr)
    itemArr = []
})

let nextPage
// comment if needed
let APIdata = getAPIData().then(function (result) { return nextPage = result._links.next.href })

$(window).scroll(function () {
    if ($(window).scrollTop() + $(window).height() == $(document).height()) {
        let getNewAPIData = async () => {
            let nextData = await axios.get(nextPage)
            let data = await nextData.data
            createCards(data)
            clickMeButton(data)
            nextPage = data._links.next.href
        }
        getNewAPIData()
    }
});

let reactContainer = ReactDOM.createRoot(document.querySelector('.foodContainer'))
function RenderThis() {
    return (
        [mappedItems]
    )
}
let mappedItems = []
function createCards(data) {
    for (const key in data.hits) {
        cardContainerArr.push(data.hits[key])
    }
    mappedItems = cardContainerArr.map(card => {
        return (
            <div className="card text-center" id={card.recipe.uri} key={card.recipe.uri}>
                <a href="./recipePage.html" className="img-hover-zoom transfer">
                    <img src={card.recipe.image} alt="..." className="card-img-top transfer"></img>
                </a>
                <div className="card-body">
                    <h5 className="card-title">{card.recipe.label}</h5>
                    <a href="./recipePage.html" className="btn btn-primary transfer">Click Me!</a>
                </div>
            </div>
        )
    })
    RenderThis()
    reactContainer.render(<RenderThis />)
}

function clickMeButton(data) {
    container.addEventListener('click', (e) => {
        if (e.target.classList.contains("transfer")) {
            for (const key in data.hits) {
                if (data.hits[key].recipe.uri == e.target.parentElement.parentElement.id) {

                    localStorage.setItem('recipe', JSON.stringify(data.hits[key].recipe))
                }
            }
        }
    })
}
