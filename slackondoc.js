var defaultWidth = 50; 
var defaultVisib = true;

var gettingAllStorageItems = browser.storage.local.get(null);
var gj = getJSON();

Promise.all([gettingAllStorageItems, gj]).then((arr) => {
    res = arr[0];
    var slackwidth = (res.slackwidth || defaultWidth);
    var slackvisib = (res.slackvisib == null ? defaultVisib : res.slackvisib);

    data = arr[1];
    var slacksites = data.map(({ drive_id }) => drive_id);
    console.log(slacksites);

    var sidebarWidth    = "" + (100-slackwidth) + "%";

    var hit = slacksites.reduce((hit, s) => hit || window.location.href.includes(s), false);

    if (hit) {

        document.getElementsByTagName("html")[0].style.position = "relative";

        elems = addIframe("spRightPanel", "spSidebar", sidebarWidth, slackvisib);
        div = elems.div;
        iframe = elems.iframe;

        //-- Keyboard shortcut to show/hide our sidebar
        addListener(115, () => toggleSidebar(div));

        setIframe(iframe, data, "drive_uri", "slack_channel_id", (x) => `https://app.slack.com/client/T0G3PD729/${x}`);

    } 
}) 
