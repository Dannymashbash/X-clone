import { xData } from '/data.js'

const xInput = document.getElementById('x-input')
const xBtn = document.getElementById('x-btn')

xBtn.addEventListener('click', function () {
    console.log(xInput.value)
})

document.addEventListener('click', function (event) {
    if (event.target.dataset.like) {
        handleLikeClick(event.target.dataset.like)
    } else if (event.target.dataset.retweet) {
        handleRetweetClick(event.target.dataset.retweet)
    } else if(event.target.dataset.reply){
        handleReplyClick(event.target.dataset.reply)
    }
})

function handleLikeClick(likeId) {
    const targetXData = xData.filter(function (x) {
        return x.uuid === likeId
    })[0]

    if (targetXData.isLiked) {
        targetXData.likes--
    }
    else {
        targetXData.likes++
    }
    targetXData.isLiked = !targetXData.isLiked

    render()
}

function handleRetweetClick(retweetId) {
    const targetXData = xData.filter(function (x) {
        return x.uuid === retweetId
    })[0]

    if (targetXData.isRetweeted) {
        targetXData.retweets--
    }
    else {
        targetXData.retweets++
    }
    targetXData.isRetweeted = !targetXData.isRetweeted

    render()
}

function handleReplyClick(replyId){
document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
}


function getFeedHtml() {

    let feedHtml = ``

    xData.forEach(function (x) {

        let likeIconClass = ''
        let retweetIconClass = ''

        if (x.isLiked) {
            likeIconClass = 'liked'
        }

        if (x.isRetweeted) {
            retweetIconClass = 'retweeted'
        }

        let repliesHtml = ''

        if (x.replies.length > 0) {
            x.replies.forEach(function(reply){
                repliesHtml += `
                <div class="x-reply">
                    <div class="x-inner">
                        <img src="${reply.profilePic}" class="profile-pic">
                            <div>
                                <p class="handle">${reply.handle}</p>
                                <p class="x-text">${reply.tweetText}</p>
                            </div>
                    </div>
                </div>
                `
            })
            

        }


        feedHtml += `
            <div class="x">
            <div class="x-inner">
                <img src=${x.profilePic} class="profile-pic">
                <div>
                    <p class="handle">${x.handle} </p>
                    <p class="x-text">${x.tweetText} </p>
                    <div class="x-details">
                        <span class="x-detail">
                         <i class="fa-regular fa-comment-dots" data-reply= "${x.uuid}"></i>
                            ${x.replies.length} 
                        </span>
                        <span class="x-detail">
                         <i class="fa-solid fa-heart ${likeIconClass}" data-like= "${x.uuid}"></i>
                             ${x.likes}
                        </span>
                        <span class="x-detail">
                         <i class="fa-solid fa-retweet  ${retweetIconClass}" data-retweet= "${x.uuid}"></i>
                             ${x.retweets}
                        </span>
                    </div>   
                </div>            
            </div>
            <div class="hidden" id="replies-${x.uuid}">
                ${repliesHtml}
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

