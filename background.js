var regexpesarray =  ["http://*.slack.com/*", "https://*.slack.com/*", "http://slack.com/*", "https://slack.com/*"]
var regstr_fancestor =  ["http://*","http://*:*", "https://*","https://*:*", "file://*"].join(" ")

function updateRegexpes() {
    browser.webRequest.onHeadersReceived.removeListener(setHeader)
    browser.webRequest.onHeadersReceived.addListener(
        setHeader,
        {urls : regexpesarray},
        ["blocking", "responseHeaders"]
    );
}

function setHeader(e) {
	var headersdelete = ["content-security-policy","x-frame-options"]
	var cspval="";
	e.responseHeaders= e.responseHeaders.filter(x=>{
		var lowername = x.name.toLowerCase();
		cspval = lowername === headersdelete[0]?x.value:cspval
		return !headersdelete.includes(lowername)
	})
	e.responseHeaders.push({
		name: "x-frame-options",
		value: "ALLOW"
	});
	e.responseHeaders.push({
		name: "content-security-policy",
		value: cspval.includes("frame-ancestors")?
			cspval.replace(/frame-ancestors[^;]*;?/, "frame-ancestors "+regstr_fancestor+";")
				:
			"frame-ancestors "+regstr_fancestor+";"+cspval
  	}); 	
  	return {responseHeaders: e.responseHeaders};
}
// Listen for onHeaderReceived for the target page.
// Set "blocking" and "responseHeaders".
updateRegexpes();
