// Cloning the deck 5 times (= 6 decks = 30 cards, in total)
for (deckCounter = 2; deckCounter <= 6; deckCounter++) {
    $('.mazzo1').clone().addClass('mazzo' + deckCounter).removeClass('mazzo1').insertAfter('.mazzo' + (deckCounter - 1));
    console.log('Deck cloned.');
}

// Adding class "selected" to upper card
$('.mazzo1 .green-single-card-wrapper').addClass('selected');
// Adding class "next" to next card
$('.mazzo1 .red-single-card-wrapper').addClass('next');
// Adding class "previous" to previous card
$('.mazzo6 .blue-single-card-wrapper').addClass('previous');

// Creating an array to store all +the cards
const allCards = document.querySelectorAll(".single-card-wrapper");
console.log("There are now", allCards.length, "cards in total.");

// Creating an array to store the animations
let cardsToWheelAnimations = [];
let rotateWheelAnimations = [];

// Creating array to store the cards positioning in the wheel
const cardPositions = [];

// Calculating the angle between each card
const angleStep = 360 / allCards.length;

// Defining the wheel radius
const radius = 800; // value in px

// Defining the vertical offset of the wheel
const verticalOffset = 800; // value in px

// Generating card positions
for (let i = 0; i < allCards.length; i++) {
    // Calculate the angle for each card
    let cardAngle = angleStep * i;

    // Calculating the position of the card
    let cardPosition_x = radius * Math.sin(cardAngle * Math.PI / 180);
    let cardPosition_y = -radius * Math.cos(cardAngle * Math.PI / 180)+verticalOffset;

    // Creating an object representing each card values
    const cardValues = {
        cardAngle : cardAngle,
        cardPosition_x : cardPosition_x,
        cardPosition_y : cardPosition_y,
    };

    // Pushing the object to the array
    cardPositions.push(cardValues);
}

// Adjusting the position of the first card so that it rises a bit
cardPositions[0].cardPosition_y = cardPositions[0].cardPosition_y - 60;

// Applying the positioning to each card of the wheel
for (var i = 0; i < allCards.length; i++) {

    let cardsToWheelAnimation = gsap.fromTo(allCards[i], {
        // from = partenza
        rotate: 0,
    },
    {
        // to = arrivo
        x: cardPositions[i].cardPosition_x,
        y: cardPositions[i].cardPosition_y,
        rotate: cardPositions[i].cardAngle + "_short",
        duration: 1,
        delay: 0.5,
        paused: false,
        ease: "power1.inOut",
    });
    // Push new animation to the array
    cardsToWheelAnimations.push(cardsToWheelAnimation);
}

// Function to play the distributing animation
function playWheelAnimation() {
    // Play the animation
    cardsToWheelAnimations.forEach((animation) => {
        animation.play();
    });
}

// Function to play the wheel rotation CLOCKWISE animations
function playRotateCWAnimation() {

    if (lastDirection == "CCW") {
        positionVariation++;
    } else if (lastDirection == "none") {
        positionVariation = 1;
    } else {
        positionVariation++;
    }

    // Flush previous animations from the array
    rotateWheelAnimations = [];

    for (var i = 0; i < allCards.length; i++) {
        let j = i + positionVariation;
        if (j >= allCards.length) {
            j = j - allCards.length;
        } else if (j < 0) {
            j = j + allCards.length;
        }
        let rotateWheelAnimation = gsap.to(allCards[i], {
            x: cardPositions[j].cardPosition_x,
            y: cardPositions[j].cardPosition_y,
            rotate: cardPositions[j].cardAngle+"_short",
            duration: .8,
            delay: 0,
            paused: true,
            ease: "back",
        });
        // Push new animation to the array
        rotateWheelAnimations.push(rotateWheelAnimation);

        // Select card with upper position
        if (j == 0) {
            $(allCards[i]).addClass('selected');
            console.log("adding select card")
        } else if (j == 1) {
            $(allCards[i]).addClass('next');
        } else if (j == 29) {
            $('.single-card-wrapper').removeClass('selected');
            $('.single-card-wrapper').removeClass('next');
            $('.single-card-wrapper').removeClass('previous');
            $(allCards[i]).addClass('previous');
            console.log("adding previous card")
        }
    }

    // Play the animation
    rotateWheelAnimations.forEach((animation) => {
        animation.invalidate(); // invalidate the animation so reset the starting values to current ones
        animation.restart();
    });

    // Store last direction
    lastDirection = "CW";
}

// Function to play the wheel rotation COUNTER-CLOCKWISE animations
function playRotateCCWAnimation() {

    if (lastDirection == "CW") {
        positionVariation--;
    } else if (lastDirection == "none") {
        positionVariation = -1;
    } else {
        positionVariation--;
    } 

    // Flush previous animations from the array
    rotateWheelAnimations = [];

    for (var i = 0; i < allCards.length; i++) {
        let j = i + positionVariation;
        if (j >= allCards.length) {
            j = j - allCards.length;
        } else if (j < 0) {
            j = j + allCards.length;
        }

        // Select card with upper position
        if (j == 0) {
            $('.single-card-wrapper').removeClass('selected');
            $(allCards[i]).addClass('selected');
        }

        let rotateWheelAnimation = gsap.to(allCards[i], {
            x: cardPositions[j].cardPosition_x,
            y: cardPositions[j].cardPosition_y,
            rotate: cardPositions[j].cardAngle+"_short",
            duration: .8,
            delay: 0,
            paused: true,
            ease: "back",
        });
        // Push new animation to the array
        rotateWheelAnimations.push(rotateWheelAnimation);

        // Select card with upper position
        if (j == 0) {
            $(allCards[i]).addClass('selected');
            console.log("adding select card")
        } else if (j == 1) {
            $(allCards[i]).addClass('next');
        } else if (j == 29) {
            $('.single-card-wrapper').removeClass('selected');
            $('.single-card-wrapper').removeClass('next');
            $('.single-card-wrapper').removeClass('previous');
            $(allCards[i]).addClass('previous');
            console.log("adding previous card")
        }
        
    }

    // Play the animation
    rotateWheelAnimations.forEach((animation) => {
        animation.invalidate(); // invalidate the animation so reset the starting values to current ones
        animation.restart();
    });

    // Store last direction
    lastDirection = "CCW";
}

// Applying repositioning after navigation
let positionVariation = 1;

// Rememeber direction of last navigation
let lastDirection = "none";

// Add event listener for the SPACE bar press
document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        console.log("Space pressed");
        switchCardNames();
    } else if (event.code === "ArrowRight") {
        console.log("ArrorRight pressed");
        playRotateCCWAnimation();
        nextCatName();

    } else if (event.code === "ArrowLeft") {
        console.log("ArrorLeft pressed");
        playRotateCWAnimation();
        previousCatName();
    }
});

let wrapper = document.getElementById('wrapper');

// Variables to track swipe start and end positions
let startX = 0;
let startY = 0;
let endX = 0;
let endY = 0;

// Minimum swipe distance threshold
const minSwipeDistance = 50;

// Add event listener for touch start
document.addEventListener('touchstart', function(event) {
    // event.preventDefault(); // Prevent default browser touch behavior
    startX = event.touches[0].pageX;
    startY = event.touches[0].pageY;
}, {passive: false});

// Add event listener for touch end
document.addEventListener('touchend', function(event) {
    // event.preventDefault(); // Prevent default browser touch behavior
    endX = event.changedTouches[0].pageX;
    endY = event.changedTouches[0].pageY;

    // Calculate swipe distance
    const deltaX = endX - startX;
    const deltaY = endY - startY;

    // Check if the swipe distance meets the threshold
    if (Math.abs(deltaX) > minSwipeDistance || Math.abs(deltaY) > minSwipeDistance) {
        // Check the direction of the swipe
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Horizontal swipe (left or right)
            if (deltaX > 0) {
                // Right swipe
                onSwipeRight();
            } else {
                // Left swipe
                onSwipeLeft();
            }
        }
    }
}, {passive: false});

// Defining what happens on swipe left and right
function onSwipeLeft() { // <<< LEFT
    console.log("swipe left");
    playRotateCCWAnimation();
    nextCatName();
}

function onSwipeRight() { // >>> RIGHT
    console.log("swipe right");
    playRotateCWAnimation();
    previousCatName();
}

// Adding event listener to next and previous cards
$(document).on('click', '.next', function() {
    playRotateCCWAnimation();
    nextCatName();
    console.log("next clicked");
});

$(document).on('click', '.previous', function() {
    playRotateCWAnimation();
    previousCatName();
    console.log("previous clicked");
});

const catNames = gsap.utils.toArray(".catNameContainer");
loop = horizontalLoop(catNames, {paused: true});

// Functions for switching Cat names
function nextCatName() {
    loop.next({duration: .5, ease: "power3.inOut"});
}
function previousCatName() {
    loop.previous({duration: .5, ease: "power3.inOut"});
}

//    #####   #######      #######  #######      ######   #######   #####   #    # 
//   #     #  #     #         #     #     #      #     #  #        #     #  #   #  
//   #        #     #         #     #     #      #     #  #        #        #  #   
//   #  ####  #     #         #     #     #      #     #  #####    #        ###    
//   #     #  #     #         #     #     #      #     #  #        #        #  #   
//   #     #  #     #         #     #     #      #     #  #        #     #  #   #  
//    #####   #######         #     #######      ######   #######   #####   #    # 
                                                                              
$(document).on('click', '.selected', function() {
    console.log("selected clicked");
    
    if ($(".selected").hasClass("blue-single-card-wrapper") == true) {
        window.location.href = "mobile-decks/blue-deck-mobile.html";
    }

});


//   #     #                                              #######                                                   
//   #     #  ######  #       #####   ######  #####       #        #    #  #    #   ####   #####  #   ####   #    # 
//   #     #  #       #       #    #  #       #    #      #        #    #  ##   #  #    #    #    #  #    #  ##   # 
//   #######  #####   #       #    #  #####   #    #      #####    #    #  # #  #  #         #    #  #    #  # #  # 
//   #     #  #       #       #####   #       #####       #        #    #  #  # #  #         #    #  #    #  #  # # 
//   #     #  #       #       #       #       #   #       #        #    #  #   ##  #    #    #    #  #    #  #   ## 
//   #     #  ######  ######  #       ######  #    #      #         ####   #    #   ####     #    #   ####   #    # 
                                                                                                               


// HELPER FUNCTION
/*
This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.

Features:
- Uses xPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
- When each item animates to the left or right enough, it will loop back to the other side
- Optionally pass in a config object with values like "speed" (default: 1, which travels at roughly 100 pixels per second), paused (boolean),  repeat, reversed, and paddingRight.
- The returned timeline will have the following methods added to it:
- next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
- previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
- toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
- current() - returns the current index (if an animation is in-progress, it reflects the final index)
- times - an Array of the times on the timeline where each element hits the "starting" spot. There's also a label added accordingly, so "label1" is when the 2nd element reaches the start.
*/
function horizontalLoop(items, config) {
    items = gsap.utils.toArray(items);
    config = config || {};
    let tl = gsap.timeline({repeat: config.repeat, paused: config.paused, defaults: {ease: "none"}, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)}),
        length = items.length,
        startX = items[0].offsetLeft,
        times = [],
        widths = [],
        xPercents = [],
        curIndex = 0,
        pixelsPerSecond = (config.speed || 1) * 100,
        snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
        totalWidth, curX, distanceToStart, distanceToLoop, item, i;
    gsap.set(items, { // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
        xPercent: (i, el) => {
            let w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
            xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / w * 100 + gsap.getProperty(el, "xPercent"));
            return xPercents[i];
        }
    });
    gsap.set(items, {x: 0});
    totalWidth = items[length-1].offsetLeft + xPercents[length-1] / 100 * widths[length-1] - startX + items[length-1].offsetWidth * gsap.getProperty(items[length-1], "scaleX") + (parseFloat(config.paddingRight) || 0);
    for (i = 0; i < length; i++) {
        item = items[i];
        curX = xPercents[i] / 100 * widths[i];
        distanceToStart = item.offsetLeft + curX - startX;
        distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
        tl.to(item, {xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond}, 0)
          .fromTo(item, {xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)}, {xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false}, distanceToLoop / pixelsPerSecond)
          .add("label" + i, distanceToStart / pixelsPerSecond);
        times[i] = distanceToStart / pixelsPerSecond;
    }
    function toIndex(index, vars) {
        vars = vars || {};
        (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); // always go in the shortest direction
        let newIndex = gsap.utils.wrap(0, length, index),
            time = times[newIndex];
        if (time > tl.time() !== index > curIndex) { // if we're wrapping the timeline's playhead, make the proper adjustments
            vars.modifiers = {time: gsap.utils.wrap(0, tl.duration())};
            time += tl.duration() * (index > curIndex ? 1 : -1);
        }
        curIndex = newIndex;
        vars.overwrite = true;
        return tl.tweenTo(time, vars);
    }
    tl.next = vars => toIndex(curIndex+1, vars);
    tl.previous = vars => toIndex(curIndex-1, vars);
    tl.current = () => curIndex;
    tl.toIndex = (index, vars) => toIndex(index, vars);
    tl.times = times;
    tl.progress(1, true).progress(0, true); // pre-render for performance
    if (config.reversed) {
      tl.vars.onReverseComplete();
      tl.reverse();
    }
    return tl;
    }