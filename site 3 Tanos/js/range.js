let slider= document.getElementById("range");
let output= document.getElementById("value");

output.innerHTML = slider.value;

slider.oninput = function () {
    output.innerHTML = this.value;
}

slider.addEventListener("input",function(){
    let x = slider.value;
    let color =`linear-gradient(90deg, #BE69D5 ${x-22}%, #BAF1FF ${x-22}%)`;
    slider.style.background = color;
})

