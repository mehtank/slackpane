var defaultSites =  ["http://web.mit.edu/puzzle/www/*", "https://web.mit.edu/puzzle/www/*"].join('\n');
var defaultWidth = 60;
var defaultVisib = true;

browser.storage.local.get("slacksites", function(res) {
  var slacksites = (res.slacksites || defaultSites);
  elem = document.querySelector("#slacksites")
  if (elem) elem.value=slacksites;
});

browser.storage.local.get("slackwidth", function(res) {
  var slackwidth = (res.slackwidth || defaultWidth);
  elem = document.querySelector("#slackwidth")
  if (elem) elem.value=slackwidth;
});

browser.storage.local.get("slackvisib", function(res) {
  var slackvisib = (res.slackvisib == null ? defaultVisib : res.slackvisib);
  elem = document.querySelector("#slackvisib")
  if (elem) elem.checked=slackvisib;
});

window.onload= function()
{
  inpt = document.querySelector("#slackwidth");
  text = document.querySelector("#slacksites");
  visb = document.querySelector("#slackvisib");

  inpt.onkeyup = inpt.onchange = text.onkeyup = text.onchange = visb.onkeyup = visb.onchange 
  = function(){
    sites = text.value.trim();
    width = inpt.value;
    visib = visb.checked;

    browser.storage.local.set( { "slacksites":sites, } )
    browser.storage.local.set( { "slackwidth":width, } )
    browser.storage.local.set( { "slackvisib":visib, } )

    console.log("Set: " + sites + "\nand\n" + width + "\nand\n" + visib);
  }
}
