const loadCategory = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategory(data.categories))
    .catch((err) => console.log(err));
};
// ==============
const vBadesCatagory = (id) => {
  console.log(id)
   fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
      .then((res) => res.json())
      .then((data) => {
        removeActiveClass()
        const active_btn = document.getElementById(`btn-${id}`)
        active_btn.classList.add('active')
        displayVideos(data.category)
      })
      .catch((err) => console.error(err))
};

const removeActiveClass = () =>{
    const active_btns = document.getElementsByClassName('category-btn')
    for(let active_btn of active_btns){
      active_btn.classList.remove('active')
    }
}


// vedio load
const loadVideos = (searchValue = "") => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchValue}`)
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((err) => console.log(err));
};
const displayVideos = (videos) => {
  console.log(videos);
  const videoMain = document.getElementById("vedio-main");
  videoMain.innerHTML = ''
  if(videos.length === 0){
    videoMain.classList.remove('grid')
    videoMain.innerHTML = 
    `<div class="min-h-[400px] flex flex-col justify-center items-center">
          <img class="w-[200px]" src="assets/Icon.png"/>
          <h3 class="font-bold text-xl">Oops!! Sorry, there is no content here</h3>
    </div>`
    return
  }
  else{
     videoMain.classList.add('grid')
  }
  videos.forEach((video) => {
    console.log(video)
    const card = document.createElement("div");
    card.classList = 'card bg-base-100'
    card.innerHTML = `
         <figure class="h-[200px]">
    <img 
      src=${video.thumbnail}
      class="w-full h-full object-cover"
      alt="Shoes" />
  </figure>
     <div class="py-2 flex gap-2">
       <div><img class="w-10 h-10 rounded-full" src=${video.authors[0].profile_picture} /></div>
       <div>
       <p class="font-bold">${video.title}</p>
       <div class="flex items-center gap-2">
            <p>${video.authors[0].profile_name}</p>
         ${video.authors[0].verified === true ? `<img class="w-4 h-4" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" />` : ''}
       </div>
       <p>${video.others.views}</p>
       </div>
     </div>
     <p>
       <button id="${video.video_id}" onclick="load_Modal(${video.video_id})" class="btn h-7">Detail </button>
     </p>
        `;
    videoMain.appendChild(card)    
  });
};

const displayCategory = (category) => {
  const btnMain = document.getElementById("btn-container");
  category.forEach((item) => {     
        const btn_container = document.createElement('div')
        console.log(btn_container)
       btn_container.innerHTML = `
        <button id="btn-${item.category_id}" onclick="vBadesCatagory(${item.category_id})" class="btn category-btn">${item.category}<button>
       `
       btnMain.appendChild(btn_container)
  });
};

const load_Modal = async(id) =>{
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${id.id}`
    const res = await fetch(url)
    const data = await res.json()
    displayModal(data.video)
}
const displayModal = (video) => {
  console.log(video)
   const modalContent = document.getElementById('modal-content')
   console.log(modalContent)
   modalContent.innerHTML = `
    <img src="${video.authors[0].profile_picture} " />
    <h3 class="font-bold">${video.authors[0].profile_name}</h3>
    <p>${video.description}</p>
   `
   document.getElementById('customModal').showModal()
}
const input_field = document.getElementById('search-intput')
input_field.addEventListener('keyup',function(e){
   const intValue = e.target.value
   loadVideos(intValue)
})
loadCategory();
loadVideos();
