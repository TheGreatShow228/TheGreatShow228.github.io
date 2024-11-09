document.querySelector(".menu_link_up").addEventListener("click", function (){
    document.querySelector(".menu_list-open" ).classList.toggle("menu_list-hidden");
    document.querySelector(".close_img" ).classList.toggle("close_img-hidden");
    if (document.querySelector(".close_img-hidden" ) !== null) {
    } else {
            document.querySelector(".menu_link_up").addEventListener("click", function (){
                document.querySelector(".close_img" ).classList.toggle("close_img-hidden");
            })
        }
})
document.querySelector(".close_img").addEventListener("click", function (){
    document.querySelector(".menu_list-open" ).classList.toggle("menu_list-hidden");
})

document.querySelector(".menu_link_up-price").addEventListener("click", function (){
    document.querySelector(".menu_list-open-price" ).classList.toggle("menu_list-hidden-price");
})

document.querySelector(".menu_link_up-price").addEventListener("click", function (){
    document.querySelector(".close_img-price" ).classList.toggle("close_img-hidden-price");
    if (document.querySelector(".close_img-hidden-price" ) !== null) {
    } else {
        document.querySelector(".menu_link_up-price").addEventListener("click", function (){
            document.querySelector(".close_img-price" ).classList.toggle("close_img-hidden-price");
        })
    }
})

document.querySelector(".menu_link_up-price").addEventListener("", function (){
    document.querySelector(".close_img-hidden-price" ).classList.toggle("close_img-price");
})

document.querySelector(".close_img-price").addEventListener("click", function (){
    document.querySelector(".menu_list-open-price" ).classList.toggle("menu_list-hidden-price");
})

