(() => {

    let appendLocation = ".ins-api-users";

    const $mainDiv = $(appendLocation);

    let $pageTitle= $("<h2>").addClass("page-title").text("Kişi Kartları")
    
    $mainDiv.prepend($pageTitle);

    const $userContainer= $("<div>").attr('id', 'user-container');
    $mainDiv.append($userContainer);

 
    const init = () =>{
       

        getUsers();  
        creatCss();
        setEvents();
    }

   

    const getUsers = () =>{

        let sessionStorageControlValue = sessionStorage.getItem("session");
        if(sessionStorageControlValue)
        {
            $(".refresh-card-btn").hide();
        }

        const url = 'https://jsonplaceholder.typicode.com/users'; 

        let localStorageGetItemValue = localStorageGetItem("users");
        
        return localStorageGetItemValue ? createUI(localStorageGetItemValue) : getUsersPromise(url); 
       
    }

   

    const getUsersPromise =(URL) => {
        let promise = new Promise(async (resolve, reject) => {
           
                let response= await fetch(URL);
                if (response.ok) {

                    let data = await response.json();
                    resolve(data);
                }
                else{
                    reject({
                        "statusCode" : response.status,
                        "errorMessage" : response.statusText
                    })

                }
               
                
               
        });
        promise.then(result => {
            createUI(result);
            localStorageAdd("users", result);
           
          })
        promise.catch(error => showError(error));
      }




 
    const localStorageAdd = (key,data) =>{
       
        setWithExpiry(key, data, 1);  
        
    }
 


    const setWithExpiry = (key, value, ttl) =>{
        const now = new Date();
        const lastDate= now.getDate() + ttl * 24 * 60 * 60 * 1000;
    
        const item = {
            value: value,
            expiry: now.setDate(lastDate),
        }
        localStorage.setItem(key, JSON.stringify(item))
        
    }



    const localStorageGetItem = (key) => {
        const itemStr = localStorage.getItem(key)
        
        if (!itemStr) return null
        
        const item = JSON.parse(itemStr)
    
        const now = new Date()
        
        return now.getTime() > item.expiry ? (localStorage.removeItem(key), null) : item.value;
      
} 



   const createUI = (data) =>{
     
       
        data.forEach((element,index) => {
            const htmlContent=`
            <div class="card">
            <div>
                <h3>${element.name}</h3>
                <p><span class="card-title">Mail: </span>${element.email}</p>
                <p><span class="card-title">Adres: </span>${element.address.street} ${element.address.suite}</p>  
            </div>
            <div>
                <button data-id="${index}" class="remove-user-btn">Kullanıcyı Sil</button>  
            </div> 
        
            `
        $userContainer.append(htmlContent);




        let watchedElement= document.getElementById("user-container");
        const observer = new MutationObserver(mutationObserverStart);

        const observerOptions = {
            childList: true,
        };

        observer.observe(watchedElement, observerOptions);
    });
}

   


    const mutationObserverStart = (mutations) =>{

        for (let mutation of mutations) {
            if (mutation.type === "childList") {
                if (!mutation.target.children.length) {
                    let user = $("#user-container");
                    let $btn = $("<button>").addClass("refresh-card-btn");
                    $btn.html("Kartları Getir");
                    user.append($btn);
                }
            }
}}



    const showError = (error) =>{
        const $alertDiv= $('<div>')
        $alertDiv.addClass=("alert-box");
       
        const errorMessage= `
        <div> ${error.statusCode} ${error.errorMessage}</div>
        `

        $alertDiv.html(errorMessage);
        $mainDiv.after($alertDiv);
       
}

  
    

    const creatCss = () =>{
        const css=`

        .card{
    
        border: 1px solid #eee;
        border-radius: 15px;
        padding: 20px;
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        column-gap: 20px;
        box-shadow: 1px 1px 16px -6px rgba(0, 0, 0, 0.5);
        -webkit-box-shadow: 1px 1px 16px -6px rgba(0, 0, 0, 0.5);
        -moz-box-shadow: 1px 1px 16px -6px rgba(0, 0, 0, 0.5);
        }

    

        .ins-api-users{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-wrap: wrap;
        

        }
        
        body{
        margin:0;
        padding: 0;
        }

        #user-container{
        
        display: flex;
        flex-direction: column;
        gap: 1rem;

        }

        .remove-user-btn{
        cursor: pointer;
        border: none;
        background-color: black;
        color:white;
        border-radius: 25%;
        width: 10rem;
        padding: 1rem;

        }

        .card-title{
        color: red;
        
        }

    
    `

    $("head").append($("<style>").html(css));
}



    const setEvents = () =>{

    $(document).on( "click", ".remove-user-btn",function() {
        $(this).closest(".card").remove();

    })

    $(document).on( "click", ".refresh-card-btn", function(){

       
        sessionStorage.setItem("session", "buttonclick");
    
        getUsers();
       


    });

;}




  init();
})();
