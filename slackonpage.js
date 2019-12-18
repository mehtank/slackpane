// ==UserScript==
// @name     Slack on page
// @include  http://*/*
// ==/UserScript==

var defaultSites =  ["http://web.mit.edu/puzzle/www/*", "https://web.mit.edu/puzzle/www/*"].join('\n');
var defaultWidth = 50;
var defaultVisib = true;

var gettingAllStorageItems = browser.storage.local.get(null);

gettingAllStorageItems.then((res) => {
    var slacksites = (res.slacksites || defaultSites);
    var slackwidth = (res.slackwidth || defaultWidth);
    var slackvisib = (res.slackvisib == null ? defaultVisib : res.slackvisib);

    var sidebarWidth    = "" + (100-slackwidth) + "%";

    var hit = slacksites.split('\n').reduce((hit, s) => hit || window.location.href.match(new RegExp(s)), null);

    if (hit) {
        document.getElementsByTagName("html")[0].style.position = "relative";

        elems = addIframe("spRightPanel", "spSidebar", sidebarWidth, slackvisib);
        div = elems.div;
        iframe = elems.iframe;

        //-- Keyboard shortcut to show/hide our sidebar
        addListener(115, () => toggleSidebar(div));

        getJSON().then(
          (data) => setIframe(iframe, data, "puzzle_uri", "drive_uri", (x) => `${x}&rm=embed`)
        );

    } 
}) 
