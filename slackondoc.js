var gettingAllStorageItems = browser.storage.local.get(null);
var gj = getJSON();

Promise.all([gettingAllStorageItems, gj]).then((arr) => {
    res = arr[0];
    var slackwidth = (res.slackwidth || defaultSWidth);
    var slackvisib = (res.slackvisib == null ? defaultSVisib : res.slackvisib);

    data = arr[1];
    var slacksites = data.map(({ drive_id }) => drive_id);

    var sidebarWidth    = "" + (100-slackwidth) + "%";

    var hit = slacksites.reduce((hit, s) => hit || window.location.href.includes(s), false);

    if (hit) {

        document.getElementsByTagName("html")[0].style.position = "relative";

        // addIframe(divid, ifclass, width, visible, toggle=115, resizeContainer=true, container=document.body) {
        elems = addIframe("spSlackPanel", "spSidebar", sidebarWidth, slackvisib, 115, false);
        iframe = elems.iframe;

        setIframe(iframe, data, "drive_uri", "slack_channel_id", (x) => `https://app.slack.com/client/T0G3PD729/${x}`);

    } 
}) 
