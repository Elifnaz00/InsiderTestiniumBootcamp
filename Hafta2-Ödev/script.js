(() => {
    
    const init = () => {
       
        createFormUI();
        createCss();
        

        document.addEventListener("DOMContentLoaded", function () {
            formEvents();
           
        });
        
        
        
    };

  
    const createFormUI = () => {
        let formHtml = `
         <div class="main-container">
      <div class="form-container">
        <h2>Görev Tamamlama Listesi</h2>
        <br />

        <form id="form" name="girisFormu">
          <div>
            <label for="title">Görev Başlığı</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Görev Başlığı Ekleyiniz.."
            />

            <label for="description">Görev Tanımı</label>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="Görev Tanımı Ekleyiniz.."
            />
          </div>

          <h3>Görev Önceliği</h3>

          <label>
            <input
              id="low"
              type="radio"
              name="radio"
              value="Düşük"
              data-id="1"
              
            />
            Düşük
          </label>

          <label>
            <input
              id="mid"
              type="radio"
              name="radio"
              value="Orta"
              data-id="2"
              
            />
            Orta
          </label>

          <label>
            <input
              id="high"
              type="radio"
              name="radio"
              value="Yüksek"
              data-id="3"
            
            />
            Yüksek
          </label>

          <h3>Tamamlandı mı?</h3>
          <div>
            <label>
              <input
                id="radio-completed"
                type="radio"
                name="completedRadio"
                value="Evet"
              />
              Evet
            </label>

            <label>
              <input
                id="radio-completed"
                type="radio"
                name="completedRadio"
                value="Hayır"
                checked
              />
              Hayır
            </label>
          </div>

          <button type="submit">Görev Ekle</button>
          <span class="error-message"></span>
        </form>
      </div>

      <div class="list-container">
        <div class="list-container-header">
         
          <button id="all-tasks-btn" type="submit">
            Tüm Görevler
          </button>
           <h2>Görev Listesi</h2>
          <button id="completed-tasks" type="submit">
            Tamamlanan Görevler
          </button>
          
        </div>
        <div class="task-list">
          <ul id="myUL"></ul>
        </div>
      </div>
    </div>

           
        `;

        document.querySelector("body").innerHTML = formHtml;
    }





    const valuesArr = [];
    
    const formEvents = () => {
        let errorMessage = document.querySelector(".error-message");

        let form = document.forms["girisFormu"];
        let radioList = document.getElementsByName("radio");
        let radioCompleted = document.getElementsByName("completedRadio");
        
        

        const formElements =(e) =>{
            e.preventDefault();

            if(validateform(form, errorMessage)){

                errorMessage.textContent = ``;


                let titleValue = form.title.value;
                let descriptionValue = form.description.value;
                let radioValue = "";
                let radioCompletedValue = "";
    
                radioList.forEach((item) => {
                    if (item.checked) radioValue = item.value;
                });
    
                radioCompleted.forEach((item) => {
                    if (item.checked) radioCompletedValue = item.value;
                });
    
                const values = {
                    titleValue,
                    descriptionValue,
                    radioValue,
                    radioCompletedValue
                };
    
                valuesArr.push(values);
    
                form.title.value = "";
                form.description.value = "";
    
                createTaskListUI(valuesArr);
                
                
            }

            
        }
        form.addEventListener("submit", formElements);

    };




    const validateform = (form,errorMessage) => {
        
        try{
            if (form.title.value == "" && form.description.value == "") {
                throw "Başlık ve GörevTanımı alanlarını doldurunuz";
               
              }
            else if (form.description.value == "") {
                throw "GörevTanımı alanını doldurunuz";
              }
            else if(form.title.value == "") {
                throw "Başlık alanını doldurunuz";  
            }
                // Form başarılı, gönder
        return true;
              
        }catch (error) {
            // Hata mesajını göster

            errorMessage.textContent = `${error}`;
            return false;
          }
        

       };
        


    const createTaskListUI = (valuesArr) => {
        
        let contentHtml = "";

        valuesArr.forEach((item) => {
            contentHtml += `
                <li>
                    <div>
                        <input type="checkbox" id="check-complete" name="check-complete" />
                        <h3 class="title-value">${item.titleValue}</h3>
                        <p class="description-value">${item.descriptionValue}</p>
                        <h4 class="precedence-value">${item.radioValue}</h4>
                        <span class="material-symbols-outlined" id="delete-btn"> delete </span>
                    </div>
                </li>
            `;
        });
        let myUL = document.querySelector("#myUL");
        myUL.innerHTML = contentHtml;
        taskListEvents(valuesArr);

    };



   
    const taskListEvents = (valuesArr) => {  

        let myUL = document.querySelector("#myUL"); // Üst element seçildi

        myUL.addEventListener("click", function (e) {
            if (e.target.id === "check-complete") {
                console.log(e.target);
                e.target.closest("li").setAttribute("style", "background-color: rgba(34, 139, 34, 1);");
                e.target.value = "Evet";
            }
        });

       
        const deleteTask = index => {
            valuesArr.splice(index, 1);
            
           
        }

        let deleteBtn = document.querySelectorAll("#delete-btn");
        deleteBtn.forEach((item) => {
            item.addEventListener("click", function (e) {
               
                const item = e.target;
                item.parentElement.parentElement.remove();
                deleteTask(valuesArr.indexOf(item));       
                
            });
        });

       

        let allTaskBtn = document.querySelector("#all-tasks-btn");
        allTaskBtn.addEventListener("click", function () { 
            createTaskListUI(valuesArr);
        });
        
        let filteredValuesList = [];
        
        let completedTasks = document.querySelector("#completed-tasks");
        

        const filterTask =() => 
            { 
                filteredValuesList = valuesArr.filter((item) => item.radioCompletedValue === "Evet");
              
                filteredValuesList.length > 0 ? renderFilteredBlogs(filteredValuesList) : myUL.innerHTML = `<h4>Tamamlanmış görev bulunmamaktadır.</h4>`;

            }

         completedTasks.addEventListener("click", filterTask);

        const renderFilteredBlogs = (filteredValuesList) => {
            let contentHtml = "";

            filteredValuesList.forEach((item) => {
                contentHtml += `
                    <li>
                    <div>
                        <input type="checkbox" id="check-complete" name="check-complete" />
                        <h3 class="title-value">${item.titleValue}</h3>
                        <p class="description-value">${item.descriptionValue}</p>
                        <h4 class="precedence-value">${item.radioValue}</h4>
                        <span class="material-symbols-outlined" id="delete-btn"> delete </span>
                    </div>
                </li>
            `;
        })
        myUL.innerHTML = contentHtml;
        };
    };



    
    const createCss = () => {
        let style = document.createElement("style");
        style.innerHTML = `
                                body{
                                background-color: black;
                            }

                            .main-container{
                            
                            color: #fff;
                            display: flex;
                            flex-direction: column;
                            align-items:  center;
                            height: auto;
                            gap: 1rem;
                            
                            

                            }

                            .form-container{
                                margin-top: 5rem;
                                background: rgba(255, 255, 255, 0.1);
                                padding: 5rem;
                                width: 50%;
                                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                                border-radius: 15px;
                                gap: 3rem;
                                
                                
                                
                            }

                            .list-container{
                            background: rgba(255, 255, 255, 0.1);
                            
                            width: 60%;
                            border-radius: 15px;
                            
                            }
                            h2{
                                text-align: center;
                            }

                            input[type="text"] {
                                width: 25rem;
                                padding: 0.5rem;
                                border-radius: 8px;
                                border: none;
                                outline: none;
                                font-size: 12px;
                                margin-right: 1rem;
                                box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                                border: 1px solid #333;
                            }
                            /*
                            input[type="text"]:invalid {
                                box-shadow: 0 0 5px 1px red;
                                background-color: #fdd;
                            }
                                */

                            button {
                                padding: 0.8rem 1rem;
                                border-radius: 8px;
                                border: none;
                                background: #ff6b6b;
                                color: #fff;
                                font-size: 1rem;
                                cursor: pointer;
                                transition: background 0.3s;
                            }
                            button:hover {
                                background: #ff4757;
                            }

                            .list-container-header{
                                display: flex;
                                justify-content: space-between;
                            }
                            #form{
                                display: flex;
                                flex-direction: column;
                                gap: 1rem;
                                
                                
                            }
                            #form div{
                                display: flex;
                                justify-content: space-around;
                            }
                            .error-message{
                                color: red;
                                font-size: 1rem;
                                margin-top: 0.5rem;
                            }

                            * {
                                box-sizing: border-box;
                                margin: 0;
                                padding: 0;
                            }
                            

                            ul {
                                margin: 0;
                                padding: 0;
                            }

                            ul li{
                                list-style: none;
                            }
                            
                            #myUL li div{
                                display: flex;
                                flex-wrap: wrap;
                                gap: 5rem;
                                justify-content: space-around;
                                align-items: center;
                                background: rgba(255, 255, 255, 0.2);
                                border-radius: 5px;
                            
                            
                                
                                
                            }

                            #myUL li div:hover {
                                transform: translateY(-1px);
                            
                                background: rgba(255, 255, 255, 0.3);
                            }

                            #check-complete{
                                flex:1;
                            }

                            .title-value{
                                flex: 2;
                            }

                            .description-value{
                                flex: 3 ;
                            }

                            .precedence-value{
                                flex: 1 ;
                            }




                            #delete-btn{
                                line-height: 4rem;
                                flex: 1;
                                

                            }

                            #delete-btn:hover {
                                
                                color: #ff4757;
                                cursor: pointer;
                            }

                            #check-complete{
                                border-radius: 50%;
                            }

                            .list-container-header button{
                                width: 15rem;
                            }

                            `;
    document.head.appendChild(style);

};

    init();
})();
