const loadCategory = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategory(data.categories))
    .catch((err) => console.log(err));
};
// vedio load
const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((err) => console.log(err));
};
const displayVideos = (videos) => {
  console.log(videos);
  const videoMain = document.getElementById("vedio-main");
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
     
      
     
        `;
    videoMain.appendChild(card)    
  });
};

const displayCategory = (category) => {
  const btnMain = document.getElementById("btn-container");
  category.forEach((item) => {
    const button = document.createElement("button");
    button.innerText = item.category;
    button.classList = "btn";
    btnMain.appendChild(button);
  });
};

loadCategory();
loadVideos();
