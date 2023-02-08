const API_URL_RANDOM= "https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_8Cfw3o6HHx45AFiKyhvdxdckIKBCd77iUJlqFOBh4m3tPcuMyzE4QAzvua2r44yA"

const API_URL_FAVOURITES= "https://api.thecatapi.com/v1/favourites?api_key=live_8Cfw3o6HHx45AFiKyhvdxdckIKBCd77iUJlqFOBh4m3tPcuMyzE4QAzvua2r44yA"

const API_URL_FAVOURITES_DELETE = (id)=>`https://api.thecatapi.com/v1/favourites/${id}?api_key=live_8Cfw3o6HHx45AFiKyhvdxdckIKBCd77iUJlqFOBh4m3tPcuMyzE4QAzvua2r44yA`


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
        spanError.innerHTML="Hubo un error: "+ res.status
    } else {
        const img1=document.getElementById("img1")
        const img2=document.getElementById("img2")
        const btn1=document.getElementById("btn1")
        const btn2=document.getElementById("btn2")
    
        img1.src = data[0].url
        img2.src = data[1].url

        btn1.onclick = () => saveFavoriteMichi(data[0].id)
        btn2.onclick = () => saveFavoriteMichi(data[1].id)
    }

}

async function loadFavoritesMichis() {

    const res = await fetch(API_URL_FAVOURITES);
    console.log("Favoritos")
    const data = await res.json();

    if(res.status !== 200)  {
       

        console.log(data)
        console.log("error")

        spanError.innerHTML = "Hubo un error: " + res.status +" "+ data;
        
    }

    else{
        console.log(data)
        const section = document.getElementById("favoritesMichis")
        section.innerHTML = ""
        const h2 = document.createElement ("h2");
        const h2Text = document.createTextNode("Michis favoritos");
        h2.appendChild(h2Text);
        section.appendChild(h2);

        data.forEach(michi => {

            const article = document.createElement("article");
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode("Sacar al michi de favoritos");

            img.src = michi.image.url;
            img.width = 150;
            btn.appendChild(btnText);
            btn.onclick = () => deleteFavoriteMichi(michi.id)
            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article)

                     
        });
    }
}

async function saveFavoriteMichi(id){
    const res = await fetch(API_URL_FAVOURITES,{
        method: "POST",
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            image_id:id
        }),
    });

    const data = await res.json()
    console.log("Save")
    console.log(res)
    console.log(data)
    if(res.status !== 200){
        spanError.innerHTML = "Hubo un error: " + res.status +" "+ data;
    }
    else{
        console.log("Michi guardado en favoritos")
        loadFavoritesMichis();
    }
}

async function deleteFavoriteMichi(id){
    const res = await fetch(API_URL_FAVOURITES_DELETE(id),{
        method: "DELETE",
    });

    const data = await res.json()

    if(res.status !== 200){
        spanError.innerHTML = "Hubo un error: " + res.status +" "+ data;
    }
    else{
        console.log("Michi eliminado de favoritos")
        loadFavoritesMichis();
    }
}

loadRandomMichis()
loadFavoritesMichis()