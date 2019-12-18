var defaultSites =  ["http://web.mit.edu/puzzle/www/*", "https://web.mit.edu/puzzle/www/*"].join('\n');
var defaultSlackWidth = 50;
var defaultGDocWidth = 40;
var defaultVisib = true;

browser.storage.local.get("puzzsites", function(res) {
  var puzzsites = (res.puzzsites || defaultSites);
  elem = document.querySelector("#puzzsites")
  if (elem) elem.value=puzzsites;
});

browser.storage.local.get("slackwidth", function(res) {
  var slackwidth = (res.slackwidth || defaultSlackWidth);
  elem = document.querySelector("#slackwidth")
  if (elem) elem.value=slackwidth;
});

browser.storage.local.get("slackvisib", function(res) {
  var slackvisib = (res.slackvisib == null ? defaultVisib : res.slackvisib);
  elem = document.querySelector("#slackvisib")
  if (elem) elem.checked=slackvisib;
});

browser.storage.local.get("gdocwidth", function(res) {
  var gdocwidth = (res.gdocwidth || defaultGDocWidth);
  elem = document.querySelector("#gdocwidth")
  if (elem) elem.value=gdocwidth;
});

browser.storage.local.get("gdocvisib", function(res) {
  var gdocvisib = (res.gdocvisib == null ? defaultVisib : res.gdocvisib);
  elem = document.querySelector("#gdocvisib")
  if (elem) elem.checked=gdocvisib;
});

window.onload= function() {
  text = document.querySelector("#puzzsites");
  s_inpt = document.querySelector("#slackwidth");
  s_visb = document.querySelector("#slackvisib");
  g_inpt = document.querySelector("#gdocwidth");
  g_visb = document.querySelector("#gdocvisib");

  text.onkeyup = text.onchange = 
    s_inpt.onkeyup = s_inpt.onchange = 
    s_visb.onkeyup = s_visb.onchange =
    g_inpt.onkeyup = g_inpt.onchange = 
    g_visb.onkeyup = g_visb.onchange =
      function(){
        sites = text.value.trim();
        s_width = s_inpt.value;
        s_visib = s_visb.checked;
        g_width = g_inpt.value;
        g_visib = g_visb.checked;

        browser.storage.local.set( { "puzzsites":sites, } )
        browser.storage.local.set( { "slackwidth":s_width, } )
        browser.storage.local.set( { "slackvisib":s_visib, } )
        browser.storage.local.set( { "gdocwidth":g_width, } )
        browser.storage.local.set( { "gdocvisib":g_visib, } )
      }
}
