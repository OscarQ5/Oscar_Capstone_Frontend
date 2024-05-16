import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import LoginProvider from './Components/LoginProvider.jsx'

import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import enTranslation from '../locales/en.json';
import esTranslation from '../locales/es.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    es: { translation: esTranslation }
  },
  lng: 'en', 
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <LoginProvider>
        <App />
      </LoginProvider>
    </I18nextProvider>
  </React.StrictMode>,
)