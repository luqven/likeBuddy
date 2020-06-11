/**
 * 
 * Created by Luis Ball - contact.luis@icloud.com
 * MIT License
 * 
 */

let unlikables  = 0;
let unliked = 0;
let tweetsToUnlike = [];

function getDocHeight() {
    // borrowed from https://stackoverflow.com/questions/3898130/check-if-a-user-has-scrolled-to-the-bottom
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    );
}

// scroll to the calculated maximum height - accounts for infini-scrolling
function scrollToBottom() {
    window.scrollTo(0, getDocHeight());
};

// simple log helpers to give user sense of progress
const updateProgress = () => {
    console.log(`${unliked} likes removed 🗑️`)
}
const notifyStart = () => {
    console.time("LikeBuddy deleted likes in");
    console.log('searching for more tweets 🕵️ ...')
}

const notifyEnd = () => {
    console.log("-- \n LikeBuddy found " + unlikables + " tweets to unlike 💔 \n")
}

// click on the "heart" icon on the tweet
const unlike = async (tweet) => {
    console.log('working... 🔨');
    unliked = unliked + 1;
    updateProgress();
    tweet.click();
}

// find and remove likes from max number of tweets
async function findAndRemove(max=30) {
    // abort if max is not an integer integer
    if (typeof max !== 'number') {
        console.log('Invalid input 🚨 \n Please enter the number of likes you want to remove.')
        return;
    }
    notifyStart();
    // store maximum number of visible tweets that have been liked
    // note - twitter does some fancy caching, this is not 100% reliable
    const likedTweetAttribute = 'div[data-testid="unlike"]'
    let foundTweets = document.querySelectorAll(likedTweetAttribute);
    // scroll to begin loading next batch of tweets
    scrollToBottom()
    foundTweets.forEach((node) => {
        let nodeData = node.attributes["data-testId"].value;
        // if tweet has been liked, use helped to remove the like
        if (nodeData === "unlike") {
            unlikables += 1
            unlike(node);
        }
    })

    // recurse if at least 1 liked tweet was found and we are still bellow the max
    if (foundTweets.length > 0 && unlikables < max) {
        scrollToBottom();
        /**
        * an interval is established here to avoid:
        * a) being mistaken for a bot, and
        * b) allow for lazy-lading assets to finish rendering
        */
        var counter = 3;
        var scrollBuffer = setInterval(function () {
            counter--
            if (counter === 0) {
                findAndRemove(max);
                clearInterval(scrollBuffer);
            }
        }, 1000);

    // if no liked tweets visible on the page, alert user and reset count
    } else if (foundTweets.length === 0) {
            unlikables = 0;
            unliked = 0;
            console.log('No unlikable tweets available 🚨')
    }

    console.timeEnd("LikeBuddy deleted likes in")
    notifyEnd();
};

const likeBuddy = {
    unlike: (num) => {
        findAndRemove(num)
    },
}

// Example usage
// likeBuddy.unlike(20) => searches for an unliked 20 tweets on the page

window.likeBuddy = likeBuddy;