let fullURI = localStorage.getItem('recipe')
const divEle = document.querySelector('div')

const pageTitle = document.querySelector('title')
const pageLogo = document.querySelector('#pageLogo')


const ingredientsContainer = ReactDOM.createRoot(document.querySelector('.ingredientsContainer'))

fullURI = fullURI.substring(fullURI.indexOf("#") + 1);
fullURI = fullURI.substring(fullURI.indexOf("_") + 1);

console.log(fullURI)
const fetchAPI = async () => {
    try {
        let rawData = await axios.get(`https://api.edamam.com/api/recipes/v2/${fullURI}?type=public&app_id=d607b69f&app_key=abf5d3e788d02d0d70cb47ff0ec906c1`)
        let data = await rawData.data
        console.log(data)
        let recipe = data.recipe

        pageLogo.href = `${recipe.image}`
        pageTitle.innerHTML = `${recipe.label}`


        let ingredients = []
        recipe.ingredientLines.forEach(element => {
            ingredients.push(element)
            function PageContent() {
                return (
                    <div className="ingredient">{recipe.ingredientLines[element]}</div>
                )
            }

            ingredients.push(PageContent())
        });
        ingredientsContainer.render(ingredients)
    }
    catch (e) {
        console.log(e)
    }
}

fetchAPI()


localStorage.clear()