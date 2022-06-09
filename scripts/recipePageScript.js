let recipeData = window.localStorage.getItem("recipe");
recipeData = JSON.parse(recipeData)
console.log(recipeData)

const recipeImg = document.querySelector('#image')
recipeImg.src = `${recipeData.images.REGULAR.url}`


let recipeTable = document.querySelector('#recipeTable')
function fillTable() {
    let index = 1;
    recipeData.ingredients.forEach(element => {
        console.log(element)
        let newRow = recipeTable.insertRow(index)
        let newData1 = newRow.insertCell(0)
        let newData2 = newRow.insertCell(1)

        newData1.innerHTML = `${index}`
        newData2.innerHTML = `${element.text}`
        index = index + 1
    });
}
fillTable()