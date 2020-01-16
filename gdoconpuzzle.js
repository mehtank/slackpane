var gettingAllStorageItems = browser.storage.local.get(null);

gettingAllStorageItems.then((res) => {
    var puzzsites = (res.puzzsites || defaultSites);
    var gdocwidth = (res.gdocwidth || defaultGWidth);
    var gdocvisib = (res.gdocvisib == null ? defaultGVisib : res.gdocvisib);

    var sidebarWidth    = "" + (100-gdocwidth) + "%";

    var hit = puzzsites.split('\n').reduce((hit, s) => hit || window.location.href.match(new RegExp(s)), null);
    // Only hit pages that are text and/or html
    hit = hit && (/(text|html)/i.test(document.contentType));

    if (hit) {
        document.getElementsByTagName("html")[0].style.position = "relative";

        elems = addIframe("spGdocPanel", "spSidebar", sidebarWidth, false);
        div = elems.div;
        iframe = elems.iframe;

        getJSON().then(
          (data) => {
            found = setIframe(iframe, data, "puzzle_uri", "drive_uri", (x) => `${x}&rm=embedded`);
            if (found && gdocvisib) toggleSidebar(div);
          }
        );

    } 
}) 
