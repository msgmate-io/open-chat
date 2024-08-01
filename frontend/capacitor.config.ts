// import { CapacitorConfig } from '@capacitor/cli';

const config = {
  appId: 'com.timschupp.msgmate',
  appName: 'OpenChat',
  webDir: 'dist/client',
  server: {
    cleartext: true,
    androidScheme: 'http',
    allowNavigation: [],
  },
  android: {
    allowMixedContent: true,
  },
  plugins: {
    CapacitorHttp: {
      enabled: true
    },
    CapacitorCookies: {
      enabled: true
    }
  },
};

export default config;
