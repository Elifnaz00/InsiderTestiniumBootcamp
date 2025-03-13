(() => {

    const $mainDiv= $(".ins-api-users");
    let $pageTitle= $("<h2>");
    let pageTitleContent=`Kişi Kartları`;

   
    $pageTitle.addClass("page-title").text(pageTitleContent);;
    $mainDiv.prepend($pageTitle);


    const init = () =>{
        getUsers();
        creatCss();
        setEvents();
    }
    

    const getUsers = () =>{

        let value = getWithExpiry("users");
       
        if(!value)
        {

            fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                return new Promise((resolve, reject) => {
                    setTimeout(async () => {
                        if (response.ok) {
                            let data = await response.json();
                            resolve(data);

                        }
                        else {
                            reject(
                                {
                                    "statusCode" : response.status,
                                    "errorMessage" : response.statusText
                                }
                            );
                        }
                    }, 2000);

                })
                .then(result=>{
                    createUI(result);
                    localStorageAdd(result);

                })
               
            })
            .catch(error => showError(error))        
        }
        else{
            createUI(value)
        }     
    }
   


  
    const localStorageAdd = (data) =>{
       
        setWithExpiry("users", data, 1);  
        
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
    


    const getWithExpiry = (key) => {
        const itemStr = localStorage.getItem(key)
        
        if (!itemStr) {
            
            return null
        }
        const item = JSON.parse(itemStr)
    
        const now = new Date()
        
        if (now.getTime() > item.expiry) {

            localStorage.removeItem(key)
            return null
        }
        
        return item.value
}




    const createUI = (data) =>{
        let $userContainer= $("<div>");
        $userContainer.addClass("user-container");
        $mainDiv.append($userContainer);

        data.forEach((element) => {
            const htmlContent=`
            <div class="card">
            <div>
                <h3>${element.name}</h3>
                <p><span class="card-title">Mail: </span>${element.email}</p>
                <p><span class="card-title">Adres: </span>${element.address.street} ${element.address.suite}</p>  
            </div>
            <div>
                <button data-id="${element.id}" class="remove-user-btn">Kullanıcyı Sil</button>  
            </div> 
        
        
            `
        
       
        $userContainer.append(htmlContent);
    });
   
}

    const showError = (error) =>{
        const $alertDiv= $('<div>'); 
        $alertDiv.addClass="alert-box";
    
    
        const errorMessage= `
        <div> ${error.statusCode} ${error.errorMessage}</div>
        `
    
        $mainDiv.after($alertDiv);
        $alertDiv.html(errorMessage);
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

        .user-container{
        
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

    $("style").html(css).append("head");
}



    const setEvents = () =>{

    $(document).on( "click", ".remove-user-btn",function() {
        $(this).closest(".card").remove();
     
});}

  init();
})();
