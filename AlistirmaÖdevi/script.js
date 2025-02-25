
//Collatz Dizisi 
//-- i ye başlangıç değeri olarak verdiğim her değerde 1 ile sonlanıyor.

var i = 13;
while(i > 0 && i >= 2)
{
    console.log(i);
    
    if(i % 2 == 0)
    {
        i /=  2; 

    }
    else {
        i = i*3+ 1;
    }
   
    
}
