module.exports = function (context, options) {
  return {
    name: 'gtag-virtual-pageview-plugin',
    getClientModules() {
      return [require.resolve('./gtag-virtual-pageview-client.js')];
    },
  };
};