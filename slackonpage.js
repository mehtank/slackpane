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
    document.getElementsByTagName("html")[0].style.position = "relative";

    var elem = document.createElement('div');
    elem.id = "gmRightSideBar";
    elem.innerHTML = '<iframe width="100%" height="100%" src="https://app.slack.com/client/T0G3PD729/C0G3QKPK5"></iframe>';
    elem.style.position = "fixed";
    elem.style.top      = 0;
    elem.style.right    = 0;
    elem.style.height   = "100%";
    elem.style.width    = sidebarWidth;
    elem.style.overflow = "hidden";
    elem.style.resize   = "horizontal";
    elem.style.direction= "rtl";

    if (slackvisib) {
      document.getElementsByTagName("html")[0].style.width = "calc(100% - " + elem.style.width + ")";
    } else {
      document.getElementsByTagName("html")[0].style.width = "100%";
      elem.setAttribute('hidden', 'true');
    }

    document.body.appendChild(elem);

    //-- Keyboard shortcut to show/hide our sidebar
    document.addEventListener('keydown', keyboardShortcutHandler);

    function keyboardShortcutHandler (zEvent) {
        //--- On F4, Toggle our panel's visibility
        if (zEvent.which == 115) {  // F4
            if (elem.hasAttribute('hidden')) {
              elem.removeAttribute('hidden');
              document.getElementsByTagName("html")[0].style.width = "calc(100% - " + elem.style.width + ")";
            } else {
              elem.setAttribute('hidden', 'true');
              document.getElementsByTagName("html")[0].style.width = "100%";
            }
            zEvent.preventDefault ();
            zEvent.stopPropagation ();
            return false;
        }
    }

  }
})
