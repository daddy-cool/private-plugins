var overwritePlugins =  '(' + function() {
    'use strict';

		var whitelistedPlugins = [
			'Widevine Content Decryption Module',
			'Chrome PDF Viewer',
			'Native Client',
			'Shockwave Flash',
			'Chrome PDF Viewer'
		];

    var navigator = window.navigator;
		console.log(navigator.plugins);
    var modifiedNavigator;
		var modifiedPlugins = Object.create(Object.getPrototypeOf(navigator.plugins));

		function vecw (val, e, c, w) {
			// Makes an object describing a property
			return {
				value: val,
				enumerable: !!e,
				configurable: !!c,
				writable: !!w
			}
		}

		/*var modifiedPluginsCount = 0;
		for (var p in navigator.plugins) {
			var plugin = navigator.plugins[p];
			if (whitelistedPlugins.indexOf(plugin.name) !== -1) {
				modifiedPlugins[p] =  plugin;
			}
		}*/

		//Object.defineProperty(modifiedPlugins.value, "refresh", vecw(function() {}));
		//Object.defineProperties(modifiedPlugins.value, modifiedPluginsList);

		/*Object.defineProperties(modifiedPlugins, {
			length: {
				value: modifiedPluginsCount,
				configurable: false,
				enumerable: true,
				writable: false
			}
		})*/

    Object.defineProperties(navigator.plugins, vecw(modifiedPlugins, true));

		console.log(navigator.plugins);
} + ')();';

document.documentElement.setAttribute('onreset', overwritePlugins);
document.documentElement.dispatchEvent(new CustomEvent('reset'));
document.documentElement.removeAttribute('onreset');
