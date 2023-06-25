var htmlTitle = document.querySelector('title').innerText;
console.log("Title:", htmlTitle);

// Variabili
let angoloRotazione = 45;

// Creating variable for each card
let greenCard = $(".green-card").parent(); // Green
let redCard = $(".red-card").parent(); // Red
let yellowCard = $(".yellow-card").parent(); // Yellow
let pinkCard = $(".pink-card").parent(); // Pink
let blueCard = $(".blue-card").parent(); // Blue

// Creating array of cards
const cards = gsap.utils.toArray(".single-card-wrapper");

// Registering the Observer plugin
gsap.registerPlugin(Observer);

let overable = false; // Boolean to control wether pointer events are allowed or not
console.log("overable is", overable);

// Checking if mobile or desktop
if (/Mobi/.test(navigator.userAgent)) {
    console.log("Mobile");

    // Creating loop for cards
    loop = horizontalLoop(cards, {
        paused: true, // avoid an infinite animated loop
    });

    // Add event listeners to keys
    document.addEventListener("keydown", function(event) {
        if (event.code === "Space") {
            console.log("Current index is ", loop.current());
            collectTl.reverse();

        } else if (event.code === "ArrowRight") {
            console.log("ArrorRight pressed");
            nextCat();

        } else if (event.code === "ArrowLeft") {
            console.log("ArrorLeft pressed");
            prevCat();
        }
    });

    // Logging relative index on load
    console.log("On load index (relative to loop) is", loop.current());

    // Apply current class on load
    let indexOfCurrentClassOnLoad = (cards.length - 1) / 2;
    let indexOfPrevClassOnLoad = indexOfCurrentClassOnLoad - 1;
    let indexOfNextClassOnLoad = indexOfCurrentClassOnLoad + 1;
    $(cards[indexOfPrevClassOnLoad]).addClass("prev");
    $(cards[indexOfCurrentClassOnLoad]).addClass("current");
    $(cards[indexOfNextClassOnLoad]).addClass("next");

    // Keeping track of the current, prev and next cards
    let currentCard;
    let nextCard;
    let prevCard;

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

        if (cards.length === 5) {
            if (loop.current() === 0) {
                currentCard = (cards.length - 1) / 2;
            } else if (loop.current() === 1) {
                currentCard = 3;
            } else if (loop.current() === 2) {
                currentCard = 4;
            } else if (loop.current() === 3) {
                currentCard = 0;
            } else if (loop.current() === 4) {
                currentCard = 1;
            }
        } else if (cards.length === 7) {
            if (loop.current() === 0) {
                currentCard = (cards.length - 1) / 2;
            } else if (loop.current() === 1) {
                currentCard = ((cards.length - 1) / 2) + 1;
            } else if (loop.current() === 2) {
                currentCard = ((cards.length - 1) / 2) + 2;
            } else if (loop.current() === 3) {
                currentCard = ((cards.length - 1) / 2) + 3;
            } else if (loop.current() === 4) {
                currentCard = 0;
            } else if (loop.current() === 5) {
                currentCard = ((cards.length - 1) / 2) - 2;
            } else if (loop.current() === 6) {
                currentCard = ((cards.length - 1) / 2) - 1;
            }
        }

        nextCard = (currentCard + 1) % cards.length;
        prevCard = (currentCard - 1 + cards.length) % cards.length;

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

    // Add event listener for the touch and scroll events via Observer
    Observer.create({
        target: window, // target element
        type: "touch,scroll", // type of events to observe
        speed: .5, // speed of the scroll to animation
        onLeft: () => nextCat(), // callback function on swipe left
        onRight: () => prevCat(), // callback function on swipe right
        tolerance: 80, // amount of pixels to swipe before triggering the callback
    })

    // Add event listeners to clicks
    let wrapper = document.querySelector(".wrapper");
    wrapper.addEventListener("click", (event) => {
        if (event.target.classList.contains("next") || event.target.closest(".next")) {
            nextCat();
        } else if (event.target.classList.contains("prev") || event.target.closest(".prev")) {
            prevCat();
        } else if (event.target.classList.contains("current") || event.target.closest(".current")) {
            console.log("Current card clicked");
            collectCards();
        }
    });

    // Collecting cards

    // Creating timeline
    let collectTl = gsap.timeline({
        defaults: {
            duration: .75,
            ease: "power2.inOut",
        }
    });

    // Funzione
    function collectCards() {
        let i = loop.current();
        console.log("Running collectCards()...");
        collectTl.clear();
        console.log("collectTl cleared.");
        // Adding tweens to timeline
        collectTl.add('start');
        collectTl.to(greenCard, {x: greenCard.width()*factor[i].greenFactor}, 'start');
        collectTl.to(redCard, {x: redCard.width()*factor[i].redFactor}, 'start');
        collectTl.to(yellowCard, {x: yellowCard.width()*factor[i].yellowFactor}, 'start');
        collectTl.to(pinkCard, {x: pinkCard.width()*factor[i].pinkFactor}, 'start');
        collectTl.to(blueCard, {x: blueCard.width()*factor[i].blueFactor}, 'start');
        collectTl.add('end');

        collectTl.play();
        console.log("collectTl played.");
    }

    // Array that contains the factors for the translation in the collecting animation
    const factor = [
        {greenFactor: 2, redFactor: 1, yellowFactor: 0, pinkFactor: -1, blueFactor: -2}, // yellow is current
        {greenFactor: -2, redFactor: 2, yellowFactor: 1, pinkFactor: 0, blueFactor: -1}, // pink is current
        {greenFactor: -1, redFactor: -2, yellowFactor: 2, pinkFactor: 1, blueFactor: 0}, // blue is current
        {greenFactor: 0, redFactor: -1, yellowFactor: -2, pinkFactor: 2, blueFactor: 1}, // green is current
        {greenFactor: 1, redFactor: 0, yellowFactor: -1, pinkFactor: -2, blueFactor: 2}, // red is current
    ]


} else { // ON DEKSTOP ONLY
    console.log("Desktop");
    

    if (htmlTitle.includes("Home") === true) { // IF HTML TITLE of PAGE is HOME

        // Angles for cards in closed deck
        let pinkAngle = 0;
        let redAngle = 5;
        let blueAngle = 0;
        let yellowAngle = -1;
        let greenAngle = 3;

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

        // Creating timeline
        let collectCards_desktop_TL = gsap.timeline({
            defaults: {
                duration: .75,
                ease: "power1.inOut",
            },
            paused: true,
        });

        // Adding tweens to timeline
        collectCards_desktop_TL.add('start');
        collectCards_desktop_TL.fromTo(pinkCard, {x: -500, y: -205, rotate: -15}, {x: 0, y: 0, rotate: pinkAngle}, 'start');
        collectCards_desktop_TL.fromTo(redCard, {x: 600, y: 205, rotate: 30}, {x: 0, y: 0, rotate: redAngle}, 'start');
        collectCards_desktop_TL.fromTo(blueCard, {x: 20, y: -100, rotate: -20}, {x: 0, y: 0, rotate: blueAngle}, 'start');
        collectCards_desktop_TL.fromTo(yellowCard, {x: -500, y: 300, rotate: -45}, {x: 0, y: 0, rotate: yellowAngle}, 'start');
        collectCards_desktop_TL.fromTo(greenCard, {x: -50, y: -295, rotate: -45}, {x: 0, y: 0, rotate: greenAngle}, 'start');
        collectCards_desktop_TL.add('center', 1.25);
        collectCards_desktop_TL.to(pinkCard, {x: -outer_X, y: outer_Y, rotate: -outer_deg}, 'center');
        collectCards_desktop_TL.to(redCard, {x: -inner_X, y: inner_Y, rotate: -inner_deg}, 'center');
        collectCards_desktop_TL.to(blueCard, {x: center_X, y: center_Y}, 'center');
        collectCards_desktop_TL.to(yellowCard, {x: inner_X, y: inner_Y, rotate: inner_deg}, 'center');
        collectCards_desktop_TL.to(greenCard, {x: outer_X, y: outer_Y, rotate: outer_deg}, 'center');
        collectCards_desktop_TL.add( function() {overable = true; console.log("overable is", overable)});

        collectCards_desktop_TL.add('end');

        // Add event listener for spacebar key
        document.addEventListener("keydown", function(event) {
            if (event.code === "Space") {
                console.log("Spacebar pressed");
                collectCards_desktop_TL.tweenTo("end");
            } else if (event.code === "KeyA") {
                collectCards_desktop_TL.tweenTo("end");
                console.log("A");
            }
        });
        
        //    HH   HH  OOOOO  VV     VV EEEEEEE RRRRRR  
        //    HH   HH OO   OO VV     VV EE      RR   RR 
        //    HHHHHHH OO   OO  VV   VV  EEEEE   RRRRRR  
        //    HH   HH OO   OO   VV VV   EE      RR  RR  
        //    HH   HH  OOOO0     VVV    EEEEEEE RR   RR                             

        // ============================================================
        // ===== Animazioni all'HOVER delle card [nella fan view] =====
        // ============================================================     

        // Variabili labels
        const catTitleAnimationEndY = -80;

        // On PINK over (event listeners)
        pinkCard.on("mouseenter", function() {
            if (overable === true) {
                enterPink.play();
                rotatePink.play();
                slideOutPinkTitle.play();
            }
        });
        pinkCard.on("mouseleave", function() {
            if (overable === true) {
                enterPink.reverse();
                rotatePink.reverse();
                slideOutPinkTitle.reverse();
            }
        });

        // On RED over (event listeners)
        redCard.on("mouseenter", function() {
            if (overable === true) {
                enterRed.play();
                rotateRed.play();
                slideOutRedTitle.play();
            }

        });
        redCard.on("mouseleave", function() {
            if (overable === true) {
                enterRed.reverse();
                rotateRed.reverse();
                slideOutRedTitle.reverse();
            }
        });

            // On BLUE over (event listeners)
        blueCard.on("mouseenter", function() {
            if (overable === true) {
                enterBlue.play(); // Animazione card
                rotateBlue.play(); // Animazione vettore blu
                slideOutBlueTitle.play();
            }
        });
        blueCard.on("mouseleave", function() {
            if (overable === true) {   
                enterBlue.reverse(); // Animazione card (reverse)
                rotateBlue.reverse(); // Animazione vettore blue (reverse)
                slideOutBlueTitle.reverse();
            }
        });

        // On YELLOW over (event listeners)
        yellowCard.on("mouseenter", function() {
            if (overable === true) {
                enterYellow.play();
                rotateYellow.play();
                yellowCatTitle.play();
            }
        });
        yellowCard.on("mouseleave", function() {
            if (overable === true) {
                enterYellow.reverse();
                rotateYellow.reverse();
                yellowCatTitle.reverse();
            }
        });

        // On GREEN over (event listeners)
        greenCard.on("mouseenter", function() {
            if (overable === true) {
                enterGreen.play();
                rotateGreen.play();
                greenCatTitle.play();
            }
        });
        greenCard.on("mouseleave", function() {
            if (overable === true) {
                enterGreen.reverse();
                rotateGreen.reverse();
                greenCatTitle.reverse();
            }
        });


        // OVER PINK =================================================
        // Pink card rises
        let enterPink = gsap.to(pinkCard, {
            paused: true,
            y: '-='+Math.sin(40)*60, 
            x: '+='+Math.cos(40)*60, 
            duration: 0.3,
            delay: 0.1,
            ease: "power3.inOut",
        });

        // Pink vector rotates
        let rotatePink = gsap.to(".pink-vector", { // Animazione vettore blu
            paused: true,
            rotate: angoloRotazione,
            duration: 0.4
        });

        // blue-cat-title slides out animation
        let slideOutPinkTitle = gsap.to(".pink-cat-title", {
            paused: true,
            y: catTitleAnimationEndY,
            duration: 0.3
        })


        // OVER RED =================================================
        // Red card rises
        let enterRed = gsap.to(redCard, {
            paused: true,
            y: '-='+Math.sin(20)*60, 
            x: '-='+Math.cos(20)*60,
            duration: 0.3,
            delay: 0.1,
            ease: "power3.inOut",
        });

        // Red vector rotates
        let rotateRed = gsap.to(".red-vector", { // Animazione vettore blu
            paused: true,
            rotate: angoloRotazione,
            duration: 0.4
        });
    
        // red-cat-title slides out animation
        let slideOutRedTitle = gsap.to(".red-cat-title", {
            y: catTitleAnimationEndY,
            paused: true,
            duration: 0.2,
            ease: "power3",
        })
        

        // OVER BLUE =================================================
        // Blue card rises
        let enterBlue = gsap.to(blueCard, { // Animazione card blu
            paused: true,
            y: -125,
            duration: 0.3,
            delay: 0.1,
            ease: "power3.inOut",
        })

        // Blue vector rotates
        let rotateBlue = gsap.to(".blue-vector", { // Animazione vettore blu
            paused: true,
            rotate: angoloRotazione,
            duration: 0.4,
        })

        // blue-cat-title slides out animation
        let slideOutBlueTitle = gsap.to(".blue-cat-title", {
            paused: true,
            y: catTitleAnimationEndY,
            duration: 0.3
        })


        // OVER YELLOW =================================================
        // Yellow card rises
        let enterYellow = gsap.to(yellowCard, {
            paused: true,
            x: '+='+Math.cos(20)*60, 
            y: '-='+Math.sin(20)*60,
            duration: 0.3,
            delay: 0.1,
            ease: "power3.inOut",
        });

        // Yellow vector rotates
        let rotateYellow = gsap.to(".yellow-vector", { // Animazione vettore blu
            paused: true,
            rotate: angoloRotazione,
            duration: 0.4,
        })

        // yellow-cat-title slides out animation
        let yellowCatTitle = gsap.to(".yellow-cat-title", {
            paused: true,
            y: catTitleAnimationEndY,
            duration: 0.2,
        })


        // OVER GREEN =================================================
        // Green card rises
        let enterGreen = gsap.to(greenCard, {
            paused: true,
            y: '-='+Math.sin(40)*60, 
            x: '-='+Math.cos(40)*60, 
            duration: 0.3,
            delay: 0.1,
            ease: "power3.inOut",
        })

        // Green vector rotates
        let rotateGreen = gsap.to(".green-vector", { // Animazione vettore blu
            paused: true,
            rotate: angoloRotazione,
            duration: 0.4,
        })

        // green-cat-title slides out animation
        let greenCatTitle = gsap.to(".green-cat-title", {
            paused: true,
            y: catTitleAnimationEndY,
            duration: 0.2,
            ease: "power3",
        })

        // ===============================================================
        // ==================       CLICK on CARD        =================
        // ===============================================================

        pinkCard.on("click", function() {
            overable = false;
            cardClickedTimeline.remove(pinkDown);
            cardClickedTimeline.play();
            clickedCardToCenter(pinkCard);
        });

        redCard.on("click", function() {
            overable = false;
            cardClickedTimeline.remove(redDown);
            cardClickedTimeline.play();
            clickedCardToCenter(redCard);
        });

        blueCard.on("click", function() {
            overable = false;
            cardClickedTimeline.remove(blueDown);
            cardClickedTimeline.play();
            clickedCardToCenter(blueCard);
        });

        yellowCard.on("click", function() {
            overable = false;
            cardClickedTimeline.remove(yellowDown);
            cardClickedTimeline.play();
            clickedCardToCenter(yellowCard);
        });

        greenCard.on("click", function() {
            overable = false;
            cardClickedTimeline.remove(greenDown);
            cardClickedTimeline.play();
            clickedCardToCenter(greenCard);
        });

        let cardClickedTimeline = gsap.timeline({
            defaults: {
                duration: 1.25,
                ease: "power1.in",
            },
            paused: true,
        });

        // Adding tweens to timeline
        cardClickedTimeline.add('start');
        let pinkDown = gsap.to(pinkCard, {y: 1200});
        cardClickedTimeline.add(pinkDown, 'start');
        let redDown = gsap.to(redCard, {y: 1200});
        cardClickedTimeline.add(redDown, 'start');
        let blueDown = gsap.to(blueCard, {y: 1200});
        cardClickedTimeline.add(blueDown, 'start');
        let yellowDown = gsap.to(yellowCard, {y: 1200});
        cardClickedTimeline.add(yellowDown, 'start');
        let greenDown = gsap.to(greenCard, {y: 1200});
        cardClickedTimeline.add(greenDown, 'start');
        cardClickedTimeline.add('end');

        // ===============================================================
        // Card to center

        function clickedCardToCenter(clickedCard) {
            gsap.to(clickedCard, {
                x: 0,
                y: 0,
                rotate: 0,
                duration: .75,
                ease: "back",
            });

            gsap.to($(clickedCard).find(".card"), {
                scale: 1.25,
                duration: .75,
                ease: "back",
            });

            gsap.to($(clickedCard).find(".cat-title"), {
                duration: .75,
                'font-size': '130px',
                'font-variation-settings': "'srff' 0, 'wght' 550",
                opacity: .2,
                y: 0,
                ease: "back",
                bottom: 280,
            });
        }

        // ===============================================================
        // Observer
        Observer.create({
            target: window, // target element
            type: "wheel", // type of events to observe
            speed: .5, // speed of the scroll to animation
            onDown: () => collectCards_desktop_TL.tweenTo("end"), // callback function on swipe left
            tolerance: 80, // amount of pixels to swipe before triggering the callback
        })
    } else if (htmlTitle.includes("deck") === true) { // IF HTML TITLE of PAGE is that of a DECK
        console.log("Page is a deck")
        
        let deck = [];

        $('.single-card-wrapper').each(function() {
            deck.push(this);
        });

        // Apply navigation classes on load
        $(deck[0]).addClass('clickable');
        $(deck[1]).addClass('clickable');
        $(deck[6]).addClass('clickable');
        $(deck[2]).addClass('next');
        $(deck[5]).addClass('prev');

        console.log("Deck created ", deck);

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

        // Small-icons in the deck cards
        let smallIcons = $('.small-icon');

        // Carousel states
        let cardZeroPosition = 0;
        let calculatedPosition = 0;

        // Arrays
        const deckPositions_X = [card0_x, card1_x, card2_x, card3_x, card4_x, card5_x, card6_x];
        const deckPositions_deg = [card0_deg, card1_deg, card2_deg, card3_deg, card4_deg, card5_deg, card6_deg];
        const deckPositions_opacity = [1, 1, 0.4, 0, 0, 0.4, 1];
        const deckPositions_scale = [1.25, 1, 1, 1, 1, 1, 1];

        // Shows cards on load
        function showCards() {

            for (let i = 0; i < deck.length; i++) {
                const card = deck[i];
                const card_X = deckPositions_X[i];
                const card_deg = deckPositions_deg[i];
                const card_opacity = deckPositions_opacity[i];
                const card_scale = deckPositions_scale[i];
                
                gsap.to(card, {
                    x: card_X,
                    rotate: card_deg,
                    opacity: card_opacity,
                    scale: card_scale,
                    duration: 1,
                    ease: 'back',
                })
            }
            $('body').css('pointer-events', 'all');
            console.log('Mouse unlocked');
        }
        showCards();

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
                const card_opacity = deckPositions_opacity[calculatedPosition];
                const card_scale = deckPositions_scale[calculatedPosition];

                gsap.to(card, {
                    x: card_X,
                    rotate: card_deg,
                    opacity: card_opacity,
                    scale: card_scale,
                    duration: 1,
                    ease: 'back',
                })
                setNavigationClasses(card, calculatedPosition);
            }

            cardZeroPosition -=1;
            if (cardZeroPosition === -7) {
                console.log("Reset cardZeroPosition => 0");
                cardZeroPosition = 0;
            }
        }

        // Function that manages the navigation to the left
        function navigateLeft() {
            console.log('Navigate left');

            // Play animation of small icons
            rotateSmallIconsLeft.restart();

            for (let i = 0; i < deck.length; i++) {
                
                const card = deck[i];

                calculatedPosition = i+1+cardZeroPosition;

                // if calculatedPosition is greater than 6, subtract 7 from it
                if (calculatedPosition > 6) {
                    calculatedPosition -= 7;
                } else if (calculatedPosition < 0) {
                    calculatedPosition += 7;
                }

                const card_X = deckPositions_X[calculatedPosition];
                const card_deg = deckPositions_deg[calculatedPosition];
                const card_opacity = deckPositions_opacity[calculatedPosition];
                const card_scale = deckPositions_scale[calculatedPosition];

                gsap.to(card, {
                    x: card_X,
                    rotate: card_deg,
                    opacity: card_opacity,
                    scale: card_scale,
                    duration: 1,
                    ease: 'back',
                })
                setNavigationClasses(card, calculatedPosition);
            }
            cardZeroPosition +=1;
            if (cardZeroPosition === 7) {
                console.log("Reset cardZeroPosition => 0");
                cardZeroPosition = 0;
            }

        }

        // Function that sets the navigation classes
        function setNavigationClasses(card, calculatedPosition) {
            // Add class "clickable" to cards with calculatedPosition = 6, 0 or 1
            if (calculatedPosition === 6 || calculatedPosition === 0 || calculatedPosition === 1) {
                $(card).addClass('clickable');
                $(card).removeClass('next');
                $(card).removeClass('prev');
            } else if (calculatedPosition === 2) {
                $(card).removeClass('clickable');
                $(card).addClass('next');
            } else if (calculatedPosition === 5) {
                $(card).removeClass('clickable');
                $(card).addClass('prev');
            } else {
                // Remove class from other cards
                $(card).removeClass('clickable');
                $(card).removeClass('next');
                $(card).removeClass('prev');
            }

            console.log("Navigation classes have been set.");
        }

        // Rotate animation of small icons in the deck
        // When going LEFT <<<<-------
        let rotateSmallIconsLeft = gsap.to(smallIcons, {
            keyframes: {
                x: [0, -10, 0],
                rotate: [0, -180, 0],
                ease: 'back',
            },
            duration: 3,
            paused: true,
        });
        // When going RIGHT ------>>>>
        let rotateSmallIconsRight = gsap.to(smallIcons, {
            keyframes: {
                x: [0, 10, 0],
                rotate: [0, 180, 0],
                ease: 'back',
            },
            duration: 3,
            paused: true,
        });

        // Function that manages the click on the cards
        $(window).on("click", function(event) {
            let target = event.target;
            console.log("Click on: " + target);
            
            if ($(target).parents().is(".clickable")) {
                console.log("Click on clickable card");
            } else if ($(target).parents().is(".prev")) {
                navigateLeft();
            } else if ($(target).parents().is(".next")) {
                navigateRight();
            }
          });

        // Keyboard navigation
        $(document).keydown(function(event) {
            if (event.which === 39) { // ON ARROW RIGHT
                console.log("Arrow right pressed");
                navigateRight();

            } else if (event.which === 37) { // ON ARROW LEFT
                console.log("Arrow left pressed");
                navigateLeft();
            }
        });

        // Custom cursor using Tippy.js
        // Docs here: https://atomiks.github.io/tippyjs/v6/faq/
        tippy('.clickable', {
            content: "Scopri",
            theme: "tomato",
            followCursor: true,
            hideOnClick: false,
            delay: 0,
            duration: [200, 150],
            arrow: false,
            placement: 'bottom',
        });

        

    }

    // FINE DESKTOP
}





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