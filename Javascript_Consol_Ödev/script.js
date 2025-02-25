// ---------1-----------

const bilgiler ={};


let isim = prompt("Adınız nedir?");
let yas = prompt("Kaç yaşındasınız?");
let meslek = prompt("Mesleğiniz nedir?");


bilgiler.name= isim;
bilgiler.age= yas;
bilgiler.job= meslek;

console.log(bilgiler);


// -------2----------------

var products=[];

var product = prompt("Sepete eklemek istediğiniz ürünü yazın");
var price = prompt("fiyat yazın");

products.push({product: product, price: Number(price)})

console.log(`${product} ürünü sepete eklendi. Fiyat: ${price}`);


var product = prompt("Sepete eklemek istediğiniz ürünü yazın");
var price = prompt("fiyat yazın");

products.push({product: product, price: Number(price)})

console.log(`${product} ürünü sepete eklendi. Fiyat: ${price}`);

console.log(`Sepetiniz: ${JSON.stringify(products)}`);

//--toplam fiyat
var total = [];

products.forEach(item => total.push(item.price));

var totalPrice = total.reduce((a,b) => a+b);

console.log(`toplam fiyat: ${totalPrice}`)



//--sepetten ürün çıkaran fonksiyon
var removeProduct = prompt("Sepetten çıkartmak istediğiniz ürünü yazın");
 
sepettencikar =() => {

    //kullanıcının girdiği değer dizide var mı diye kontrol etttim
    var filtered= products.filter((item) => item.product === removeProduct); //dizi döndü
   //var finded= products.find((item) => item.product === removeProduct); // object döndü

    if(filtered)
    {
        
        //kullanıcıdan aldığım input ile index numarasını aldım
        var findedproduct = products.findIndex((item) => item.product === removeProduct);
       
        //index numarası , kaç eleman silineceği
        products.splice(findedproduct,1);
        
       
    }
    else{
        console.log("sepetinizde böyle bir ürün yok")
    }
}
sepettencikar();

//--sepete dinamik olarak ürün ekleme
//ürünleri ekledim
localStorage.setItem("ürün", JSON.stringify(products));

var product = prompt("Sepete eklemek istediğiniz ürünü yazın");
var price = prompt("fiyat yazın");

products.push({product: product,price: Number(price)})

//yeni eklenen ürünleri ekledim
var localStorageArr=[...products];
localStorage.setItem("ürün", JSON.stringify(localStorageArr));



