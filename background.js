chrome.webRequest.onSendHeaders.addListener((details) => {
    const { requestHeaders = [], url, tabId } = details;
    
    const refererHeader = requestHeaders.find(header => header.name === "Referer");
    const refererValue = refererHeader ? refererHeader.value : "";
    
    const urlParams = new URL(url).searchParams;
    const peerSubmissionIdParam = urlParams.get("peerSubmissionId");
    const submissionId = peerSubmissionIdParam ? peerSubmissionIdParam.split("~")[2] : "";

    const reviewUrlBase = refererValue.replace(/\/submit$/, "/review");

    if (url.includes("onDemandPeer") && submissionId && reviewUrlBase) {
        let shareLink = "";
        
        if (!reviewUrlBase.endsWith(submissionId) && reviewUrlBase.endsWith("/review")) {
            shareLink = `${reviewUrlBase}/${submissionId}`;
        } else if (!reviewUrlBase.includes(submissionId) && !reviewUrlBase.includes("/review")) {
            shareLink = `${reviewUrlBase}/review/${submissionId}`;
        }

        chrome.tabs.sendMessage(tabId, { Link: shareLink || reviewUrlBase });
    }
}, 
{ urls: ["https://www.coursera.org/*"] }, 
["requestHeaders"]);