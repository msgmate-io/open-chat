import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.timschupp.msgmate',
  appName: 'OpenChat',
  webDir: 'dist/client',
  server: {
    cleartext: true,
    androidScheme: 'https'
  }
};

export default config;
