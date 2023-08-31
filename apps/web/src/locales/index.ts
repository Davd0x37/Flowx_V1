// import { Services, User } from 'app/features';
import en from './en.json';
import pl from './pl.json';

// const features = {
//   en: {
//     ...Services.locales.en,
//     ...User.locales.en,
//   },
//   pl: {
//     ...Services.locales.pl,
//     ...User.locales.pl,
//   },
// };

// const features = installFeatures('locales', [AuthenticateFeature, ServicesFeature, UserFeature])

export default {
  en: {
    ...en,
    // ...features.en,
  },
  pl: {
    ...pl,
    // ...features.pl,
  },
};
