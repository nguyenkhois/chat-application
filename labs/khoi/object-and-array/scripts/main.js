let objProduct1 = new Product(1,"Apple",10,"Import from France","apple.jpg");
let objProduct2 = new Product(2,"Banana",20,"Import from Brazil","banana.jpg");
let objProduct3 = new Product(3,"Lemon",30,"Made in Sweden","lemon.jpg");

let arrProducts = [objProduct1,objProduct2,objProduct3];

for (let i = 0; i < arrProducts.length; i++){
    showProductList(arrProducts[i].productId,arrProducts[i].productName,arrProducts[i].productPrice, arrProducts[i].productDescription,arrProducts[i].productImageUrl);
}