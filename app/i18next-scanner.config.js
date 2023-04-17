module.exports = {
    input: [
      'src/**/*.{js,jsx}',
      // Add any other file extensions that contain translatable strings
    ],
    output: './public/locales/$LOCALE/$NAMESPACE.json',
    options: {
      debug: true,
      removeUnusedKeys: false,
      func: {
        list: ['t', 'i18next.t'],
        extensions: ['.js', '.jsx'],
      },
      trans: {
        component: 'Trans',
        extensions: ['.js', '.jsx'],
      },
      lngs: ['en', 'fr', 'hu', 'es', 'jp', 'ch', 'nl', 'de', 'kr', 'sk', 'pt', 'it'], // Add any other languages you want to support
      defaultLng: 'en',
      ns: ['translation'],
      defaultNs: 'translation',
      defaultValue: '',
      resource: {
        loadPath: 'public/locales/{{lng}}/{{ns}}.json',
        savePath: 'public/locales/{{lng}}/{{ns}}.json',
        jsonIndent: 2,
        lineEnding: '\n',
      },
      nsSeparator: false,
      keySeparator: false,
      interpolation: {
        prefix: '{{',
        suffix: '}}',
      },
    },
  };
  