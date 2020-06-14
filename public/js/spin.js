// const chances = Cookies.get('chances')
let chances = (Cookies.get('visited') == "true") ? Cookies.get('chances') : 2
if ((chances == 0) || (chances == undefined) || (chances == 'NaN')) {
    Cookies.set('chances', 0)
    chances = 0
}
// Create new wheel object specifying the parameters at creation time.
let theWheel = new Winwheel({
    'outerRadius': 212, // Set outer radius so wheel fits inside the background.
    'innerRadius': 0, // Make wheel hollow so segments don't go all way to center.
    'textFontSize': 30, // Set default font size for the segments.
    'textOrientation': 'horizontal', // Make text [vertial,horizontal] so goes down from the outside of wheel.
    'textAlignment': 'middle', // Align text to [middle,inner,outer] side of wheel.
    'numSegments': 8, // Specify number of segments.
    'segments': // Define segments including colour and text.
        [ // font size and test colour overridden on backrupt segments.
        {
            'fillStyle': '#55efc4',
            'text': 'camera'
        }, {
            'fillStyle': '#636e72',
            'text': 'null'
        }, {
            'fillStyle': '#3cb878',
            'text': 'mobile'
        }, {
            'fillStyle': '#636e72',
            'text': 'null'
        }, {
            'fillStyle': '#ffeaa7',
            'text': 'iphone'
        }, {
            'fillStyle': '#636e72',
            'text': 'null'
        }, {
            'fillStyle': '#ff7675',
            'text': 'shoes'
        }, {
            'fillStyle': '#636e72',
            'text': 'null'
        }
    ],
    'animation': // Specify the animation to use.
    {
        'type': 'spinToStop',
        'duration': 5, // Duration in seconds.
        'spins': 3, // Default number of complete spins.
        'callbackFinished': alertPrize,
        'callbackSound': playSound, // Function to call when the tick sound is to be triggered.
        'soundTrigger': 'segment' // Specify pins are to trigger the sound, the other option is 'pins'.
    },
    'pins': // Turn pins on.
    {
        'number': 8, //setPinsNumbers
        'fillStyle': 'silver',
        'outerRadius': 4,
    }
});
// Loads the tick audio sound in to an audio object.
let audio = new Audio('/static/others/tick.mp3');
// This function is called when the sound is to be played.
function playSound() {
    audio.pause();
    audio.currentTime = 0;
    audio.play();
}

let wheelPower = 2;
let wheelSpinning = false;

// -------------------------------------------------------
// Function to handle the onClick on the power buttons.
// -------------------------------------------------------
function powerSelected(powerLevel) {
    // Ensure that power can't be changed while wheel is spinning.
    if (wheelSpinning == false) {
        // Light up the spin button by changing it's source image and adding a clickable class to it.
        // document.getElementById('spin_button').src = "spin_on.png";
        document.getElementById('spin_button').className = "clickable";
    }
}

// -------------------------------------------------------
// Click handler for spin button.
// -------------------------------------------------------
function startSpin() {
    // Ensure that spinning can't be clicked again while already running.
    if (wheelSpinning == false) {
        theWheel.animation.spins = 6;
        document.cookie = `chances= ${Cookies.get('chances')-1}`
            // Disable the spin button so can't click again while wheel is spinning.
        document.getElementById('spin_button').removeEventListener('click', () => {
            if ((chances == 0) || (chances == undefined) || (chances == NaN)) {
                alert("sorry No more chances left\nshare to get some")
            } else {
                startSpin();
                document.getElementById('chances').innerHTML = --chances;

            }
        })
        document.getElementById('spin_button').className = "";
        theWheel.startAnimation();
        wheelSpinning = true;
    }
}

// -------------------------------------------------------
// Function for reset button.
// -------------------------------------------------------
function resetWheel() {
    theWheel.stopAnimation(false); // Stop the animation, false as param so does not call callback function.
    theWheel.rotationAngle = 0; // Re-set the wheel angle to 0 degrees.
    theWheel.draw(); // Call draw to render changes to the wheel.
    wheelSpinning = false; // Reset to false to power buttons and spin can be clicked again.
}

// -------------------------------------------------------
// Called when the spin animation has finished by the callback feature of the wheel because I specified callback in the parameters.
// -------------------------------------------------------
function alertPrize(indicatedSegment) {
    let win = document.getElementsByClassName('windisplay')[0]
    win.style.visibility = 'visible';

    if ((indicatedSegment.text == 'camera') || (indicatedSegment.text == 'mobile') || (indicatedSegment.text == 'iphone') || (indicatedSegment.text == 'shoes')) {
        win.getElementsByClassName('stuff')[0].style.display = 'flex';
        win.getElementsByClassName('lose')[0].style.display = 'none';
        Cookies.set('win', Cookies.get('win') + 1, { expires: 30, path: '' })
        var ext
        if ((indicatedSegment.text == 'mobile') || (indicatedSegment.text == 'shoes')) {
            ext = '.jpg'
        } else {
            ext = '.png'
        }
        let image = '/static/others/' + indicatedSegment.text + ext
        document.getElementById('winimg').src = image;
        document.getElementById('winstuff').innerHTML = indicatedSegment.text;
    } else {
        win.getElementsByClassName('lose')[0].style.display = 'flex';
        win.getElementsByClassName('stuff')[0].style.display = 'none';

    }

    setTimeout(() => {
        win.style.visibility = 'hidden';
    }, 2900)

    //reset
    setTimeout(resetWheel, 500)
}

// post to save data in database of shared
async function saveShare(foo = {}) {
    const response = await fetch('/database', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(foo) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

// web shareing api 
function sharing() {
    if (navigator.share) {
        navigator.share({
                title: document.title,
                url: window.location.href
            }).then(() => {
                console.log('Thanks for sharing!');
                chance = chance + 1
                document.cookie = `share= ${Cookies.get('share')+1}`
                document.cookie = `chances= ${Cookies.get('chances')+1}`
                saveShare({ id: Cookies.get('id'), shared: Cookies.get('share') })


                //     let response = await fetch('/database')
                //     let resinjson = response.json()
                //     let id = resinjson.id
                //     Cookies.set('id', id, { expires: 30, path: '' })
                // }

                fetch('/database')
                    // Cookies.set('share', Cookies.get('share') + 1, { expires: 30, path: '' })
                    // Cookies.set('chances', Cookies.get('chances') + 1, { expires: 30, path: '' })

            })
            .catch(console.error);
    } else {
        alert('your device is unable to share \ntry on other device\nstraight right placed there')
    }
};
document.getElementById('share').addEventListener('click', sharing);

document.getElementById('chances').innerHTML = chances;
document.getElementById('spin_button').addEventListener('click', () => {
    if ((chances == 0) || (chances == undefined) || (chances == 'NaN')) {
        alert("sorry No more chances left\nshare to get some")
    } else {
        startSpin();
        document.getElementById('chances').innerHTML = --chances;

    }
})