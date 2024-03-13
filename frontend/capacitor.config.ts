import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.timschupp.msgmate',
  appName: 'OpenChat',
  webDir: 'dist/client',
  server: {
    androidScheme: 'https'
  }
};

export default config;
