/**
 * React App Rewired Config
 */
module.exports = {
  // Update webpack config to use custom loader for .json5 files
  webpack: (config) => {
    // Add .json5 file extension support
    config.resolve.extensions.push('.json5');

    // Add .json5 file processing support
    config.module.rules[1].oneOf.unshift({
      loader: 'json5-loader',
      test: /\.json5$/i,
      type: 'javascript/auto',
    });

    return config;
  },
};
