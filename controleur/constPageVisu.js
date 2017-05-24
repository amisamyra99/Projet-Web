/**
 * Created by julien on 23/05/17.
 */


//========================https://www.creativejuiz.fr/blog/javascript/recuperer-parametres-get-url-javascript==================//
function $_GET(param) {
    var vars = {};
    window.location.href.replace( location.hash, '' ).replace(
        /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
        function( m, key, value ) { // callback
            vars[key] = value !== undefined ? value : '';
        }
    );

    if ( param ) {
        return vars[param] ? vars[param] : null;
    }
    return vars;
}
//=========================================================================================================================//




function init(){
    var categ = $_GET('categorie');
    var data = encodeURIComponent(categ);
    try{
        ajax_get_request(placementDiv, '../controleur/recupVisuelProduit.php?categorie='+data, true);
    }catch(err){
        alert("erreur : "+err);
    }
}



function ajax_get_request(callback, url, async)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if ((xhr.readyState==4) && (xhr.status==200))
            callback(JSON.parse(xhr.responseText));
    };
    xhr.open("GET",url,async);
    xhr.send();
}

function placementDiv(result){
    //console.log("retour result : " + result);

    var art = document.getElementById('emplacementProd');
    for($i=0;$i<result.length;$i++){
        var lien = document.createElement("a");
        lien.setAttribute("href","../controleur/index?page=descriptionProd&ref="+result[$i].ref);
        lien.setAttribute("class","Chat");
        var div = document.createElement("div");
        var figure = document.createElement("figure");
        var img = document.createElement("img");
        img.setAttribute("src", "../data/"+result[$i].photo);
        var figcapt = document.createElement("figcaption");
        var intit = document.createTextNode(result[$i].intitule);
        figcapt.appendChild(intit);
        var p = document.createElement("p");
        var descrip = document.createTextNode(result[$i].prix+'€');
        p.appendChild(descrip);
        figure.appendChild(img);
        div.appendChild(figure);
        div.appendChild(figcapt);
        div.appendChild(p);
        lien.appendChild(div);
        art.appendChild(lien);
    }
}

function maj_produits(button) {
    var art = document.getElementById('emplacementProd');
    var liens = document.getElementsByClassName('Chat');
    for (var i=0; i<liens.length;i++){
        art.removeChild(liens[i]);
    }
    var categ = button.innerHTML;
    var data = encodeURIComponent(categ);
    try{
        ajax_get_request(placementDiv, '../controleur/recupVisuelProduit.php?categorie='+data, true);
    }catch(err){
        alert("erreur : "+err);
    }

}



