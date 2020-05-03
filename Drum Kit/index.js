let numberOfDrums = document.querySelectorAll(".drum").length;
    

for (var i = 0; i < numberOfDrums; i++) {

    let allBtn = document.querySelectorAll(".drum")[i];
        allBtn.addEventListener("click", function() {
        let buttonInnerHTML = this.innerHTML;
        makeSound(buttonInnerHTML);
        buttonAnimation(buttonInnerHTML);
        });   
}

document.addEventListener("keydown", function(event){
    let pressKey = event.key;
    makeSound(pressKey);
    buttonAnimation(pressKey);   
});

function makeSound(key) {
    switch (key) {
        case "w":
            let audio = new Audio("sounds/crash.mp3");
            audio.play(1);
            break;

        case "a":
            let audio1 = new Audio("sounds/kick-bass.mp3");
            audio1.play();
            break;

        case "s":
            let audio2 = new Audio("sounds/snare.mp3");
            audio2.play();
            break;

        case "d":
            let audio3 = new Audio("sounds/tom-1.mp3");
            audio3.play();
            break;

        case "j":
            let audio4 = new Audio("sounds/tom-2.mp3");
            audio4.play();
            break;
        
        case "k":
            let audio5 = new Audio("sounds/tom-3.mp3");
            audio5.play();
            break;

        case "l":
            let audio6 = new Audio("sounds/tom-4.mp3");
            audio6.play();
            break;

        default:
    }
}

function buttonAnimation(currentKey) {
    var activeButton = document.querySelector("." + currentKey);
        activeButton.classList.add("pressed");
        setTimeout(function(){
            activeButton.classList.remove("pressed");
        }, 100);
}