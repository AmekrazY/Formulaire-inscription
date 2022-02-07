const inputUser = document.querySelector('.form-groupe:nth-child(1) input');
const inputMail = document.querySelector('.form-groupe:nth-child(2) input');
const inputPsw = document.querySelector('.form-groupe:nth-child(3) input');
const inputConfirm = document.querySelector('.form-groupe:nth-child(4) input');

const images = document.querySelectorAll('.icone-verif');
const spans = document.querySelectorAll('span');
const lines = document.querySelectorAll('.ligne div');

// Validation du nom d'utilisateur 
// La seule validation pour le premier input est plutôt simple, on veut que son pseudo fasse plus de 3 caractères. 
// Dès qu'on va écrire dans notre input, on prend "e" aka l'objet de l'évènement, et on lui applique une condition :
inputUser.addEventListener('input', (e) => {
    // Si la valeur de l'entrée dans notre input est supérieur ou égale à 3, on fait apparaître l'image en la passant de display none (en CSS), à inline. On récupère ensuite l'image qu'on veut afficher en conséquence et on retire le texte qu'on fera apparaître que si on est dans le cas où le nom est inférieur à 3 caractères, pour aiguiller l'utilisateur.
    if(e.target.value.length >= 3){
        images[0].style.display = "inline";
        images[0].src = "ressources/check.svg";
        spans[0].style.display = "none";
    } else {
        images[0].style.display = "inline";
        images[0].src = "ressources/error.svg";
        spans[0].style.display = "inline";
    }
} )

// Validation de l'email

inputMail.addEventListener('input', (e) => {
    const regexEmail = /\S+@\S+\.\S+/;
    // Le S va correspondre avec tous les caractères qui ne sont pas des espaces. Le "+" vient compéter le S en disant "Je match tous les caractères qui ne sont pas des espaces, avec un nombre indéfini". Ensuite on veut un @, puis encore tous les caractères qui ne sont pas des espaces, puis un point, puis à nouveau tous les caractères qui ne sont pas des espaces. 
    // Evidemment il y a des regex plus évoluées pour les mails notamment celle ci : [^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+ en sachant que ce qu'il y a entre les crochets permet de matcher n'importe quel caractère autre que l'@, les espaces, la tabulation, le saut de lignes.

    if(e.target.value.search(regexEmail) === 0){
        // Si la valeur entrée dans mon input match avec la regex que je lui passe en paramètre (c'est search() qui permet d'effectuer cette vérification), on sera === 0 et si ça ne match pas on sera === -1. Pourquoi ce sera égal à 0 ? Parce-que ça va nous donner un index de départ. Si notre email est compatible avec la regex, l'index de départ sera 0, le début de la valeur qu'on entre dans l'input. 
        images[1].style.display  ="inline";
        images[1].src = "ressources/check.svg";
        spans[1].style.display = "none";
    } else if (e.target.value.search(regexEmail) === -1){
        images[1].style.display  ="inline";
        images[1].src = "ressources/error.svg";
        spans[1].style.display = "inline";
    }
})

// Validation et création du mot de passe
// On va vouloir tester la valeur de notre input avec différentes expressions régulières.
// On vient déclarer cette variable ici pour que sa portée soit globale et pas locale puisqu'on va vouloir s'en servir à deux endroits différents.
let inputValue;
const specialCar = /[^a-zA-Z0-9]/;// On exclu (^) tout ce qui est lettre maj min et chiffres
const alphabet = /[a-z]/i;// Toutes les lettres minulscules, le i à la fin veut dire insensible à la casse (insensitive).
const numbers = /[0-9]/


// Cet objet va nous servir à savoir le nombre de symbole, de lettres et de chiffres qu'il y a dans notre input. On va pouvoir venir remplir cet objet et savoir si oui ou non on a mit une de ces clés dans notre input.
let objValidation = {
    symbole : 0,
    lettre: 0,
    chiffre : 0
}

inputPsw.addEventListener('input', (e) => {
    inputValue = e.target.value;
    // S'il y a une correspondance entre la valeur entrée dans l'input et la regex que l'on passe à search(), alors on vient mettre un 1 comme valeur aux clés de notre objet.
    if(inputValue.search(specialCar) !== -1){
        objValidation.symbole = 1
    }
    if(inputValue.search(alphabet) !== -1){
        objValidation.lettre = 1
    }
    if(inputValue.search(numbers) !== -1){
        objValidation.chiffre = 1
    }
    
    // SI on efface des lettres, on veut que ce soit pris en compte dans notre objet
    
    if(e.inputType = 'deleteContentBackward'){
        // deleteContent est une des ppté offerte par l'objet e qui est relatif à l'addEventListenet
        // Si je fais un retour et que une des valeurs suivantes est strictement égal à -1 ça veut dire que j'aurais supprimé un symbol, une lettre ou un chiffre.
        if(inputValue.search(specialCar) === -1){
            objValidation.symbole = 0;
        }
        if(inputValue.search(alphabet) === -1){
            objValidation.lettre = 0;
        }
        if(inputValue.search(numbers) === -1){
            objValidation.chiffre = 0;
        }
        console.log(objValidation);
    }

    let test = 0;
    for(const property in objValidation){
        // Si notre la propriété de notre objet en cours de vérification est supérieur à 0, alors on fait +1 sur testAll. Si la propriété en cours de notre objet (donc symbole, puis lettre, puis chiffre) a une valeur supérieur à 0 ça veut dire qu'on a passé la validation et qu'on a rempli l'objet. 
        if(objValidation[property] > 0){
            test++;
        }
    }

    // Si testAll est inférieur à 3, donc qu'on ne rempli pas une des trois conditions / clé, de notre objet, alors message d'erreur, l'image d'erreur etc.
    if(test < 3){
        spans[2].style.display = "inline";
        images[2].src = "ressources/error.svg";
        images[2].style.display = "inline";
    } else {
        spans[2].style.display = "none";
        images[2].src = "ressources/check.svg";
    }

    // On vient tester la force de notre mdp
    // Si la longueur de la chaîne de caractère tapée dans l'input est entre 1 et 6 on va dire que notre mdp est faible. On vient du coup afficher que le premier span.
    if(inputValue.length <= 6 && inputValue.length > 0){
        lines[0].style.display = 'block';
        lines[1].style.display = 'none';
        lines[2].style.display = 'none';   
    } else if( inputValue.length > 6 && inputValue.length <= 9){
        // Si je suis entre 7 et 9, j'affiche le premier et le deuxième span.
        lines[0].style.display = 'block';
        lines[1].style.display = 'block';
        lines[2].style.display = 'none';
    }else if(inputValue.length > 9){
        // Si je suis entre 7 et 9, j'affiche le premier, le deuxième et le troisième span.
        lines[0].style.display = 'block';
        lines[1].style.display = 'block';
        lines[2].style.display = 'block';
    } else if(inputValue.length === 0){
        lines[0].style.display = 'none';
        lines[1].style.display = 'none';
        lines[2].style.display = 'none';
    }
})

//  confirmation

inputConfirm.addEventListener('input', (e) => {
    // On vient regarder si notre input est vide. Si c'est le cas on affiche l'image error.
    if(e.target.value.length === 0){
        images[3].style.display = "none";
    } else if (e.target.value === inputValue){
        // Ici on a une correspondance entre notre input précédent et celui de vérification
        images[3].style.display = "inline";
        images[3].src = "ressources/check.svg";
    } else {
        // ici, erreur
        images[3].style.display = "inline";
        images[3].src = "ressources/error.svg";
    }
})