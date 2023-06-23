// Creating variable for each card
let greenCard = $(".green-card").parent(); // Green
let redCard = $(".red-card").parent(); // Red
let yellowCard = $(".yellow-card").parent(); // Yellow
let pinkCard = $(".pink-card").parent(); // Pink
let blueCard = $(".blue-card").parent(); // Blue

// Creating array of cards
const cards = gsap.utils.toArray(".single-card-wrapper");
// Creating loop for cards
loop = horizontalLoop(cards, {
    paused: true, // avoid an infinite animated loop
});

// Registering the Observer plugin
gsap.registerPlugin(Observer);

if (/Mobi/.test(navigator.userAgent)) {
    console.log("Mobile");
} else {
    console.log("Desktop");
}

// Keeping track of the current, prev and next cards
let currentCard = 3;
let nextCard = 4;
let prevCard = 2;

// Functions for switching between cards
function nextCat() {
    loop.next({duration: .5, ease: "back"});
    console.log("nextCat");

    applyNavigationClasses(loop.current());
}
function prevCat() {
    loop.previous({duration: .5, ease: "back"});
    console.log("prevCat");

    applyNavigationClasses(loop.current());
}

// Change classes on cards
function applyNavigationClasses() {
    if (loop.current() === 0) {
        currentCard = 2;
    } else if (loop.current() === 1) {
        currentCard = 3;
    } else if (loop.current() === 2) {
        currentCard = 4;
    } else if (loop.current() === 3) {
        currentCard = 0;
    } else if (loop.current() === 4) {
        currentCard = 1;
    }

    nextCard = (currentCard + 1) % 5;
    prevCard = (currentCard - 1 + 5) % 5;

    console.log("currentCard is", currentCard)

    cards.forEach(card => {
        card.classList.remove("current"); // remove 'current' class from all cards
        card.classList.remove("next"); // remove 'next' class from all cards
        card.classList.remove("prev"); // remove 'prev' class from all cards
    });
    cards[currentCard].classList.add("current"); // add 'current' class to current card
    cards[nextCard].classList.add("next"); // add 'next' class to next card
    cards[prevCard].classList.add("prev"); // add 'prev' class to previous card

    prevButton = $(".prev");
    nextButton = $(".next");

}

console.log("On load index is", loop.current());
// Apply current class on load
$(cards[1]).addClass("prev");
$(cards[2]).addClass("current");
$(cards[3]).addClass("next");

// Add event listener for the touch and scroll events via Observer
Observer.create({
    target: window, // target element
    type: "touch,scroll", // type of events to observe
    speed: .5, // speed of the scroll to animation
    onLeft: () => nextCat(), // callback function on swipe left
    onRight: () => prevCat(), // callback function on swipe right
    tolerance: 80, // amount of pixels to swipe before triggering the callback
})

// Add event listeners to keys
document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        console.log("Current index is ", loop.current());
        collectCards();

    } else if (event.code === "ArrowRight") {
        console.log("ArrorRight pressed");
        nextCat();

    } else if (event.code === "ArrowLeft") {
        console.log("ArrorLeft pressed");
        prevCat();
    }
});

// Add event listeners to clicks
let wrapper = document.querySelector(".wrapper");
wrapper.addEventListener("click", (event) => {
    if (event.target.classList.contains("next") || event.target.closest(".next")) {
        nextCat();
    } else if (event.target.classList.contains("prev") || event.target.closest(".prev")) {
        prevCat();
    } else if (event.target.classList.contains("current") || event.target.closest(".current")) {
        console.log("Current card clicked");
    }
});

// Collecting cards
function collectCards() {
    
}

// QUA CREARE UN ARRAY BELLO, con posizioni giuste
// Array = [{2, 1, 0, -1, 2}, {}, {}, {}, {}}]

let greenFactor = 2; // Factor for moving cards: how many positions to move, and direction (- left / + right)
let redFactor = 1; // Factor for moving cards: how many positions to move, and direction (- left / + right)
let yellowFactor = 0; // Factor for moving cards: how many positions to move, and direction (- left / + right)
let pinkFactor = -1; // Factor for moving cards: how many positions to move, and direction (- left / + right)
let blueFactor = -2; // Factor for moving cards: how many positions to move, and direction (- left / + right)

console.log("Collecting cards");
    // Creating timeline
    let collectTl = gsap.timeline({
        defaults: {
            duration: .5,
            ease: "back",
        }
    });
    // Adding tweens to timeline
    collectTl.add('start');
    collectTl.to(greenCard, {x: greenCard.width()*greenFactor}, 'start');
    collectTl.to(redCard, {x: redCard.width()*redFactor}, 'start');
    collectTl.to(yellowCard, {x: yellowCard.width()*yellowFactor}, 'start');
    collectTl.to(pinkCard, {x: pinkCard.width()*pinkFactor}, 'start');
    collectTl.to(blueCard, {x: blueCard.width()*blueFactor}, 'start');
    collectTl.add('end');


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