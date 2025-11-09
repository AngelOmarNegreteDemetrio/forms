module.exports = function (api) {
  api.cache(true);

  return {
    presets: [['babel-preset-expo'], 'nativewind/babel'],

    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            // ✅ AGREGADO: Alias para resolver 'react-dom' en React Native
            'react-dom': '@expo/html-elements', 
            
            // Tus alias existentes se mantienen
            '@': './',
            'tailwind.config': './tailwind.config.js',
          },
        },
      ],
      'react-native-worklets/plugin',
    ],
  };
};