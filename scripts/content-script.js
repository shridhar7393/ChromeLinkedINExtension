

chrome.runtime.onConnect.addListener(function (port) {
    port.onMessage.addListener(function (msg) {
        if (msg.action === "start") {
            var totalConnections = 0;
            var i = 0;
            var div = document.getElementsByClassName("entity-result__item");
            var timer = setInterval(() => {
                if (i == div.length) clearInterval(this);
                else {
                    var btn = div[i].getElementsByTagName("button");
                    i++;
                    var span = btn[0].getElementsByTagName("span")[0];
                    if (span.innerText === "Connect") {
                        totalConnections++;
                        btn[0].click();
                        var element = document.querySelector('[aria-label="Send now"]');
                        console.log(element);
                        if (element) {
                            element.click();
                        }
                        console.log("Connect " + totalConnections);
                    }
                    port.postMessage({ counter: totalConnections });
                }
            }, 3000);
        } else {
            clearInterval(timer);
        }
    });
});