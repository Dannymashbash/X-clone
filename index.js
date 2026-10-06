import { xData } from '/data.js'

const xInput = document.getElementById('x-input')
const xBtn = document.getElementById('x-btn')

xBtn.addEventListener('click', function () {
    console.log(xInput.value)
})

function getFeedHtml() {

    let feedHtml = ``

    xData.forEach(function (x) {
        feedHtml += `
                <div class="tweet">
            <div class="tweet-inner">
                <img src=${x.profilePic} class="profile-pic">
                <div>
                    <p class="handle">${x.handle} </p>
                    <p class="tweet-text">${x.tweetText} </p>
                    <div class="tweet-details">
                        <span class="tweet-detail">
                            ${x.replies.length} 
                        </span>
                        <span class="tweet-detail">
                             ${x.likes}
                        </span>
                        <span class="tweet-detail">
                             ${x.retweets}
                        </span>
                    </div>   
                </div>            
            </div>
        </div>
        `
    })

    return feedHtml
}

function render() {
    document.getElementById('feed').innerHTML = getFeedHtml()
}

render()

