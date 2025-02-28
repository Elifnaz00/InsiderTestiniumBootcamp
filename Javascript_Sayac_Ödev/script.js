let startBtn = document.querySelector(".start-btn");
let resetBtn = document.querySelector(".reset-btn");
let inputCountDownTime = document.querySelector("#countdown-time");
let time = document.querySelector("#time");
let alert = document.querySelector(".p-alert");


(() => {

    
let sayac= 0;
let myInterval= null;
   
    
    const startbuttonclick = () =>{

      
        
        sayac = Number(inputCountDownTime.value);

        if (isNaN(sayac) || sayac <= 0) {
            alert.innerHTML = "Lütfen geçerli bir pozitif sayı girin!";
            return;
        }

        inputCountDownTime.value="";
        alert.innerHTML = ""; 
        
        myInterval = setInterval(countTime, 1000);
         

    }
    
    const countTime = () => {
       
        time.innerHTML = `${sayac--}` ;
        sayaccontrol(sayac);
       
       
    }


    const sayaccontrol = (sayac) =>{
        if (sayac < 0) clearIntervalvalue("Süre doldu!");

    }



    const clearIntervalvalue = (mesaj) => {
       
        clearInterval(myInterval);
        alert.innerHTML = `${mesaj}`;
    

    }


    const resetbuttonclick = () =>{
        
        sayac= 0;
        time.innerHTML = `${sayac}` ;

        clearIntervalvalue("sayaç sıfırlandı!");
        
       

    }

    startBtn.addEventListener("click" , startbuttonclick);


    resetBtn.addEventListener("click" , resetbuttonclick);


  })();
  


