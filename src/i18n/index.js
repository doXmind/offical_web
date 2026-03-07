import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// English
import enCommon from './locales/en/common.json';
import enHome from './locales/en/home.json';
import enAbout from './locales/en/about.json';
import enGuide from './locales/en/guide.json';
import enPrivacy from './locales/en/privacy.json';
import enNotfound from './locales/en/notfound.json';
import enChangelog from './locales/en/changelog.json';
import enMock from './locales/en/mock.json';
import enTeam from './locales/en/team.json';
import enAuth from './locales/en/auth.json';
import enDashboard from './locales/en/dashboard.json';

// Chinese
import zhCommon from './locales/zh/common.json';
import zhHome from './locales/zh/home.json';
import zhAbout from './locales/zh/about.json';
import zhGuide from './locales/zh/guide.json';
import zhPrivacy from './locales/zh/privacy.json';
import zhNotfound from './locales/zh/notfound.json';
import zhChangelog from './locales/zh/changelog.json';
import zhMock from './locales/zh/mock.json';
import zhTeam from './locales/zh/team.json';
import zhAuth from './locales/zh/auth.json';
import zhDashboard from './locales/zh/dashboard.json';

// French
import frCommon from './locales/fr/common.json';
import frHome from './locales/fr/home.json';
import frAbout from './locales/fr/about.json';
import frGuide from './locales/fr/guide.json';
import frPrivacy from './locales/fr/privacy.json';
import frNotfound from './locales/fr/notfound.json';
import frChangelog from './locales/fr/changelog.json';
import frMock from './locales/fr/mock.json';
import frTeam from './locales/fr/team.json';
import frAuth from './locales/fr/auth.json';
import frDashboard from './locales/fr/dashboard.json';

// Japanese
import jaCommon from './locales/ja/common.json';
import jaHome from './locales/ja/home.json';
import jaAbout from './locales/ja/about.json';
import jaGuide from './locales/ja/guide.json';
import jaPrivacy from './locales/ja/privacy.json';
import jaNotfound from './locales/ja/notfound.json';
import jaChangelog from './locales/ja/changelog.json';
import jaMock from './locales/ja/mock.json';
import jaTeam from './locales/ja/team.json';
import jaAuth from './locales/ja/auth.json';
import jaDashboard from './locales/ja/dashboard.json';

// Korean
import koCommon from './locales/ko/common.json';
import koHome from './locales/ko/home.json';
import koAbout from './locales/ko/about.json';
import koGuide from './locales/ko/guide.json';
import koPrivacy from './locales/ko/privacy.json';
import koNotfound from './locales/ko/notfound.json';
import koChangelog from './locales/ko/changelog.json';
import koMock from './locales/ko/mock.json';
import koTeam from './locales/ko/team.json';
import koAuth from './locales/ko/auth.json';
import koDashboard from './locales/ko/dashboard.json';

// Spanish
import esCommon from './locales/es/common.json';
import esHome from './locales/es/home.json';
import esAbout from './locales/es/about.json';
import esGuide from './locales/es/guide.json';
import esPrivacy from './locales/es/privacy.json';
import esNotfound from './locales/es/notfound.json';
import esChangelog from './locales/es/changelog.json';
import esMock from './locales/es/mock.json';
import esTeam from './locales/es/team.json';
import esAuth from './locales/es/auth.json';
import esDashboard from './locales/es/dashboard.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: enCommon, home: enHome, about: enAbout, team: enTeam, guide: enGuide, privacy: enPrivacy, notfound: enNotfound, changelog: enChangelog, mock: enMock, auth: enAuth, dashboard: enDashboard },
      zh: { common: zhCommon, home: zhHome, about: zhAbout, team: zhTeam, guide: zhGuide, privacy: zhPrivacy, notfound: zhNotfound, changelog: zhChangelog, mock: zhMock, auth: zhAuth, dashboard: zhDashboard },
      fr: { common: frCommon, home: frHome, about: frAbout, team: frTeam, guide: frGuide, privacy: frPrivacy, notfound: frNotfound, changelog: frChangelog, mock: frMock, auth: frAuth, dashboard: frDashboard },
      ja: { common: jaCommon, home: jaHome, about: jaAbout, team: jaTeam, guide: jaGuide, privacy: jaPrivacy, notfound: jaNotfound, changelog: jaChangelog, mock: jaMock, auth: jaAuth, dashboard: jaDashboard },
      ko: { common: koCommon, home: koHome, about: koAbout, team: koTeam, guide: koGuide, privacy: koPrivacy, notfound: koNotfound, changelog: koChangelog, mock: koMock, auth: koAuth, dashboard: koDashboard },
      es: { common: esCommon, home: esHome, about: esAbout, team: esTeam, guide: esGuide, privacy: esPrivacy, notfound: esNotfound, changelog: esChangelog, mock: esMock, auth: esAuth, dashboard: esDashboard },
    },
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common', 'home', 'about', 'team', 'guide', 'privacy', 'notfound', 'changelog', 'mock', 'auth', 'dashboard'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'doxmind-lang',
      caches: ['localStorage'],
    },
  });

// Update HTML lang attribute on language change
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
});

// Set initial lang attribute
document.documentElement.lang = i18n.language;

export default i18n;
