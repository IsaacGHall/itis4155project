chrome.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    if (details.url.startsWith("https://www.googleapis.com/books/v1/")) {
      details.requestHeaders.push({
        name: "X-Requested-With",
        value: "XMLHttpRequest",
      });
      return { requestHeaders: details.requestHeaders };
    }
  },
  { urls: ["*://*.googleapis.com/*"] },
  ["requestHeaders", "extraHeaders"]
);
