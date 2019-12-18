// ==UserScript==
// @name     Slack on page
// @include  http://*/*
// ==/UserScript==

var defaultSites =  ["http://web.mit.edu/puzzle/www/*", "https://web.mit.edu/puzzle/www/*"].join('\n');
var defaultWidth = 60;
var defaultVisib = true;

var gettingAllStorageItems = browser.storage.local.get(null);

gettingAllStorageItems.then((res) => {
    var slacksites = (res.slacksites || defaultSites);
    var slackwidth = (res.slackwidth || defaultWidth);
    var slackvisib = (res.slackvisib == null ? defaultVisib : res.slackvisib);

    var sidebarWidth    = "" + (100-slackwidth) + "%";

    var hit = slacksites.split('\n').reduce((hit, s) => hit || window.location.href.match(new RegExp(s)), null);

    if (hit) {

        function setiframe(data) {
            function search(puzz) {
                parser = document.createElement('a');
                parser.href = puzz.puzzle_uri;
                return !parser.hostname.includes("ignore.ignore") && window.location.href.includes(parser.pathname);
            }
            puzzdata = data.filter(search);
            console.log(puzzdata);
            iframe.src = puzzdata[0].drive_uri + "&rm=embed";
        }

        function togglediv() {
            if (elem.hasAttribute('hidden')) {
                elem.removeAttribute('hidden');
                document.getElementsByTagName("html")[0].style.width = "calc(100% - " + elem.style.width + ")";
            } else {
                elem.setAttribute('hidden', 'true');
                document.getElementsByTagName("html")[0].style.width = "100%";
            }
        }

        function keyboardShortcutHandler (zEvent) {
            //--- On F4, Toggle our panel's visibility
            if (zEvent.which == 115) {  // F4
                togglediv();
                zEvent.preventDefault ();
                zEvent.stopPropagation ();
                return false;
            }
        }


        document.getElementsByTagName("html")[0].style.position = "relative";

        var iframe = document.createElement('iframe');
        iframe.className = "sidebar";

        var elem = document.createElement('div');
        elem.id = "slackbar";
        elem.style.width    = sidebarWidth;
        if (slackvisib) elem.setAttribute('hidden', 'true');

        togglediv();

        elem.appendChild(iframe);
        document.body.appendChild(elem);
        //-- Keyboard shortcut to show/hide our sidebar
        document.addEventListener('keydown', keyboardShortcutHandler);

        var request = new XMLHttpRequest();
        request.open('GET', 'https://wind-up-birds.org/puzzleboss/bin/pbrest.pl/puzzles/*', true);
        request.onload = function() {
            if (request.status >= 200 && request.status < 400) 
                setiframe(JSON.parse(request.responseText));
            else 
                console.log("We reached our target server, but it returned an error.");
        };
        request.onerror = function() {
            console.log("There was a connection error of some sort");
        };
        request.send();

    } // if (hit)
}) // gettingAllStorageItems.then()
