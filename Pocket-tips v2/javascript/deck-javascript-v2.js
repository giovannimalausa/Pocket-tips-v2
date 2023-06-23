// Pulsanti (frecce) per navigazione
const buttonRight = document.querySelector('.button-right');
const buttonLeft = document.querySelector('.button-left');

// Card
let card0 = document.querySelector(".card-0");
let card1 = document.querySelector(".card-1");
let card2 = document.querySelector(".card-2");
let card3 = document.querySelector(".card-3");
let card4 = document.querySelector(".card-4");
let card5 = document.querySelector(".card-5");
let card6 = document.querySelector(".card-6");

// Posizioni predefinite, senza unità di misura
let position_0_x_value = 0; 
let position_1_x_value = 24;
let position_2_x_value = 46;
let position_3_x_value = 65;
let position_4_x_value = '-'+position_3_x_value;
let position_5_x_value = '-'+position_2_x_value;
let position_6_x_value = '-'+position_1_x_value;

// Posizioni predefinite
let card0_x = position_0_x_value + 'vw'; 
let card1_x = position_1_x_value + 'vw';
let card2_x = position_2_x_value + 'vw';
let card3_x = position_3_x_value + 'vw';
let card4_x = '-'+card3_x;
let card5_x = '-'+card2_x;
let card6_x = '-'+card1_x;

// Angoli predefiniti
let card0_deg = 0; // center
let card1_deg = 0.93; // right
let card2_deg = -1.32; // far right
let card3_deg = 21;
let card4_deg = 0;
let card5_deg = 1.85; // far left
let card6_deg = -1.64; // left

// Carousel states
let cardZeroPosition = 0;
let calculatedPosition = 0;

// Arrays
const deck = [card0, card1, card2, card3, card4, card5, card6];
const deckPositions_X = [card0_x, card1_x, card2_x, card3_x, card4_x, card5_x, card6_x];
const deckPositions_deg = [card0_deg, card1_deg, card2_deg, card3_deg, card4_deg, card5_deg, card6_deg];

// Small-icons in the deck cards
let smallIcons = document.querySelectorAll('.small-icon');

// Custom cursor
let cursor = document.getElementById('cursor');
let cursorRight = document.querySelector('.cursor-right');
let cursorLeft = document.querySelector('.cursor-left');
let cursorCat = document.querySelector('.cursor-cat');

// Shows cards on load
function showCards() {
    deck.forEach((card) => {
        card.classList.remove('hidden-card');
    });

    for (let i = 0; i < deck.length; i++) {
        const card = deck[i];
        const card_X = deckPositions_X[i];
        const card_deg = deckPositions_deg[i];
        
        gsap.to(card, {
            x: card_X,
            rotate: card_deg,
            duration: 1,
            ease: 'back',
        })

        // change opacity of cards with i = 2 or 5
        if (i === 2 || i === 5) {
            gsap.to(card, {
                opacity: 0.4,
                duration: 0.5,
            })
        } else { // reset opacity of other cards to 1
            gsap.to(card, {
                opacity: 1,
                duration: 0.5,
            })
        }
    }
    document.body.style.pointerEvents = 'all';
    console.log('Mouse unlocked');
}
showCards();

// Menu animation
let menuButton = document.querySelector('.menu-button');

function showMenuButton() {
    let showMenuAnimation = gsap.fromTo(menuButton, {
        opacity: 0,
        x: 20,
    }, {opacity: 1,
        x: 0,
        duration: 1,
        ease: 'back',
    });
    showMenuAnimation.play();
}
showMenuButton();

// Defining what happens when clicking on cards
for (let i = 0; i < deck.length; i++) {
    const card = deck[i];

    // Add a click event listener to each card
    card.addEventListener('click', function clickOnCard() {
        if (card.classList.contains('cliccabile')) {
            console.log("Opening card...");
            window.alert("Qui si passerà alla pagina di contenuto fatta con Elementor, yeee 😆🔫");
        } else if (card.classList.contains('avanza')) {
            console.log("Clicked on the rightmost visibile Card -> Runinng navigateRight()...");
            navigateRight();
        } else if (card.classList.contains('retrocedi')) {
            console.log("Clicked on the leftmost visibile Card -> Runinng navigateLeft()...");
            navigateLeft();
        }
    });
};


// Pointer Event => All // Manualmente, premendo M
document.addEventListener('keydown', function(event) {
    if (event.key === 'm' || event.key === 'M') {
        document.body.style.pointerEvents = 'all';
        console.log('Mouse unlocked');
        nextCard();
    }
});

// Using GSAP to scale up all the img elements with the class 'vector' to 20 times their original size
let vector = document.querySelectorAll('.vector');

let vectorScale = gsap.to(vector, {
    delay: .3,
    scale: 8,
    duration: 1,
    rotate: 180,
    ease: 'back',
    onComplete: switchToFace, 
});

function switchToFace() {
    deck.forEach((card) => {
        // Add the class 'face-wrapper' to child element that already has the class 'face'
        card.children[0].classList.add('hide');
        // Avoid card flashing blue
        card.style.backgroundColor = 'var(--light-background)'; 
        // Show the face of the card
        card.children[1].classList.add('show');
        // Fade in the face of the card
        gsap.to(card.children[1], {
            opacity: 1,
            duration: 0.5,
        })        
    });
};


// Click on the right button to navigate right
buttonRight.addEventListener('click', navigateRight);

// Use the arrow keys to navigate right and left
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
        navigateRight();
    } else if (event.key === 'ArrowLeft') {
        navigateLeft();
    }
});

// Function that manages the navigation to the right
function navigateRight() {
    console.log('Navigate right');

    // Play animation of small icons
    rotateSmallIconsRight.restart();

    for (let i = 0; i < deck.length; i++) {
        const card = deck[i];

        calculatedPosition = i-1+cardZeroPosition;
        // if calculatedPosition is negative, add 7 to it
        if (calculatedPosition < 0) {
            calculatedPosition += 7;
        } else if (calculatedPosition > 6) {
            calculatedPosition -= 7;
        }
        const card_X = deckPositions_X[calculatedPosition];
        const card_deg = deckPositions_deg[calculatedPosition];
        
        gsap.to(card, {
            x: card_X,
            rotate: card_deg,
            duration: 1,
            ease: 'back',
        })

        // Hide card with calculatedPosition = 3
        if (calculatedPosition === 3) {
            gsap.to(card, {
                opacity: 0,
                duration: 0.1,
                // onComplete: resetOpacity,
            })
        }

        // Scale up card with calculatedPosition = 0, else scale down to 1x
        if (calculatedPosition === 0) {
            gsap.to(card, {
                scale: 1.25,
                duration: 0.3,
            })
        } else {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
            })
        }

        // change opacity of cards with calculatedPosition = 2 or 5 & ≠ 3
        if (calculatedPosition === 2 || calculatedPosition === 5 && calculatedPosition !== 3) {
            gsap.to(card, {
                opacity: 0.4,
                duration: 1,
                ease: 'power3'
            })
        } else if (calculatedPosition !== 3) { // reset opacity of other cards (with calculatedPosition ≠3) to 1
            gsap.to(card, {
                opacity: 1,
                duration: 1,
                ease: 'power3'
            })
        }

        // Setting the classes for the managing the cursors on hover
        setHoveringClasses(card, calculatedPosition);

        console.log("i = " + i + ", calculatedPosition = "+calculatedPosition);
    }
    cardZeroPosition -=1;
    if (cardZeroPosition === -7) {
        console.log("Reset cardZeroPosition => 0");
        cardZeroPosition = 0;
    }
    console.log("cardZeroPosition = "+cardZeroPosition);
}

function setHoveringClasses(card, calculatedPosition) {
    // Add class "cliccabile" to cards with calculatedPosition = 6, 0 or 1
    if (calculatedPosition === 6 || calculatedPosition === 0 || calculatedPosition === 1) {
        card.classList.add('cliccabile');
        card.classList.remove('avanza');
    } else if (calculatedPosition === 2) {
        card.classList.remove('cliccabile');
        card.classList.remove('retrocedi');
        card.classList.add('avanza');
        console.log("Add class 'avanza' to card with calculatedPosition = 2");
    } else if (calculatedPosition === 5) {
        card.classList.remove('cliccabile');
        card.classList.remove('avanza');
        card.classList.add('retrocedi');
        console.log("Add class 'retrocedi' to card with calculatedPosition = 5");

    } else { // Remove class from other cards
        card.classList.remove('cliccabile');
    }
}

// Click on the left button to navigate left
buttonLeft.addEventListener('click', navigateLeft);

// Function that manages the navigation to the left
function navigateLeft() {
    console.log('Navigate left');

    // Play animation of small icons
    rotateSmallIconsLeft.restart();

    for (let i = 0; i < deck.length; i++) {
        const card = deck[i];

        calculatedPosition = i+1+cardZeroPosition;

        // If calculatedPosition is greater than 6, subtract 7 from it
        if (calculatedPosition > 6) {
            calculatedPosition -= 7;
        } else if (calculatedPosition < 0) {
            calculatedPosition += 7;
        }

        const card_X = deckPositions_X[calculatedPosition];
        const card_deg = deckPositions_deg[calculatedPosition];

        gsap.to(card, {
            x: card_X,
            rotate: card_deg,
            duration: 1,
            ease: 'back',
        })

        if (calculatedPosition === 4) {
            gsap.to(card, {
                opacity: 0,
                duration: 0.1,
                // onComplete: resetOpacity,
                })
        }

        // change opacity of cards with calculatedPosition = 2 or 5 & ≠ 4
        if (calculatedPosition === 2 || calculatedPosition === 5 && calculatedPosition !== 4) {
            gsap.to(card, {
                opacity: 0.4,
                duration: 0.5,
                ease: 'power1.inOut'
            })
        } else if (calculatedPosition !== 4) { // reset opacity of other cards (with calculatedPosition ≠4) to 1
            gsap.to(card, {
                opacity: 1,
                duration: 0.5,
                ease: 'power1.inOut'
            })
        }

        // Add class "cliccabile" to cards with calculatedPosition = 6, 0 or 1
        if (calculatedPosition === 6 || calculatedPosition === 0 || calculatedPosition === 1) {
            card.classList.add('cliccabile');
        } else { // Remove class from other cards
            card.classList.remove('cliccabile');
        }

        // Scale up card with calculatedPosition = 0, else scale down to 1x
        if (calculatedPosition === 0) {
            gsap.to(card, {
                scale: 1.25,
                duration: 0.3,
            })
        } else {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
            })
        }
        
        // Setting the classes for the managing the cursors on hover
        setHoveringClasses(card, calculatedPosition);

        console.log("i = " + i + ", calculatedPosition = "+calculatedPosition);
    }
    cardZeroPosition +=1;
    if (cardZeroPosition === 7) {
        console.log("Reset cardZeroPosition => 0");
        cardZeroPosition = 0;
    }
    console.log("cardZeroPosition = "+cardZeroPosition);
}

// Reset cards opacity to 1 after 0.2 seconds
function resetOpacity() {
    setTimeout(function() {
    deck.forEach((card) => {
        card.style.opacity = 1;
    });
    console.log('Opacity reset');
    }, 200);
}

// Custom cursor definition
window.addEventListener('mousemove', (event) => {
    let cursorOffsetX = cursor.getBoundingClientRect().width / 2;
    let cursorOffsetY = cursor.getBoundingClientRect().height / 2;
    cursor.style.left = event.clientX - cursorOffsetX + 'px';
    cursor.style.top = event.clientY - cursorOffsetY + 'px';
});

// Add custom cursor when hovering on cards
for (let i = 0; i < deck.length; i++) {
    const card = deck[i];

    // Add a hover event listener to each card
    card.addEventListener('mouseover', function hoverOnCard() {
        console.log('Hover on card');
        cursor.style.opacity = 1;

        // Manage cursors by looking at card class list
        if (this.classList.contains('cliccabile')) {
            cursor.style.opacity = 1;
            // Hide cat cursor
            cursorCat.style.display = 'block';
            // Hide left cursor
            cursorLeft.style.display = 'none';
            // Hide right cursor
            cursorRight.style.display = 'none';
        } else if (this.classList.contains('avanza')) {
            cursor.style.opacity = 1;
            // Hide cat cursor
            cursorCat.style.display = 'none';
            // Hide left cursor
            cursorLeft.style.display = 'none';
            // Hide right cursor
            cursorRight.style.display = 'block';
        } else if (this.classList.contains('retrocedi')) {
            cursor.style.opacity = 1;
            // Hide cat cursor
            cursorCat.style.display = 'none';
            // Hide left cursor
            cursorLeft.style.display = 'block';
            // Hide right cursor
            cursorRight.style.display = 'none';          
        }

    });
}

// Add custom cursor when hovering on navigation space (background)

// defining spaces
let navigationSpace = document.querySelector('.navigationSpace');
let rightSpace = document.querySelector('.right');
let leftSpace = document.querySelector('.left');

// Add a hover event listener to each space
// Right space
rightSpace.addEventListener('mouseover', function hoverOnRightSpace() {
    console.log('Hover on right space');
    cursor.style.opacity = 1;
    // Show right cursor
    cursorRight.style.display = 'block';
    // Hide left cursor
    cursorLeft.style.display = 'none';
    // Hide cursor cat
    cursorCat.style.display = 'none';
});
rightSpace.addEventListener('click', navigateRight);

// Left space
leftSpace.addEventListener('mouseover', function hoverOnLeftSpace() {
    console.log('Hover on left space');
    cursor.style.opacity = 1;
    // Show left cursor
    cursorLeft.style.display = 'block';
    // Hide right cursor
    cursorRight.style.display = 'none';
    // Hide cursor cat
    cursorCat.style.display = 'none';
});
leftSpace.addEventListener('click', navigateLeft);

// Leaving Navigation space removes custom cursor
navigationSpace.addEventListener('mouseleave', function() {
    console.log('Mouse left navigation space');
    cursorLeft.style.display = 'none';
    cursorRight.style.display = 'none';
});


// Rotate animation of small icons in the deck
// When going LEFT <<<<-------
let rotateSmallIconsLeft = gsap.to(smallIcons, {
    keyframes: {
        x: [0, -10, 0],
        rotate: [0, -360, 0],
        ease: 'back',
    },
    duration: 3,
    paused: true,
});
// When going RIGHT ------>>>>
let rotateSmallIconsRight = gsap.to(smallIcons, {
    keyframes: {
        x: [0, 10, 0],
        rotate: [0, 360, 0],
        ease: 'back',
    },
    duration: 3,
    paused: true,
});

// Play the rotateSmallIcons animation when pressing the 'a' key
document.addEventListener('keydown', function(event) {
    if (event.key === 'a' || event.key === 'A') {
        console.log('Rotate small icons');
        rotateSmallIcons.restart();
    }
});



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
    autoplay: false,
    path: '../res/logo/animatedLogo_puntoColorato.json'
});

// Stop the logo animation depending on the page name
var pageName = location.pathname.split("/").slice(-1)
console.log(pageName);
if (pageName == 'green-deck.html') {
    // Stop the animation on greenLogoKeyframe
    logoAnimation.goToAndStop(greenLogoKeyframe, true);
} else if (pageName == 'pink-deck.html') {
    // Stop the animation on pinkLogoKeyframe
    logoAnimation.goToAndStop(pinkLogoKeyframe, true);
} else if (pageName == 'yellow-deck.html') {
    // Stop the animation on yellowLogoKeyframe
    logoAnimation.goToAndStop(yellowLogoKeyframe, true);
} else if (pageName == 'red-deck.html') {
    // Stop the animation on redLogoKeyframe
    logoAnimation.goToAndStop(redLogoKeyframe, true);
} else if (pageName == 'blue-deck.html') {
    // Stop the animation on blueLogoKeyframe
    logoAnimation.goToAndStop(blueLogoKeyframe, true);
}

// Menu animation
menuButton.addEventListener('click', function() {
    // Toggle menu by adding/removing class 'full-screen-menu-hidden'
    let fullScreenMenu = document.querySelector('.full-screen-menu');
    fullScreenMenu.classList.toggle('full-screen-menu-hidden');
});