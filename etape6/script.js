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

function deleteRow(){

    // etape 1 : si le tableau est vide on sort (if, cours JS slide 42)
    if(lignes === 0){
        window.alert("Le tableau est vide !");
        return; // return pour sortir de la fonction (cours JS slide 45)
    }

    // etape 2 : recuperer le tableau et les checkbox cochees
    // querySelector et querySelectorAll (cours JS slide 76)
    const table = document.querySelector("tbody");
    const checked = document.querySelectorAll(".col_chkbox input:checked");

    // etape 3 : si aucune checkbox n'est cochee on sort
    if(checked.length === 0){
        window.alert("Sélectionnez au moins une ligne !");
        return;
    }

    // etape 4 : demander confirmation, confirm est une methode de window comme alert (cours JS slide 116)
    // operateur ! (cours JS slide 41)
    if(!window.confirm("Voulez-vous vraiment supprimer les lignes sélectionnées ?")){
        return;
    }

    // etape 5 : recuperer toutes les lignes
    const rows = table.querySelectorAll("tr");

    // etape 6 : parcourir les lignes avec une boucle for (cours JS slides 44 et 82)
    // on commence par la fin pour ne pas decaler les positions dans persons
    for(let i = rows.length - 1; i >= 0; i--){
        const row = rows[i];
        const checkbox = row.querySelector(".col_chkbox input");

        // attribut checked de la checkbox (cours JS slide 93)
        if(checkbox.checked){
            // les points sont dans la 4eme cellule (children, cours JS slide 89)
            const points = parseInt(row.children[3].innerText);

            // operateurs -= et -- (cours JS slide 41)
            total_points -= points;
            lignes--;

            // supprimer la ligne du DOM (remove, cours JS slide 100)
            row.remove();

            // supprimer aussi dans persons (splice, pas vu dans le cours)
            persons.splice(i, 1);
        }
    }

    // fonctionnalite en plus 1 : remettre les numeros dans l'ordre
    renumeroter();

    // etape 7 : message de succes et mise a jour du resume
    window.alert("Suppression effectuée avec succès !");
    update_summary();
}

// fonctionnalite en plus 1 : renumeroter la colonne N° apres une suppression
function renumeroter(){
    const rows = document.querySelectorAll("tbody tr");

    // boucle for (cours JS slide 44)
    for(let i = 0; i < rows.length; i++){
        // le numero est dans la 1ere cellule (children, cours JS slide 89)
        rows[i].children[0].innerText = i + 1;
    }
}

// fonctionnalite en plus 2 : modifier la personne de la ligne cochee
function doEdit(){
    // recuperer toutes les lignes (querySelectorAll, cours JS slide 76)
    const rows = document.querySelectorAll("tbody tr");

    // chercher la ligne cochee et compter combien de lignes sont cochees
    let index = -1;
    let nb_coches = 0;
    // boucle for (cours JS slide 44)
    for(let i = 0; i < rows.length; i++){
        // attribut checked de la checkbox (cours JS slide 93)
        if(rows[i].querySelector(".col_chkbox input").checked){
            index = i;
            nb_coches++;
        }
    }

    // il faut cocher une seule ligne (if, cours JS slide 42)
    if(nb_coches !== 1){
        window.alert("Cochez une seule ligne à modifier !");
        return;
    }

    // la personne a modifier dans persons (acces a un tableau, cours JS slide 38)
    const person = persons[index];

    // demander les nouvelles valeurs avec prompt de window (cours JS slide 116)
    // la valeur actuelle est proposee par defaut
    let nom = window.prompt("Nouveau nom :", person.nom);
    let prenom = window.prompt("Nouveau prénom :", person.prenom);
    let points = parseInt(window.prompt("Nouveaux points :", person.points));

    // si on clique sur Annuler, prompt donne null
    // operateurs === et || (cours JS slide 41)
    if(nom === null || prenom === null || nom === "" || prenom === "" || Number.isNaN(points)){
        window.alert("Modification annulée !");
        return;
    }

    // mettre a jour le total : on enleve les anciens points et on ajoute les nouveaux (cours JS slide 41)
    total_points = total_points - person.points + points;

    // modifier l'objet dans persons (modifier une propriete, cours JS slide 39)
    person.nom = nom;
    person.prenom = prenom;
    person.points = points;

    // modifier aussi la ligne dans le tableau (children cours JS slide 89, innerText cours JS slide 91)
    const row = rows[index];
    row.children[1].innerText = nom;
    row.children[2].innerText = prenom;
    row.children[3].innerText = points;

    // decocher la case apres la modification
    row.querySelector(".col_chkbox input").checked = false;

    update_summary();
}

// fonctionnalite en plus 3 : rechercher par nom
function doSearch(){
    // texte tape dans le champ (getElementById cours JS slide 61, value cours JS slide 93)
    // toLowerCase pour ne pas tenir compte des majuscules (pas vu dans le cours)
    const texte = document.getElementById("search_nom").value.toLowerCase();

    const rows = document.querySelectorAll("tbody tr");

    // boucle for..of (cours JS slide 44)
    for(const row of rows){
        const nom = row.children[1].innerText.toLowerCase();

        // includes verifie si le nom contient le texte (pas vu dans le cours)
        if(nom.includes(texte)){
            // modifier le style (propriete style, cours JS slide 95)
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    }
}