chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let matchUrl = tabs[0].url.match("https://www.linkedin.com/search/results/people/");
    if (matchUrl) {
        document.getElementById("notApplicable").classList.add("none");
        document.getElementById("main").classList.remove("none");
    } else {
        document.getElementById("main").classList.add("none");
        document.getElementById("notApplicable").classList.remove("none");

    }
});

let startBtnShow = false;
const toggler = function () {
    if (startBtnShow) {
        document.getElementById("btn1").classList.remove("none");
        document.getElementById("btn2").classList.add("none");
        startBtnShow = !startBtnShow;
    } else {
        document.getElementById("btn1").classList.add("none");
        document.getElementById("btn2").classList.remove("none");
        startBtnShow = !startBtnShow;
    }

}
function draw_progress(progress) {
    var pie = document.getElementById("pie1");
    var ls = document.getElementById("ls");
    var rs = document.getElementById("rs");
    ls.style.transform = "rotate(" + progress + "deg)";
    if (progress > 180) {
        pie.classList.remove("clipper");
        rs.style.transform = "rotate(180deg)";
    } else {
        if (!pie.classList.contains("clipper"))
            pie.classList.add("clipper");
    }

}

var counter = 0;
document.getElementById("countText").innerText = counter;

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

    var port = chrome.tabs.connect(tabs[0].id);
    var sendMessage = function (actionVal) {
        port.postMessage({ counter: counter, action: actionVal });
        port.onMessage.addListener(function getResp(response) {
            if (!chrome.runtime.lastError) {
                if (response.counter <= 10) {
                    document.getElementById("countText").innerText = response.counter;
                    draw_progress(response.counter * 36);
                    console.log(response);
                }
                else {
                    port.postMessage({ action: "stop" });
                }
            }
        });

    }
    function waitForLoad(id, callback) {
        var timer = setInterval(function () {
            if (document.getElementById(id)) {
                clearInterval(timer);
                callback();
            }
        }, 100);
    }

    waitForLoad("btn1", function () {
        document.getElementById("btn1").onclick = function () {
            toggler();
            sendMessage("start");
        }
    });
    waitForLoad("btn2", function () {
        document.getElementById("btn2").onclick = function () {
            toggler();
            sendMessage("stop");
        }
    });



});





