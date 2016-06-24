var overwritePlugins =  '(' + function() {
    'use strict';

		var whitelistedPlugins = [
			'Widevine Content Decryption Module',
			'Chrome PDF Viewer',
			'Native Client',
      'Shockwave Flash',
			'Chrome PDF Viewer'
		];

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
			if (whitelistedPlugins.indexOf(val.name) !== -1) {
				modifiedPluginsList[modifiedPluginsCount++] =  vecw(typeof(val) == 'function' ? val.bind(window.navigator) : val);
				modifiedPluginsList[val.name] =  vecw(typeof(val) == 'function' ? val.bind(window.navigator) : val);
			}
		}
    modifiedPluginsList.length = vecw(modifiedPluginsCount);

    var modifiedPlugins = Object.create(Object.getPrototypeOf(window.navigator.plugins), modifiedPluginsList);
    Object.defineProperties(window.navigator, {plugins: vecw(modifiedPlugins, true)});
} + ')();';

document.documentElement.setAttribute('onreset', overwritePlugins);
document.documentElement.dispatchEvent(new CustomEvent('reset'));
document.documentElement.removeAttribute('onreset');
