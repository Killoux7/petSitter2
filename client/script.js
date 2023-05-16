const spanNom=document.getElementById("nomChien")
const spanMaitre=document.getElementById("maitreChien")
const spanAge=document.getElementById("ageChien")

const boutonEnregistrer= document.getElementById("boutonEnregistrer")
boutonEnregistrer.addEventListener("click", enregistrementPetSitter)

const URLServeur= "http://localhost:4000/"
const routeJusty= "justy-data"
const routeRegistrement= "registre"
const url=URLServeur+routeJusty
const urlRegistre= routeRegistrement

function communicationAvecLeBackPOST(objet, URL){
    const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                console.log("element ajouté") 
            } else if (this.readyState === XMLHttpRequest.DONE) {
                console.log("erreur de connexion de type "+this.readyState);
            }
        };
        xhr.open('POST', URL, true);
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
        //xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        const test= JSON.stringify(objet)
        console.log(test)
        xhr.send(test);
}




function communicationAvecLeBackGET(url){
    const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                console.log("Raw response:", this.responseText);

                const responseData = JSON.parse(this.responseText);
                console.log(responseData)
                for (let i=0; i<responseData.length; i++){
                    spanNom.innerHTML=responseData[i].nom
                    spanMaitre.innerHTML=responseData[i].maitre
                    //spanAge.innerHTML=responseData[i].age
                }
                
            } else if (this.readyState === XMLHttpRequest.DONE) {
                console.log("erreur de connexion de type "+this.readyState);
            }
        };
        xhr.open('GET', url, false);
        xhr.send();
}

communicationAvecLeBack(url)

function enregistrementPetSitter(){
    const nom= document.getElementById("firstName_sitter").value
    const prenom= document.getElementById("lastName_sitter").value
    const email= document.getElementById("email_sitter").value
    const password= document.getElementById("password").value
    const dateNaissance= document.getElementById("date").value
    const num= document.getElementById("tel").value
    const prix= document.getElementById("prix").value
    const city= document.getElementById("city").value
    const description= document.getElementById("description").value

    //Recuperer les checkbox
    const dog= document.getElementById("dogs")
    const cat= document.getElementById("cats")
    const hamster= document.getElementById("hamster")

    const home_stay= document.getElementById("home_stay")
    const dog_walks= document.getElementById("dog_walks")



    let chien=false
    let chat=false
    let rongeur=false

    if(dog.checked){
        chien=true
    }
    if(cat.checked){
        chat=true
    }
    if(hamster.checked){
        rongeur=true
    }

    let aDomicile=false
    let promenade=false

    if(home_stay.checked){
        aDomicile=true
    }
    if(dog_walks.checked){
        promenade=true
    }

    const objet={
        "firstName_sitter":nom,
        "lastName_sitter":prenom,
        "email_sitter":email,
        "password_sitter":password,
        "age_sitter":dateNaissance,
        "phone_sitter":num,
        "price_sitter":prix,
        "city_sitter":city,
        "description_sitter":description,
        "petsAcceptes":{
            "dogs":chien,
            "cats":chat,
            "hamster":rongeur
        },
        "services":{
            "home_stay":aDomicile,
            "dog_walks":promenade
        }
    }

    //const json= JSON.stringify(objet)
    //console.log(json)
    console.log(objet)
    communicationAvecLeBackPOST(objet, URLServeur+"registerSitter")
    window.location.href = URLServeur+ 'login';
    
}

