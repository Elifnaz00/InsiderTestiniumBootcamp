$(document).ready(function() {

    
    const jsonData={
        "studentData" : [
        {
           
            name: "Elifnaz",
            surname: "Demir", 
            class: "A",
            matematik: 80,
            türkçe: 90,
            fen: 100,
          

            
        },
        {
         
            name: "Ali",
            surname: "Duman",
            class: "B",
            matematik: 20,
            türkçe: 40,
            fen: 100,
           
          
        },
        {
       
            name: "Mehmet",
            surname: "Soylu",
            class: "A", 
            matematik: 80,
            türkçe: 50,
            fen: 100,
           
          
        }
    
    ]
    };
    
    
const addStudent = () => {
    
    $('#student-table tbody tr').remove();

    jsonData.studentData.forEach((item,index) => {
        
        const htmlContent = `
       
             <tr>
                <td>${item.name}</td>
                <td>${item.surname}</td>
                <td>${item.class}</td>
                <td>${item.matematik}</td>
                <td>${item.türkçe}</td>
                <td>${item.fen}</td>
               
              

                <td><button class="remove-student-btn" data-index="${index}"> Öğrenci Sil </button><td>
            </tr>
             
         `
         $('#student-table tbody').append(htmlContent);

    })

}
addStudent();  

       
    

$("#add-student-form").submit(function(e) {
    e.preventDefault();
  


    const student= {
        name : $("#student-name").val(),
        surname : $("#student-surname").val(),
        class : $("#student-class").val(),
        
        matematik: parseInt($("#math-grade").val()),
        türkçe: parseInt($("#turkish-grade").val()),
        fen: parseInt($("#science-grade").val()),
       
       
    } 

    jsonData.studentData.push(student);
    $('#student-name, #student-surname, #student-class').val("");

    addStudent();

   
});


$(document).on("click", ".remove-student-btn", function() {
    const index = $(this).data("index");
    jsonData.studentData.splice(index, 1); 
    addStudent(); 
}); 

/*
$(".remove-student-btn").click(function() {
    $(this).closest("tr").remove();
}) 
    */

$(document).on("click", "tr", function() { 
    $(this).css("background-color", "yellow");
 });



$(":input").on({
    focus: function() {
        $(this).css("background-color", "lightblue");
    },
    blur: function() {
        $(this).css("background-color", "white");
    }
})

$("[data-grade]").on("keypress", function(e) {
    if (e.which >= 48 && e.which <= 57) { // Sadece rakamlara izin ver
        $(".alert-span").text("").css("color", "black");
    } else {
        e.preventDefault();
        $(".alert-span")
            .text("Lütfen sadece sayı giriniz!")
            .css("color", "red");
    }
});



const buildCss = () => {
    const cssContent =  `
    body{
        margin: 0;
        padding: 0;
    }

    
    
    .main-container{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        
    }

    table th, td {
        
        padding: 20px;
    }


    .table-container{
        display: flex;
        flex-direction: column;
        gap: 5rem;
    }
    #add-student-form{
        display: flex;
        flex-direction: column;
        width: 50%;
        margin: 0 auto;
        gap: 10px;
    }
        
        `
        
   $("style").html(cssContent);
}
buildCss();








});

