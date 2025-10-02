// Création d'un titre h2 et ajout dans l'élément avec l'id "app"
nouveauH2 = document.createElement("h2");
nouveauH2.innerText = "titre h2"
document.getElementById("app").appendChild(nouveauH2);

// Création des éléments image, paragraphe, bouton et label pour le carrousel
imagechoisi = document.createElement("img");
document.getElementsByClassName("gallery")[0].appendChild(imagechoisi);

p = document.createElement("p");
document.getElementsByClassName("gallery")[0].appendChild(p);

bouton = document.createElement("button");
bouton.id = "boutoncliqueimg";
document.getElementById("app").appendChild(bouton);

bouton_carrousel = document.createElement("label");
bouton_carrousel.for = "boutoncliqueimg";
bouton_carrousel.textContent = "bouton carrousel"
document.getElementById("app").appendChild(bouton_carrousel);

// Tableau d'images pour le carrousel
let carroussel = [
    "image/Logo-INSA.png",
    "image/photo3.jpg",
    "image/photo4.jpg",
];

let index = 0
let max_image = 2;

// Événement sur le bouton pour afficher une image du carrousel
const boutonimg = document.getElementById("boutoncliqueimg");
boutonimg.addEventListener("click", function ChoisiImage(){
    p.textContent = ""; // Réinitialise le texte
    mise_a_jour_titre(index +1)// Met à jour le titre
    imagechoisi.src = carroussel[index];// Change l'image
    document.getElementsByClassName("gallery")[0].appendChild(imagechoisi);

    // Incrémente ou réinitialise l'index
    if(index === max_image){
        index = 0;
    }else{
        index++;
    }

    //console.log("bouton appuié")
    ///console.log(index)
})

// Événement sur l'image pour afficher son alt et ajouter une bordure
imagechoisi.addEventListener("click", function ClickImage(){
    imagechoisi.alt = imagechoisi.getAttribute("src");
    p.textContent = imagechoisi.getAttribute("alt");
    imagechoisi.style.border = "2px solid red";
})

// Création du bouton et label pour lancer le diaporama
bouton_diapo =document.createElement("button");
label_bouton_diapo = document.createElement("label");
label_bouton_diapo.textContent = "clique pour diapo"
label_bouton_diapo.setAttribute("for", "bouton_diapo_id");
document.getElementsByClassName("gallery")[0].appendChild(bouton_diapo);
document.getElementsByClassName("gallery")[0].appendChild(label_bouton_diapo);

// Création du titre h3 pour afficher l'image courante
const titre = document.createElement("h3")
document.getElementById("app").appendChild(titre);

// Fonction pour mettre à jour le titre avec le numéro d'image
function mise_a_jour_titre(index){
    titre.innerHTML = "Image" + index;
}

// Diaporama automatique avec setInterval
bouton_diapo.addEventListener("click", function DiapoImage(){
    const interval =setInterval(function(){
        p.textContent = "";
        mise_a_jour_titre(index + 1);
        document.getElementsByClassName("gallery")[0].appendChild(imagechoisi);
        imagechoisi.src = carroussel[index];

        if(index === max_image){
            index = 0;
            clearInterval(interval);// Arrête le diaporama
        }else{
            index++;
        }

    },2000); // Changement toutes les 2 secondes
});

// Affiche le nombre total de boutons dans le document
const nb_but = document.getElementsByTagName("button");
console.log(nb_but.length);

// Création d’un bouton et d’un champ texte pour ajouter une image au carrousel
const button_ajout = document.createElement("button");
button_ajout.id = "bouton_ajout_id"
document.getElementById("champ").appendChild(button_ajout)

const zone_text = document.createElement("input");
zone_text.id = "zone_text";
zone_text.type = "text";
document.getElementById("champ").appendChild(zone_text);

// Label associé au bouton d’ajout
const label_bouton_ajout = document.createElement("label");
label_bouton_ajout.id = "label_bouton_ajout_id"
label_bouton_ajout.setAttribute("for", "bouton_ajout_id");
document.getElementById("bouton_ajout_id").appendChild(label_bouton_ajout);
label_bouton_ajout.textContent = "bouton_ajout"

// Ajoute une nouvelle image au carrousel à partir du champ texte
button_ajout.addEventListener("click", function ChoisiImage(){
    carroussel.push(zone_text.value);
    console.log("Image dans le tableau");
});

// Mise en forme du champ texte
zone_text.classList.add("highlight");


