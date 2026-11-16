"use strict"; // mode strict (cours JS slide 51)

// variables lignes et total_points initialisees a 0 (let, cours JS slide 51)
let lignes = 0;
let total_points = 0;

// tableau d'objets persons (cours JS slide 40)
const persons = [
    {nom: "nom-1", prenom: "prenom-1", points: 5},
    {nom: "nom-2", prenom: "prenom-2", points: 10},
    {nom: "nom-3", prenom: "prenom-3", points: 15}
];

// appel de init (appel de fonction, cours JS slide 45)
init();

function init(){
    // boucle for..of (cours JS slide 44)
    for(const person of persons){
        // acces aux proprietes d'un objet (cours JS slide 39)
        doInsert(person.nom, person.prenom, person.points);
    }
}

function doNewData(){
    // recuperer les champs par leur id (getElementById, cours JS slide 61)
    const elt_nom = document.getElementById("form_nom");
    const elt_prenom = document.getElementById("form_prenom");
    const elt_points = document.getElementById("form_points");

    // lire l'attribut value (acces aux attributs, cours JS slide 93)
    let nom = elt_nom.value;
    let prenom = elt_prenom.value;
    // parseInt pour convertir le texte en entier (demande dans le TP)
    let points = parseInt(elt_points.value);

    // verifier que les champs ne sont pas vides
    // if else (cours JS slide 42), operateurs === et || (cours JS slide 41)
    // Number.isNaN donne dans l'aide du TP
    if(nom === "" || prenom === "" || Number.isNaN(points)){
        // alert de window (cours JS slide 116)
        window.alert("Formulaire incomplet !");
    } else {
        doInsert(nom, prenom, points);

        // ajouter aussi dans le tableau persons (push, cours JS slide 38)
        persons.push({nom: nom, prenom: prenom, points: points});

        // vider les champs
        elt_nom.value = "";
        elt_prenom.value = "";
        elt_points.value = "";
    }
}

function doInsert(nom, prenom, points){
    // ajouter les points au total (operateur +=, cours JS slide 41)
    total_points += points;

    // incrementer lignes (operateur ++, cours JS slide 41)
    lignes++;
    let num = lignes;

    doInsertRowTable(num, nom, prenom, points);

    // mettre a jour le resume
    update_summary();
}

// fonction avec parametres (cours JS slide 45)
function doInsertRowTable(num, nom, prenom, points){

    // on recupere le tbody avec un selecteur css (cours JS slide 76)
    const table = document.querySelector("tbody");

    // creer une ligne tr (createElement, cours JS slide 104)
    const row = document.createElement("tr");

    // donner la classe "row" a la ligne (setAttribute, cours JS slide 107)
    row.setAttribute("class", "row");

    // creer les 5 colonnes
    const col1 = document.createElement("td");
    const col2 = document.createElement("td");
    const col3 = document.createElement("td");
    const col4 = document.createElement("td");
    const col5 = document.createElement("td");

    // remplir le contenu avec innerText (cours JS slide 91)
    col1.innerText = num;
    col2.innerText = nom;
    col3.innerText = prenom;
    col4.innerText = points;

    // la derniere colonne contient une checkbox
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    col5.append(checkbox); // append (cours JS slide 98)

    // affecter les classes aux colonnes
    col1.setAttribute("class", "col_number");
    col2.setAttribute("class", "col_text");
    col3.setAttribute("class", "col_text");
    col4.setAttribute("class", "col_number");
    col5.setAttribute("class", "col_chkbox");

    // rajouter les colonnes a la ligne
    row.append(col1, col2, col3, col4, col5);

    // rajouter la ligne au tableau
    table.append(row);
}

function update_summary(){
    // recuperer p1 et p3 par leur id (getElementById, cours JS slide 61)
    const element_lignes = document.getElementById("p1");
    const element_points = document.getElementById("p3");

    // modifier le texte avec innerText (cours JS slide 91) et la concatenation + (cours JS slide 37)
    element_lignes.innerText = lignes + " ligne(s)";
    element_points.innerText = "Totale point(s)= " + total_points;
}

// afficher le tableau persons dans la console (console.log, cours JS slide 36)
function consoleTableau(){
    console.log(persons);
}