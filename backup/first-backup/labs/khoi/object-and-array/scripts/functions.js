//Definition for using the object constructor functions
function Product(pId, pName, pPrice, pDescription, pImageUrl) {
    this.productId = pId;
    this.productName = pName;
    this.productPrice = pPrice;
    this.productDescription = pDescription;
    this.productImageUrl = pImageUrl;
}

function showProductList(pId, pName, pPrice, pDescription, pImageUrl) {
    let htmlContent = "";

    htmlContent += "<p>";
    htmlContent += pId + "<br>";
    htmlContent += pName + "<br>";
    htmlContent += pPrice + "<br>";
    htmlContent += pDescription + "<br>";
    htmlContent += pImageUrl + "<br>";
    htmlContent += "</p>";

    document.getElementById("dspProductList").innerHTML += htmlContent;
}