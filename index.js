import { xData } from '/data.js'

const xInput = document.getElementById('x-input')
const xBtn = document.getElementById('x-btn')

xBtn.addEventListener('click', function () {
    console.log(xInput.value)
})

document.addEventListener('click', function(event){
 if(event.target.dataset.like){
    handleLikeClick(event.target.dataset.like)
 }
}) 

function handleLikeClick(xID){
console.log(xID)
}

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
                         <i class="fa-regular fa-comment-dots" data-reply= "${x.uuid}"></i>
                            ${x.replies.length} 
                        </span>
                        <span class="tweet-detail">
                         <i class="fa-solid fa-heart" data-like= "${x.uuid}"></i>
                             ${x.likes}
                        </span>
                        <span class="tweet-detail">
                         <i class="fa-solid fa-retweet" data-retweet= "${x.uuid}"></i>
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

