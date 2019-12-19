// ==UserScript==
// @name     GDoc on puzzle page
// @include  http://*/*
// ==/UserScript==

var defaultSites =  ["http://web.mit.edu/puzzle/www/*", "https://web.mit.edu/puzzle/www/*"].join('\n');
var defaultWidth = 40;
var defaultVisib = true;

var gettingAllStorageItems = browser.storage.local.get(null);

gettingAllStorageItems.then((res) => {
    var puzzsites = (res.puzzsites || defaultSites);
    var gdocwidth = (res.gdocwidth || defaultWidth);
    var gdocvisib = (res.gdocvisib == null ? defaultVisib : res.gdocvisib);

    var sidebarWidth    = "" + (100-gdocwidth) + "%";

    var hit = puzzsites.split('\n').reduce((hit, s) => hit || window.location.href.match(new RegExp(s)), null);

    if (hit) {
        document.getElementsByTagName("html")[0].style.position = "relative";

        elems = addIframe("spGdocPanel", "spSidebar", sidebarWidth, gdocvisib);
        div = elems.div;
        iframe = elems.iframe;

        //-- Keyboard shortcut to show/hide our sidebar
        addListener(115, () => toggleSidebar(div));

        getJSON().then(
          (data) => setIframe(iframe, data, "puzzle_uri", "drive_uri", (x) => `${x}&rm=embedded`)
        );

    } 
}) 
