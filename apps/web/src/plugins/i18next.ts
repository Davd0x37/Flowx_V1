import { initReactI18next } from 'react-i18next';

import resources from 'app/i18n';
import i18n from 'i18next';

i18n.use(initReactI18next).init({
  resources,
  lng: 'pl',

  interpolation: {
    escapeValue: false,
  },
});
