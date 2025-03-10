$(document).ready(function () {

        // FancyBox ayarlarını özelleştir
    Fancybox.bind('[data-fancybox]', {
    // Animasyon efekti
    animated: true,
    showClass: 'fancybox-fadeIn',
    hideClass: 'fancybox-fadeOut',
    
    // Gezinme ayarları
    infinite: true,
    wheel: 'slide',
    
    // Görünüm ayarları
    compact: false,
    dragToClose: true,
    
    // Başlık ayarları
    showCaption: true,
    captionClass: 'fancybox-caption',
    
    // Araç çubuğu ayarları
    Toolbar: {
        display: {
            left: ['infobar'],
            middle: ['zoomIn', 'zoomOut', 'toggle1to1', 'rotateCCW', 'rotateCW'],
            right: ['slideshow', 'thumbs', 'close']
        }
    }
    });

    

    $('.center').slick({
    //autoplay:false,
    centerMode: true,
    centerPadding: '150px',
    slidesToShow: 3,
    arrows: true,  
    responsive: [
    {
    breakpoint: 768,
    settings: {
    arrows: true, 
    centerMode: true,
    centerPadding: '40px',
    slidesToShow: 3
    }
    },
    {
    breakpoint: 480,
    settings: {
    arrows: true,  
    centerMode: true,
    centerPadding: '40px',
    slidesToShow: 1
    }
    }
    ]
    });


    
    $.ajax({
    url: 'https://fakestoreapi.com/products?limit=12',
    method: 'GET',
    dataType: 'json'
    })
    .done(function(response) {

    $(".user-card-list").empty(); // Önceki ürünleri temizle
    
    response.forEach(element => {

        const productCardContent = `
        <div data-id="${element.id}" class="single-card">
        
            <div class="img-area">  
            <img src="${element.image}" alt="">
            </div>
            <div class="info">
            <h4 class="product-title">${element.title}</h4>   
            </div>
            <div class="card-price">
                <p class="price">${element.price}</p>
            </div>
            
            <button data-fancybox data-src="#modal-${element.id}" class="product-detail">Ürün Detayı</button>
            <button class="add-to-cart-btn" >Sepete Ekle</button>
            
        </div>

        
        `

        const modalHtml=`
            <div id="modal-${element.id}" style="display: none;">
                <div class="modal-content">
                    <h1> ${element.description}  </h1> 
                </div>         
            </div>
            
            `     
        $(".user-card-list").append(productCardContent);
        $(".modal-section").append(modalHtml);

    });

    


    $('.slider').slick('unslick');

    let slidesHtml = '';
    response.forEach(element => {
        slidesHtml += `<div class="slider-card"><img src="${element.image}"></div>`;
    });
    $('.center').slick('slickAdd', slidesHtml);

    
    })
    .fail(function(error) {
    console.log('Error:', error);
    });



    $(document).on("mouseenter", ".add-to-cart-btn", function(e) {
    $(this).fadeTo('slow', 0.5); 
    });

    $(document).on("mouseleave", ".add-to-cart-btn", function(e) {
    $(this).fadeTo('slow', 1); 
    });


    let productCounter = 0;

    $(document).on("click", ".add-to-cart-btn", function(event){

    const $clone = $(this).closest(".single-card").clone(true);
    $clone.find(".product-detail").remove();
    $clone.find(".add-to-cart-btn").remove();
    $clone.find(".img-area").remove();

    $clone.css({
    "flex-direction" : "row",
    "width": "20rem",
    "height" : "6rem",
    "justify-content": "center"    
            
    })
    $clone.appendTo('#list-item');

    
    $(".remove-btn").html(`<button id="remove-cart-btn">Sepeti Temizle</button>`);

    carItemCount(productCounter++);
    
    showAlert("Ürün sepete eklendi!", ".alert-message");
    
    }
    )


    function carItemCount(productCounter){

    $(".cart-count").html(`${productCounter}`);

    }



    $(document).on("click", ".add-to-cart-btn", function(event){

    //Çeşitli jQuery Traversing örnekleri ekledim
    const localStorageItem= {
    "title":  $(this).closest('.single-card').find('.product-title').text(),
    "price": $(this).parent().prev().children().text(),
    "image" :  $(this).parent().siblings().find("img").attr("src")
    }


    try {
    let storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    storedProducts.push(localStorageItem);
    localStorage.setItem('products', JSON.stringify(storedProducts));
    
    } catch (e) {
        
        showAlert('Hata: Tercihler kaydedilemedi!');
    }
    });

    $(document).on("click", "#remove-cart-btn", function(event){
    let $removeBtn = $(this);
    $removeBtn.parent().prev().children().empty(); 
    $removeBtn.addClass("hidden"); 

    carItemCount(0);

    localStorage.clear();


    })


    function showAlert(message){
    $(".alert-message").empty();


    const alert = `
    <div class="alert">
    <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
    ${message}
    </div>
    `

    $(".alert-message").append(alert);

    }



    $("#id-search-btn").click(function(){
    $(".user-card-list").empty(); // Önceki ürünleri temizle
    


    $.get(`https://fakestoreapi.com/products/${searchId}`)
        .done(function(data) {
            const userId = data.id ? data.id : 'N/A';
        const searchedCardContent = `
            <div data-id="${data.id}" class="single-card">
            
            <div data-fancybox data-src="#modal" class="img-area">
            <img src="${data.image}" alt="">
            </div>
            <div class="info">
            <h4>4{data.title}</h4>
            
            </div>
            <div class="card-price">
                <p class="price">${data.price}</p>
            </div>
                <div class="cart-btn">
                <button class="add-to-cart-btn" >Sepete Ekle</button>
            </div>
            
            </div>
        </div>

            
        `
        
        $(".user-card-list").append(searchedCardContent);
            
        })
        .fail(function(xhr) {
            showError('#getResults', xhr.statusText);
        });

    })



    $('#content-search').on('input', debounce(function(e) {

    let contentSearched= $("#content-search").val().trim();

    if(contentSearched.length==0)
    {
    $(".user-card-list .single-card").show();

    }

    $(".user-card-list .single-card").hide();
    $(".user-card-list .single-card:contains("+contentSearched+")").show();

    }, 500));



    $('.search-input').on('focus', (function(e) {
    $(this).addClass("focused");

    }));


    $('.search-input').on('blur', (function(e) {
    $(this).addClass("blured");


    }));


    $("#cart-items").slideUp();
    $(".cart-icon").on("click", function () {
    $("#cart-items").slideToggle();

    });




    // Debounce fonksiyonu
    function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
    }

});