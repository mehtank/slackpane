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
        function keyboardShortcutHandler (zEvent) {
            //--- On F4, Toggle our panel's visibility
            if (zEvent.which == 115) {  // F4
                toggleSidebar(elem);
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

        toggleSidebar(elem);

        elem.appendChild(iframe);
        document.body.appendChild(elem);
        //-- Keyboard shortcut to show/hide our sidebar
        document.addEventListener('keydown', keyboardShortcutHandler);

        getJSON((data) => setIframe(iframe, data, "puzzle_uri", "drive_uri", (x) => `${x}&rm=embed`));

    } // if (hit)
}) // gettingAllStorageItems.then()
