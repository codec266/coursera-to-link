chrome.runtime.onMessage.addListener((message) => {
    if (!message.hasOwnProperty("Link")) return;

    setTimeout(() => {
        if (document.getElementById("sharelink")) return; 

        const tabList = document.querySelector('div[role="tablist"]');
        if (tabList) {
            tabList.insertAdjacentHTML("beforeend", `
                <button class="cds-116 cds-212 cds-214 css-xuc6go" tabindex="-1" type="button" role="tab" aria-selected="false" variant="primary" id="sharelink" style="cursor: pointer;">
                    <span class="cds-221 cds-tab-wrapper">Share</span>
                </button>
            `);

            const shareBtn = document.getElementById('sharelink');
            
            shareBtn.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();

                navigator.clipboard.writeText(message.Link)
                    .then(() => alert('Link copied to clipboard!!!'))
                    .catch((error) => alert('Failed to copy link: ' + error));
            });
        }
    }, 1000);
});