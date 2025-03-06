$(document).ready(function () {
    let start = 0;
    let limit = 5;
    let errorMessage= "";

    function getPost() {
        

        $.get(`https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`)
            .done(function (data) {
               

                data.forEach(element => {
                    const htmlContent = `
                        <div class="post-card">
                            <div class="post-header">
                                <p>${element.id}</p>
                                <h2>${element.title}</h2>
                            </div>
                            <p>${element.body}</p>
                        </div>
                    `;

                    $("#container-posts").append(htmlContent);
                });

              
            })
            .fail(function (xhr) {
                errorMessage= `İstek başarısız oldu! Hata Kodu: ${xhr.status}`;
                showError("#alertError", errorMessage, xhr.statusText); 
                
            })
          
    }

    getPost(); 

    $(window).on("scroll", debounce(function () {
        if ($(window).scrollTop() + $(window).height() >= $(document).height() - 50) {

            start += limit; 
            limit= 95;

            getPost();
        }
    }, 800));

    function debounce(func, wait) {
        let timeout;
        return function () {
            clearTimeout(timeout);
            timeout = setTimeout(func, wait);
        };
    }

    function showError(target, error, xhr) {
        const html = `
            <div class="alert">
                <span class="closebtn">&times;</span>
                <strong>${xhr}!</strong> ${error}
            </div>
        `;
        $(target).prepend(html);
    }

    $(document).on("click", ".closebtn", function () {
        $(this).parent().remove();
    });

});

