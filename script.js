function str(t) {
    return t.toString()
}

function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function getIdea() {
    console.log("grabbing idea")
    res = httpGet("http://api.reddit.com/r/AppIdeas/random/.json")
    res = JSON.parse(res)[0]['data']['children'][0]['data']
    data = JSON.stringify(res).toLowerCase()
    critUnmatch = document.getElementById("critUnmatch")
    pageTitle = document.getElementById("ptitle")
    titleEl = document.getElementById("title")
    bodyEl = document.getElementById("body")
    postEl = document.getElementById("post")
    titleEl.innerText = res.title
    bodyEl.innerText = res.selftext
    postEl.href = "https://www.reddit.com" + res.permalink
    feedbackRequest = data.includes('Feedback request')
    dating = data.includes('dating')
    download = data.includes('download')
    alreadybuilt = data.includes('i built') || data.includes('introducing') || data.includes('i created')
    omegle = data.includes('omegle')
    findingDev = data.includes('find') && data.includes('dev')
    poll = data.includes('reddit.com/poll')
    askingFor = data.includes('tell me')
    testers = data.includes('testers')
    unsureIfRight = data.includes('right place to ask this question')
    stringied = str(feedbackRequest) + str(dating) + str(findingDev) + str(alreadybuilt) + str(omegle) + str(findingDev) + str(poll) + str(testers) + str(unsureIfRight)
    arrayd = [dating, feedbackRequest, alreadybuilt, omegle, askingFor, findingDev, poll, testers]
    console.log(stringied)
    if (stringied.includes("true")) {
        pageTitle.innerText = "This idea does not meet the criteria"
        critUnmatch.hidden = false
        i = 0
        for (let el of document.querySelectorAll("#critUnmatch input")) {
            el.checked  = arrayd[i]
            i++
        }
    } else {
        pageTitle.innerText = "Here is your idea!"
        critUnmatch.hidden = true
    }
}

document.getElementById("rollAgain").addEventListener("click", getIdea)
