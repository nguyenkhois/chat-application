function objProduct(pName, pPrice, pDescription, pImageUrl) {
    this.productName = pName;
    this.productPrice = pPrice;
    this.productDescription = pDescription;
    this.productImageUrl = pImageUrl;
}
function showProductList(pName, pPrice, pDescription, pImageUrl) {
    let htmlContent = "";

    htmlContent += "<p>";
    htmlContent += pName + "<br>";
    htmlContent += pPrice + "<br>"
    htmlContent += pDescription + "<br>";
    htmlContent += pImageUrl + "<br>";
    htmlContent += "</p>";

    document.getElementById("dspProducts").innerHTML += htmlContent;
}

let fruitApple = new objProduct("Apple",10,"Import from France","apple.jpg");
let fruitBanana = new objProduct("Banana",20,"Import from Brazil","banana.jpg");
let fruitLemon = new objProduct("Lemon",30,"Made in Sweden","lemon.jpg");

let arrProducts = [fruitApple,fruitBanana,fruitLemon];

for (let i = 0; i < arrProducts.length; i++){
    showProductList(arrProducts[i].productName,arrProducts[i].productPrice, arrProducts[i].productDescription,arrProducts[i].productImageUrl);
}

