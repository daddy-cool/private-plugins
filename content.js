chrome.storage.sync.get('whitelist', function (data) {
  var overwritePlugins =  '(' + function (data) {
      'use strict';

  		function vecw (val, e, c, w) {
  			// Makes an object describing a property
  			return {
  				value: val,
  				configurable: !!c,
  				enumerable: !!e,
  				writable: !!w
  			}
  		}

      var modifiedPluginsList = {};
      var modifiedPluginsCount = 0;
      for (var p in window.navigator.plugins) {
  			var val = window.navigator.plugins[p];
  			if (data.whitelist.global.indexOf(val.name) !== -1) {
  				modifiedPluginsList[modifiedPluginsCount++] =  vecw(typeof(val) == 'function' ? val.bind(window.navigator) : val);
  				modifiedPluginsList[val.name] =  vecw(typeof(val) == 'function' ? val.bind(window.navigator) : val);
  			}
  		}
      modifiedPluginsList.length = vecw(modifiedPluginsCount);

      var modifiedPlugins = Object.create(Object.getPrototypeOf(window.navigator.plugins), modifiedPluginsList);
      Object.defineProperties(window.navigator, {plugins: vecw(modifiedPlugins, true)});
  } + ')(' + JSON.stringify(data) + ');';

  document.documentElement.setAttribute('onreset', overwritePlugins);
  document.documentElement.dispatchEvent(new CustomEvent('reset'));
  document.documentElement.removeAttribute('onreset');
});
