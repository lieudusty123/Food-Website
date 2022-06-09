localStorage.clear()

const container = document.querySelector('.foodContainer')
let reactContainer = ReactDOM.createRoot(document.querySelector('.foodContainer'))
let cardContainerArr = []

const foodArr = ['Hamburger', 'beef', 'pork', 'chicken', 'soup', 'pie', 'pasta', 'ravioli', 'linguini', 'cake', 'cookie', 'fries', 'chips', 'salad', 'noodles', 'sandwich', 'rice']

const getAPIData = async (searchTerm = foodArr[Math.floor(Math.random() * foodArr.length)], searchFilter = []) => {
    try {
        let axiosLink = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchTerm}&app_id=d607b69f&app_key=abf5d3e788d02d0d70cb47ff0ec906c1&`
        searchFilter.forEach(e => { axiosLink = `${axiosLink}&${e[0]}=${e[1]}` })
        console.log(axiosLink)
        let rawData = await axios.get(axiosLink)
        let data = await rawData.data
        console.log(data)
        cardContainerArr = []
        for (const key in data.hits) {

            function PageContent() {
                return (
                    <div className="card text-center" id={data.hits[key].recipe.uri}>
                        <img src={data.hits[key].recipe.image} className="card-img-top" alt="..."></img>
                        <div className="card-body">
                            <h5 className="card-title">{data.hits[key].recipe.label}</h5>
                            <a href="./recipePage.html" className="btn btn-primary">Click Me!</a>
                        </div>
                    </div>
                )
            }

            cardContainerArr.push(PageContent())
        }
        reactContainer.render(cardContainerArr)

        container.addEventListener('click', (e) => {
            if (e.target.className == "btn btn-primary") {
                localStorage.setItem('recipe', e.target.parentElement.parentElement.id)
            }
        })
        return data;
    }
    catch (e) {
        console.log(e)
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
    console.log(searchInput.value)
    searchTerms.forEach((current) => {
        if (current.checked && itemArr.indexOf(itemArr) == -1) {
            itemArr.push([current.dataset.category, current.id])
        }
        else if (current.checked && itemArr.indexOf(itemArr) >= 0) {
            itemArr.pop([current.dataset.category, current.id])
        }
    })
    console.log(itemArr)
    getAPIData(searchInput.value, itemArr)
    itemArr = []
})

let nextPage
let APIdata = getAPIData().then(function (result) { return nextPage = result._links.next.href })

$(window).scroll(function () {
    if ($(window).scrollTop() + $(window).height() == $(document).height()) {
        let getNewAPIData = async () => {
            let nextData = await axios.get(nextPage)
            let data = await nextData.data
            console.log(data)
            // cardContainerArr = []
            for (const key in data.hits) {

                function PageContent() {
                    return (
                        <div className="card text-center" id={data.hits[key].recipe.uri}>
                            <img src={data.hits[key].recipe.image} className="card-img-top" alt="..."></img>
                            <div className="card-body">
                                <h5 className="card-title">{data.hits[key].recipe.label}</h5>
                                <a href="./recipePage.html" className="btn btn-primary">Click Me!</a>
                            </div>
                        </div>
                    )
                }

                cardContainerArr.push(PageContent())
            }
            reactContainer = ReactDOM.createRoot(document.querySelector('.foodContainer'))
            reactContainer.render(cardContainerArr)

            container.addEventListener('click', (e) => {
                if (e.target.className == "btn btn-primary") {
                    localStorage.setItem('recipe', e.target.parentElement.parentElement.id)
                }
            })
            nextPage = data._links.next.href

        }
        getNewAPIData()
    }
});




