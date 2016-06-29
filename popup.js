var whitelist = null;
var tab = null;
var domLoaded = false;
var plugins = {};
var host = null;

chrome.storage.sync.get('whitelist', function (data) {
  whitelist = data.whitelist;
  preparePopup();
});

chrome.tabs.query({
  active: true,
  currentWindow: true
}, function (tabs) {
  tab = tabs[0];
  preparePopup();
});

window.addEventListener('DOMContentLoaded', function () {
  domLoaded = true;
  preparePopup();
});

function preparePlugins () {
  for (var p in window.navigator.plugins) {
    if (window.navigator.plugins.hasOwnProperty(p)) {
      plugins[window.navigator.plugins[p].name] = false;
    }
  }
}

function preparePopup () {
  if (!whitelist || !tab || !domLoaded) {
    return;
  }

  var urlObject = new URL(tab.url);
  var hostnameSplitted = urlObject.hostname.split('.');
  host = urlObject.hostname;
  if (hostnameSplitted.length > 1) {
    host = hostnameSplitted[hostnameSplitted.length-2] + '.' + hostnameSplitted[hostnameSplitted.length-1];
  }

  preparePlugins();
  whitelist['*'].forEach(function (whitelistedPlugin) {
    plugins[whitelistedPlugin] = true;
  });

  if (typeof whitelist[host] !== 'undefined') {
    whitelist[host].forEach(function (whitelistedPlugin) {
      plugins[whitelistedPlugin] = true;
    });
  }

  /*document.getElementById('foobar').addEventListener('click', function () {
    console.log("FO");
  });*/
  var table = document.getElementById('table');
  for (var p in plugins) {
    var row = document.createElement('tr');
    var cell0 = document.createElement('td');
    var pluginName = document.createTextNode(p);
    var cell1 = document.createElement('td');
    var enabled = document.createTextNode(plugins[p] ? 'enabled' : 'disabled');
    var cell2 = document.createElement('td');

    if (!plugins[p]) {
      var enable = document.createElement('a');
      var enableText = document.createTextNode('enable');
      enable.appendChild(enableText);
      enable.href = '#';
      enable.onclick=enablePlugin.bind(null, p);
      cell2.appendChild(enable);
    } else {
      var disable = document.createElement('a');
      var disableText = document.createTextNode('disable');
      disable.appendChild(disableText);
      disable.href = '#';
      disable.onclick=disablePlugin.bind(null, p);
      cell2.appendChild(disable);
    }

    cell1.appendChild(enabled);
    cell0.appendChild(pluginName);
    row.appendChild(cell0);
    row.appendChild(cell1);
    row.appendChild(cell2);
    table.appendChild(row);
  }
}

function enablePlugin (plugin) {
  if (typeof whitelist[host] === 'undefined') {
    whitelist[host] = [];
  }
  if (whitelist[host].indexOf(plugin) === -1) {
    whitelist[host].push(plugin);
  }
  chrome.storage.sync.set({whitelist: whitelist}, function () {
    window.location.href="popup.html";
    chrome.tabs.update(tab.id, {url: tab.url});
  });
}

function disablePlugin (plugin) {
  if (typeof whitelist[host] === 'undefined') {
    return;
  }
  var index = whitelist[host].indexOf(plugin);
  var newList = [];
  whitelist[host].forEach(function (whitelistedPlugin) {
    if (whitelistedPlugin && whitelistedPlugin !== plugin) {
      newList.push(whitelistedPlugin);
    }
  });
  whitelist[host] = newList;
  chrome.storage.sync.set({whitelist: whitelist}, function () {
    window.location.href="popup.html";
    chrome.tabs.update(tab.id, {url: tab.url});
  });
}
