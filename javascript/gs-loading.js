// Variabili
let angoloRotazione = 45;

let blueCard = document.querySelector(".blue-single-card-wrapper");
let yellowCard = document.querySelector(".yellow-single-card-wrapper");
let greenCard = document.querySelector(".green-single-card-wrapper");
let redCard = document.querySelector(".red-single-card-wrapper");
let pinkCard = document.querySelector(".pink-single-card-wrapper");

let blueCardNoLabel = document.querySelector(".blue-card.cover.main-cover");
let yellowCardNoLabel = document.querySelector(".yellow-card.cover.main-cover");
let greenCardNoLabel = document.querySelector(".green-card.cover.main-cover");
let redCardNoLabel = document.querySelector(".red-card.cover.main-cover");
let pinkCardNoLabel = document.querySelector(".pink-card.cover.main-cover");

// Definizione array contenente le "MAIN CARDS"
const mainCards_blue = [blueCard, yellowCard, greenCard, redCard, pinkCard];

// Definizione degli angoli delle carte nel mazzo chiuso
let pinkAngle = 0;
let redAngle = '5deg';
let blueAngle = 0;
let yellowAngle = '-1deg';
let greenAngle = '3deg';

// Fan Positions (posizioni delle carte a ventaglio)
// Fan Positions ==| Center |==
let center_X = 0;
let center_Y = -80;
// Fan Positions ==> Inner <==
let inner_X = 190;
let inner_Y = -30;
let inner_deg = 20
// Fan Positions <== Outer ==>
let outer_X = 350;
let outer_Y = 80;
let outer_deg = 40;

let overable = true;

// Animazione che porta le carte al centro completata?
let animationToCenterComplete = false;

// Array per Animazioni che portano le carte "extra" al centro
let extraCardsToCenterAnimations = [];

// Animazioni che portano le MAIN CARDS al centro
// ===| Pink |===
let pinkToCenter = gsap.fromTo(pinkCard, {
    x: -500, // x di partenza
    y: -205, // y di partenza
    rotate: -15, // angolo di partenza
}, 
{
    x: 0, // x di arrivo
    y: 0, // y di arrivo
    rotate: pinkAngle, // angolo di arrivo
    duration: 1, // durata
    delay: 0.5, // ritardo
    ease: "power1.inOut", // easing
    paused: true, // animazione in pausa
});
// ===| Red |===
let redToCenter = gsap.fromTo(redCard, {
    x: 600,
    y: 205,
    rotate: 30,
},
{
    x: 0,
    y: 0,
    rotate: redAngle,
    duration: 1,
    delay: 0.5,
    ease: "power1.inOut",
    paused: true,
});
// ===| Blue |===
let blueToCenter = gsap.fromTo(blueCard, {
    x: 620,
    y: -300,
    rotate: -20,
},
{
    x: 0,
    y: 0,
    rotate: blueAngle,
    duration: 1,
    delay: 0.5,
    ease: "power1.inOut",
    paused: true,
});
// ===| Yellow |===
let yellowToCenter = gsap.fromTo(yellowCard, {
    x: -500,
    y: 300,
    rotate: -45,
},
{
    x: 0,
    y: 0,
    rotate: yellowAngle,
    duration: 1,
    delay: 0.5,
    ease: "power1.inOut",
    paused: true,
});
// ===| Green |===
let greenToCenter = gsap.fromTo(greenCard, {
    x: -50,
    y: -295,
    rotate: -45,
},
{
    x: 0,
    y: 0,
    rotate: greenAngle,
    duration: 1,
    delay: 0.5,
    ease: "power1.inOut",
    paused: true,
    onComplete: distributeFan, // Distribuisce le carte a ventaglio dopo averle centrate
});

// Animazione EXTRA CARDS
const extraCards = document.querySelectorAll(".extra");
// Posizioni e angoli di partenza delle carte extra
const extraCards_positions = [
    {x: gsap.utils.random(-850, -700, 1), y: gsap.utils.random(125, 100, 1), angle: gsap.utils.random(-15, -5, 1)}, // verde
    {x: gsap.utils.random(-50, 50, 1), y: gsap.utils.random(300, 400, 1), angle: gsap.utils.random(-80, 45, 5)},
    {x: gsap.utils.random(300, 400, 1), y: gsap.utils.random(0, 100, 1), angle: gsap.utils.random(-45, 45, 5)},
    {x: gsap.utils.random(725, 850, 1), y: gsap.utils.random(700, 700, 1), angle: gsap.utils.random(-45, 45, 5)},
    {x: gsap.utils.random(-400, -300, 1), y: gsap.utils.random(700, 700, 1), angle: gsap.utils.random(-45, 45, 5)},
    {x: gsap.utils.random(100, 300, 1), y: gsap.utils.random(600, 700, 1), angle: gsap.utils.random(-45, 45, 5)},
    {x: gsap.utils.random(200, 400, 1), y: gsap.utils.random(-450, -400, 1), angle: gsap.utils.random(-45, 45, 5)},
    {x: gsap.utils.random(-800, -700, 1), y: gsap.utils.random(-600, -550, 1), angle: gsap.utils.random(-45, -35, 5)}, // ok (gialla alto dx)
    {x: gsap.utils.random(600, 800, 1), y: gsap.utils.random(-700, -500, 1), angle: gsap.utils.random(-0, 0, 5)}, // rosa
    {x: gsap.utils.random(-500, -400, 1), y: gsap.utils.random(-700, -700, 1), angle: gsap.utils.random(-45, 45, 5)},
];
// Definizione delle animazioni per ciascuna carta extra e applicazione dei valori unici
for (var i = 0; i < extraCards.length; i++) {
    let extraCardToCenterAnimation = gsap.fromTo(extraCards[i], {
        // from = partenza
        x: extraCards_positions[i].x,
        y: extraCards_positions[i].y,
        rotate: extraCards_positions[i].angle,
    },
    {
        // to = arrivo
        x: 0,
        y: 0,
        rotate: 0,
        duration: 1,
        delay: 0.5,
        ease: "power1.inOut",
        paused: true,
        onComplete: hideExtraCards, // Nasconde le carte extra dopo averle centrate
    });
    // Push new animation to the array
    extraCardsToCenterAnimations.push(extraCardToCenterAnimation);
}

// ============  Animazioni ventaglio ============

// ===| Pink |===
let pink = gsap.to(pinkCard, {
    x: -outer_X,
    y: outer_Y,
    rotate: -outer_deg,
    duration: 1,
    delay: 0.5,
    ease: "back",
    paused: true,
});

// ===| Red |===
let red = gsap.to(redCard, {
    x: -inner_X,
    y: inner_Y,
    rotate: -inner_deg,
    duration: 1,
    delay: 0.5,
    ease: "back",
    paused: true,
});

// ===| Blue |===
let blue = gsap.to(blueCard, {
    x: center_X,
    y: center_Y,
    duration: 1,
    delay: 0.5,
    ease: "back",
    paused: true,
});

// ===| Yellow |===
let yellow = gsap.to(yellowCard, {
    x: inner_X,
    y: inner_Y,
    rotate: inner_deg,
    duration: 1,
    delay: 0.5,
    ease: "back",
    paused: true,
});

// ===| Green |===
let green = gsap.to(greenCard, {
    x: outer_X,
    y: outer_Y,
    rotate: outer_deg,
    duration: 1,
    delay: 0.5,
    ease: "back",
    paused: true,
    onComplete: enableMouse,
});

document.body.addEventListener("click", function() {
    centerFan();
});

// Run function when pressing Space on the keyboard
document.body.addEventListener("keydown", function(e) {
    if (e.code === 'Space') {
        centerFan();
    }
});

// Function to control the animation based on scroll position
function handleScroll() {
    let scrollPosition = window.scrollY;

    // If the scroll position is less than 500px and the animation to center is not complete
    if (scrollPosition < 500 && animationToCenterComplete == false) {
            // Adjust the Main Cards animations progress based on scroll position
            pinkToCenter.progress(scrollPosition / (document.documentElement.scrollHeight - window.innerHeight));
            redToCenter.progress(scrollPosition / (document.documentElement.scrollHeight - window.innerHeight));
            blueToCenter.progress(scrollPosition / (document.documentElement.scrollHeight - window.innerHeight));
            yellowToCenter.progress(scrollPosition / (document.documentElement.scrollHeight - window.innerHeight));
            greenToCenter.progress(scrollPosition / (document.documentElement.scrollHeight - window.innerHeight));
            //Adjust the animations of extra cards based on scroll position
            for (let i = 0; i < extraCardsToCenterAnimations.length; i++) {
                extraCardsToCenterAnimations[i].progress(scrollPosition / (document.documentElement.scrollHeight - window.innerHeight));
            }
    } else { // If the scroll position is more than 500px and the animation to center is not complete
        // Run the function to center the cards and complete the animation
        centerFan();
    }
}

// Event listener for scroll
window.addEventListener('scroll', handleScroll);

// Funzione che centra le carte nella pagina
function centerFan() {
    pinkToCenter.play();
    redToCenter.play();
    blueToCenter.play();
    yellowToCenter.play();
    greenToCenter.play();
    // Loop che fa partire le animazioni delle carte extra
    for (var i = 0; i < extraCardsToCenterAnimations.length; i++) {
        extraCardsToCenterAnimations[i].play();
    };
}
// Le card extra spariscono
function hideExtraCards() {
    extraCards.forEach(function(card) {
        card.style.display = "none";
    });
}

// Funzione che distribuisce le carte a ventaglio nella pagina
function distributeFan() {
    console.log("Running distributeFan() function...");
    animationToCenterComplete = true;
    pink.play();
    red.play();
    green.play();
    blue.play();
    yellow.play();   
    // Remove class "cat-title-hidden" from all elements with class "cat-title"
    let catTitles = document.querySelectorAll(".cat-title");
    catTitles.forEach(function(catTitle) {
        catTitle.classList.remove("cat-title-hidden");
    });

}

// Funzione che abilita il mouse nella pagina
function enableMouse() {
    document.body.style.pointerEvents = 'all';
    console.log('Mouse enabled');
}

function disableMouse() {
    document.body.style.pointerEvents = 'none';
    console.log('Mouse disabled');
}


//    HH   HH  OOOOO  VV     VV EEEEEEE RRRRRR  
//    HH   HH OO   OO VV     VV EE      RR   RR 
//    HHHHHHH OO   OO  VV   VV  EEEEE   RRRRRR  
//    HH   HH OO   OO   VV VV   EE      RR  RR  
//    HH   HH  OOOO0     VVV    EEEEEEE RR   RR                             

// ============================================================
// ===== Animazioni all'HOVER delle card [nella fan view] =====
// ============================================================     

// Variabili labels
const catTitleAnimationStartY = -200;
const catTitleAnimationEndY = -260;

// Blue card rises
let enterBlue = gsap.to(blueCard, { // Animazione card blu
    paused: true,
    y: -125,
    duration: 0.3,
    ease: "power3",
})

// Blue vector rotates
let rotateBlue = gsap.to(".blue-vector", { // Animazione vettore blu
    paused: true,
    rotate: angoloRotazione,
    duration: 0.4,
})

// blue-cat-title slides out animation
let blueCatTitle = gsap.fromTo(".blue-cat-title", {
    y: catTitleAnimationStartY,
}, {
    paused: true,
    y: catTitleAnimationEndY,
    duration: 0.2,
    ease: "power3",
})

// On BLUE over
blueCard.addEventListener("mouseenter", function() {
    if (overable === true) {
        enterBlue.play(); // Animazione card
        rotateBlue.play(); // Animazione vettore blu
        blueCatTitle.play(); // Animazione titolo
        logoAnimation.goToAndStop(blueLogoKeyframe, true); // Animazione logo blu (stop)
    }
});

blueCard.addEventListener("mouseleave", function() {
    if (overable === true) {
        enterBlue.reverse(); // Animazione card (reverse)
        rotateBlue.reverse(); // Animazione vettore blue (reverse)
        blueCatTitle.reverse(); // Animazione titolo (reverse)
        logoAnimation.play(); 
    }
});

// YELLOW

// Yellow card rises
let enterYellow = gsap.to(yellowCard, {
    paused: true,
    x: '+='+Math.cos(20)*60, 
    y: '-='+Math.sin(20)*60,
    duration: 0.3,
    ease: "power3",
});

// Yellow vector rotates
let rotateYellow = gsap.to(".yellow-vector", { // Animazione vettore blu
    paused: true,
    rotate: angoloRotazione,
    duration: 0.4,
})

// yellow-cat-title slides out animation
let yellowCatTitle = gsap.fromTo(".yellow-cat-title", {
    y: catTitleAnimationStartY,
}, {
    paused: true,
    y: catTitleAnimationEndY,
    duration: 0.2,
})

// On YELLOW over (event listeners)
yellowCard.addEventListener("mouseenter", function() {
    if (overable === true) {
        enterYellow.play();
        rotateYellow.play();
        yellowCatTitle.play();
        logoAnimation.goToAndStop(yellowLogoKeyframe, true); // Animazione logo giallo (stop)
    }
});
yellowCard.addEventListener("mouseleave", function() {
    if (overable === true) {   
        enterYellow.reverse();
        rotateYellow.reverse();
        yellowCatTitle.reverse();
        logoAnimation.play(); 
    }
});

// GREEN

// Green card rises
let enterGreen = gsap.to(greenCard, {
    paused: true,
    y: '-='+Math.sin(40)*60, 
    x: '-='+Math.cos(40)*60, 
    duration: 0.3,
    ease: "power3",
})

// Green vector rotates
let rotateGreen = gsap.to(".green-vector", { // Animazione vettore blu
    paused: true,
    rotate: angoloRotazione,
    duration: 0.4,
})

// green-cat-title slides out animation
let greenCatTitle = gsap.fromTo(".green-cat-title", {
    y: catTitleAnimationStartY,
}, {
    paused: true,
    y: catTitleAnimationEndY,
    duration: 0.2,
    ease: "power3",
})

// On GREEN over (event listeners)
greenCard.addEventListener("mouseenter", function() {
    if (overable === true) {
        enterGreen.play();
        rotateGreen.play();
        greenCatTitle.play();
        logoAnimation.goToAndStop(greenLogoKeyframe, true); // Animazione logo verde (stop)
    }
});

greenCard.addEventListener("mouseleave", function() {
    if (overable === true) {
        enterGreen.reverse();
        rotateGreen.reverse();
        greenCatTitle.reverse();
        logoAnimation.play(); 
    }
});



// RED

// Red card rises
let enterRed = gsap.to(redCard, {
    paused: true,
    y: '-='+Math.sin(20)*60, 
    x: '-='+Math.cos(20)*60, 
    duration: 0.3,
    ease: "power3",
});

// Red vector rotates
let rotateRed = gsap.to(".red-vector", { // Animazione vettore blu
    paused: true,
    rotate: angoloRotazione,
    duration: 0.4
});
 
// red-cat-title slides out animation
let redCatTitle = gsap.fromTo(".red-cat-title", {
    y: catTitleAnimationStartY,
}, {
    paused: true,
    y: catTitleAnimationEndY,
    duration: 0.2,
    ease: "power3",
})

// On RED over (event listeners)
redCard.addEventListener("mouseenter", function() {
    if (overable === true) {
        enterRed.play();
        rotateRed.play();
        redCatTitle.play();
        logoAnimation.goToAndStop(redLogoKeyframe, true); // Animazione logo rosso (stop)
    }
});

redCard.addEventListener("mouseleave", function() {
    if (overable === true) {
        enterRed.reverse();
        rotateRed.reverse();
        redCatTitle.reverse();
        logoAnimation.play(); 
    }
});

// PINK

// Pink card rises
let enterPink = gsap.to(pinkCard, {
    paused: true,
    y: '-='+Math.sin(40)*60, 
    x: '+='+Math.cos(40)*60, 
    duration: 0.3,
    ease: "power3",
});

// Pink vector rotates
let rotatePink = gsap.to(".pink-vector", { // Animazione vettore blu
    paused: true,
    rotate: angoloRotazione,
    duration: 0.4
});

// pink-cat-title slides out animation
let pinkCatTitle = gsap.fromTo(".pink-cat-title", {
    y: catTitleAnimationStartY,
}, {
    paused: true,
    y: catTitleAnimationEndY,
    duration: 0.2,
    ease: "power3",
})

// On PINK over (event listeners)
pinkCard.addEventListener("mouseenter", function() {
    if (overable === true) {
        enterPink.play();
        rotatePink.play();
        pinkCatTitle.play();
        logoAnimation.goToAndStop(pinkLogoKeyframe, true); // Animazione logo pink (stop)
    }
});
pinkCard.addEventListener("mouseleave", function() {
    if (overable === true) {
        enterPink.reverse();
        rotatePink.reverse();
        pinkCatTitle.reverse();
        logoAnimation.play(); 
    }
});



// ON CLICK

//   OOOOO  NN   NN    CCCCC  LL      IIIII  CCCCC  KK  KK 
//  OO   OO NNN  NN   CC      LL       III  CC      KK KK  
//  OO   OO NN N NN   CC      LL       III  CC      KKKK   
//  OO   OO NN  NNN   CC      LL       III  CC      KK KK  
//   OOOO0  NN   NN    CCCCC  LLLLLLL IIIII  CCCCC  KK  KK 

// Click on blue category

blueCard.addEventListener("click", function() {
    console.log("Blue was clicked.")
    let blueClicked = gsap.to([pinkCard, redCard, yellowCard, greenCard], {
        opacity: 0,
        y: 9000,
        paused: true,
        duration: 2,
    })

    let blueScaleUp = gsap.to(blueCardNoLabel, {
        scale: 1.25,
        x: 0,
        y: 125,
        rotate: 0,
        duration: 1,
        ease: "back",
        paused: true,
        onComplete: goToPage("blue"),
    })

    let blueCatTitle = document.querySelector(".blue-cat-title");
    let blueCatTitleAnimation = gsap.to(blueCatTitle, {
        color: "#4E7BBE",
        'font-size': '130px',
        'font-variation-settings': "'srff' 0, 'wght' 550",
        opacity: .2,
        y: -175, // questo è il risultato di un conto del cazzo -300 + 125 = -175
        margin: 0,
        duration: .8,
        ease: "back",
        paused: true,
        onComplete: d => {console.log("Animation completed.")}
    })

    
    overable = false;
    
    blueClicked.play();
    blueScaleUp.play();
    blueCatTitleAnimation.play();
});

// Click on yellow category

yellowCard.addEventListener("click", function() {
    console.log("Blue was clicked.")
    let yellowClicked = gsap.to([pinkCard, redCard, blueCard, greenCard], {
        opacity: 0,
        y: 9000,
        paused: true,
        duration: 2,
    })

    let yellowResetPosition = gsap.to(yellowCard, {
        y: -125,
        x: center_X,
        rotate: 0,
        duration: 1.2,
        paused: true,
        ease: "back",
    })

    let yellowScaleUp = gsap.to(yellowCardNoLabel, {
        scale: 1.25,
        x: 0,
        y: 125,
        rotate: 0,
        duration: 1,
        ease: "back",
        paused: true,
        onComplete: goToPage("yellow"),
    })

    let yellowCatTitle = document.querySelector(".yellow-cat-title");
    let yellowCatTitleAnimation = gsap.to(yellowCatTitle, {
        color: "#F2BE58",
        'font-size': '130px',
        'font-variation-settings': "'srff' 0, 'wght' 550",
        opacity: .2,
        y: -175, // questo è il risultato di un conto del cazzo -300 + 125 = -175
        margin: 0,
        duration: .8,
        ease: "back",
        paused: true,
        onComplete: d => {console.log("Animation completed.")}
    })

    
    overable = false;
    
    yellowClicked.play();
    yellowResetPosition.play();
    yellowScaleUp.play();
    yellowCatTitleAnimation.play();
});

// Click on green category

greenCard.addEventListener("click", function() {
    console.log("Green was clicked.")
    overable = false;
    // disableMouse();

    let greenClicked = gsap.to([pinkCard, redCard, yellowCard, blueCard], {
        opacity: 0,
        y: 9000,
        paused: true,
        duration: 2,
    })

    let greenResetPosition = gsap.to(greenCard, {
        y: -125,
        x: center_X,
        rotate: 0,
        duration: 1.2,
        paused: true,
        ease: "back",
    })

    let greenScaleUp = gsap.to(greenCardNoLabel, {
        scale: 1.25,
        y: 125,
        duration: .8,
        ease: "back",
        paused: true,
        onComplete: goToPage("green"),
    })

    let greenCatTitle = document.querySelector(".green-cat-title");
    let greenCatTitleAnimation = gsap.to(greenCatTitle, {
        color: "#72C0A2",
        'font-size': '130px',
        'font-variation-settings': "'srff' 0, 'wght' 550",
        opacity: .2,
        y: -175, // questo è il risultato di un conto del cazzo -300 + 125 = -175
        margin: 0,
        duration: .8,
        ease: "back",
        paused: true,
        onComplete: d => {console.log("Animation completed.")}
    })

    greenClicked.play();
    greenScaleUp.play();
    greenResetPosition.play();
    greenCatTitleAnimation.play();
});

// Click on red category

redCard.addEventListener("click", function() {
    console.log("Green was clicked.")
    overable = false;
    // disableMouse();

    let redClicked = gsap.to([pinkCard, greenCard, yellowCard, blueCard], {
        opacity: 0,
        y: 9000,
        paused: true,
        duration: 2,
    })

    let redResetPosition = gsap.to(redCard, {
        y: -125,
        x: center_X,
        rotate: 0,
        duration: 1.2,
        paused: true,
        ease: "back",
    })

    let redScaleUp = gsap.to(redCardNoLabel, {
        scale: 1.25,
        y: 125,
        duration: .8,
        ease: "back",
        paused: true,
        onComplete: goToPage("red"),
    })

    let redCatTitle = document.querySelector(".red-cat-title");
    let redCatTitleAnimation = gsap.to(redCatTitle, {
        color: "#ED6D44",
        'font-size': '130px',
        'font-variation-settings': "'srff' 0, 'wght' 550",
        opacity: .2,
        y: -175, // questo è il risultato di un conto del cazzo -300 + 125 = -175
        margin: 0,
        duration: .8,
        ease: "back",
        paused: true,
        onComplete: d => {console.log("Animation completed.")}
    })

    redClicked.play();
    redScaleUp.play();
    redResetPosition.play();
    redCatTitleAnimation.play();
});

// Click on pink category

pinkCard.addEventListener("click", function() {
    console.log("Pink was clicked.")
    overable = false;
    // disableMouse();

    let pinkClicked = gsap.to([redCard, greenCard, yellowCard, blueCard], {
        opacity: 0,
        y: 9000,
        paused: true,
        duration: 2,
    })

    let pinkResetPosition = gsap.to(pinkCard, {
        y: -125,
        x: center_X,
        rotate: 0,
        duration: 1.2,
        paused: true,
        ease: "back",
    })

    let pinkScaleUp = gsap.to(pinkCardNoLabel, {
        scale: 1.25,
        y: 125,
        duration: .8,
        ease: "back",
        paused: true,
        onComplete: goToPage("pink"),
    })

    let pinkCatTitle = document.querySelector(".pink-cat-title");
    let pinkCatTitleAnimation = gsap.to(pinkCatTitle, {
        color: "#F3A0B9",
        'font-size': '130px',
        'font-variation-settings': "'srff' 0, 'wght' 550",
        opacity: .2,
        y: -175, // questo è il risultato di un conto del cazzo -300 + 125 = -175
        margin: 0,
        duration: .8,
        ease: "back",
        paused: true,
        onComplete: d => {console.log("Animation completed.")}
    })

    pinkClicked.play();
    pinkScaleUp.play();
    pinkResetPosition.play();
    pinkCatTitleAnimation.play();
});

function goToPage(color) {

    console.log("Cambio pagina")
    setTimeout(() => {
        if (color === "blue") {
            console.log("Navigate to blue.")
            window.location.href = "blue-deck.html";
        } else if (color === "yellow") {
            console.log("Navigate to yellow.")
            window.location.href = "yellow-deck.html";
        } else if (color === "green") {
            console.log("Navigate to green.")
            window.location.href = "green-deck.html";
        } else if (color === "red") {
            console.log("Navigate to red.")
            window.location.href = "red-deck.html";
        } else if (color === "pink") {
            console.log("Navigate to pink.")
            window.location.href = "pink-deck.html";
        }
    },
    1500);
}

// Logo animation

// keyframes
var blueLogoKeyframe = 313;
var greenLogoKeyframe = 32;
var pinkLogoKeyframe = 90;
var yellowLogoKeyframe = 248;
var redLogoKeyframe = 190;
var whiteLogoKeyframe = 136;

var logoAnimation = bodymovin.loadAnimation({
    container: document.getElementById('animatedLogoContainer'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'res/logo/animatedLogo_puntoColorato.json'
});