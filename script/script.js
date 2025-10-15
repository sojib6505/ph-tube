const loadCategory = () => {
   fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
   .then(res => res.json())
   .then(data => displayCategory(data.categories))
   .catch(err => console.log(err))
    
}

const displayCategory = (category) => {
    const btnMain = document.getElementById('btn-container')
   category.forEach((item)=>{
    const button = document.createElement('button')
    button.innerText = item.category
    button.classList = 'btn'
    btnMain.appendChild(button)
   })
}


loadCategory()