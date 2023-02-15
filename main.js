const api = axios.create({
    baseURL: 'https://api.thecatapi.com/v1'
});
api.defaults.headers.common['X-API-KEY']="live_8Cfw3o6HHx45AFiKyhvdxdckIKBCd77iUJlqFOBh4m3tPcuMyzE4QAzvua2r44yA"

const API_URL_RANDOM= "https://api.thecatapi.com/v1/images/search?limit=2"

const API_URL_FAVOURITES= "https://api.thecatapi.com/v1/favourites"

const API_URL_FAVOURITES_DELETE = (id)=>`https://api.thecatapi.com/v1/favourites/${id}`


const API_URL_UPLOAD= "https://api.thecatapi.com/v1/images/upload"

const spanError = document.getElementById('error');

const button = document.getElementById("aleatbutton")
button.addEventListener("click", loadRandomMichis)

async function loadRandomMichis() {
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();
    console.log(res.status)

    console.log("Random")
    console.log(data)
    

    if(res.status !== 200)  {
        spanError.innerHTML="Error: "+ res.status
    } else {
        const divrandom=document.getElementById("divrandom")

        const btn1=document.getElementById("btn1")

    
        // img1.src = data[0].url
        divrandom.style.backgroundImage = `url(${data[0].url})`



        btn1.onclick = () => saveFavoriteMichi(data[0].id)

    }

}

async function loadFavoritesMichis() {

    const res = await fetch(API_URL_FAVOURITES, {
        method: 'GET',
        headers: {
            'X-API-KEY':"live_8Cfw3o6HHx45AFiKyhvdxdckIKBCd77iUJlqFOBh4m3tPcuMyzE4QAzvua2r44yA"
        }
    });
   
    const data = await res.json();

    if(res.status !== 200)  {
       

        console.log(data)
        console.log("error")

        spanError.innerHTML = "Error: " + res.status +" "+ data;
        
    }

    else{
        console.log(data)
        const section = document.getElementById("favoritesMichis");
        const div = document.getElementById("favoritesCats");
        section.innerHTML=''
        div.innerHTML = '';


        const h2 = document.createElement ("h2");
       
        const h2Text = document.createTextNode("Favorite Cats");
        h2.appendChild(h2Text);
        section.appendChild(h2);

        data.forEach(michi => {

            const article = document.createElement("article");
            const divFav = document.createElement('div');
            const btn2 = document.createElement('button');
            const btnImage = document.createElement("img");
            btnImage.setAttribute('id', 'favorite-icon-pink');
            btnImage.src='https://cdn-icons-png.flaticon.com/512/1076/1076984.png';

            // img.src = michi.image.url;
            divFav.style.backgroundImage = `url(${michi.image.url})`
            divFav.setAttribute('id', 'divFav')

            btn2.setAttribute('id', 'btn2')
            btn2.appendChild(btnImage);
            btn2.onclick = () => deleteFavoriteMichi(michi.id)
            
            
            divFav.appendChild(btn2);
            article.appendChild(divFav);
            div.appendChild(article)
            section.appendChild(div)
                     
        });
    }

}

async function saveFavoriteMichi(id){
    const {data, status} = await api.post('/favourites',{
        image_id: id,
    });



 /*   const res = await fetch               (API_URL_FAVOURITES,{
        method: "POST",
        headers: {
            'Content-Type':'application/json',
            'X-API-KEY':"live_8Cfw3o6HHx45AFiKyhvdxdckIKBCd77iUJlqFOBh4m3tPcuMyzE4QAzvua2r44yA"
        },
        body: JSON.stringify({
            image_id:id
        }),
    });
    const data = await res.json()*/

    console.log("Save")
   
    console.log(data)
    if(status !== 200){
        spanError.innerHTML = "Error: " + status +" "+ data;
    }
    else{
        console.log("Saved in favorites")
        loadFavoritesMichis();
        
    }
}

async function deleteFavoriteMichi(id){
    const res = await fetch(API_URL_FAVOURITES_DELETE(id),{
        method: "DELETE",
        headers: {
            'X-API-KEY':"live_8Cfw3o6HHx45AFiKyhvdxdckIKBCd77iUJlqFOBh4m3tPcuMyzE4QAzvua2r44yA"
        }
    });

    const data = await res.json()

    if(res.status !== 200){
        spanError.innerHTML = "Error: " + res.status +" "+ data;
    }
    else{
        console.log("Cat deleted")
        loadFavoritesMichis();

    }
}

async function uploadMichiPhoto(){
    const form = document.getElementById('uploadingForm');
    const formData = new FormData(form);

    console.log(formData.get("file"))

    const res = await fetch(API_URL_UPLOAD,{
        method: 'POST',
        headers: {
            
            'X-API-KEY':"live_8Cfw3o6HHx45AFiKyhvdxdckIKBCd77iUJlqFOBh4m3tPcuMyzE4QAzvua2r44yA"
        },
        body: formData,

    })
    const data = await res.json();
    if (res.status !== 201) {
        spanError.innerHTML = `Error: ${res.status} ${data.message}`
    }
    else {
        console.log("Uploaded photo :)");
        console.log({ data });
        console.log(data.url);
        saveFavoriteMichi(data.id) 
    }
}

loadRandomMichis()
loadFavoritesMichis()