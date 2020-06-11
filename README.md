# LikeBuddy

> Use at your own risk, Twitter is very touchy about batch jobs done outside official APIs

A simple script that let's you batch-unlike tweets.

Please feel free to fork or even copy paste this code to your liking. I made this in an afternoon out of frustration with how long it was taking me to remove likes from an old account. So lots of room for improvement, please don't judge me too harshly.

## Functionality

The script adds a `likeBuddy.unlike()` function to the browser window. The function accepts one argument, an integer, indicating how many tweets you want to 'un-like'. You can see some of the sample console output bellow.

```console
searching for more tweets 🕵️ ...
working... 🔨
4 likes removed 🗑️
--
LikeBuddy deleted likes in: 478ms - timer ended
It found 4 tweets to unlike 💔
```

## How it works

- Finds the tweets in the viewport with the 'liked' attribute. As of this writing, Twitter gives tweets that can be un-liked `div[data-testid="unlike"]`.

```javascript
...
const likedTweetAttribute = 'div[data-testid="unlike"]'
let foundTweets = document.querySelectorAll(likedTweetAttribute);
```

- Simulates a click on each of those tweet's hearts
```javascript
const unlike = async (tweet) => {
    console.log('working... 🔨');
    unliked = unliked + 1;
    updateProgress();
    tweet.click();
}
...
```

- Repeats the process as many times as necessary to match the input target number of tweets

```javascript
...
// scroll to begin loading next batch of tweets
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
```

## Future work

It'd be nice if I had the time to build some sort of GUI instead of having the user interact via the console. Not very elegant. Also I'm a little worried about getting tagged as a bot or somehow getting account feature's limited as a result of bulk-un-liking.

Top reach features I'd love to get to:

- element-selector to batch delete only specific likes
- string parameter than can be used to selectively unlike tweets that include the string
- caching deleted tweet urls into the browser for one-time chance to download them, i.e. a log of all deleted tweet urls
- an interval argument that allows you to set it and forget it, especially useful for those with very old account and _lots_ of likes to delete
- support for deleting tweets, un-retweeting, and other automation tasks.