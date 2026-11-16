"use strict"; // mode strict (cours JS slide 51)

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