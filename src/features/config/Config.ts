interface IConfig {
  features: {
    logging: 'trace' | 'debug' | 'info' | 'warn' | 'error';
  };
  firebase: Partial<{
    apiKey: string;
    appId: string;
    authDomain: string;
    databaseURL: string;
    messagingSenderId: string;
    projectId: string;
    storageBucket: string;
  }>;
}

export class Config {
  static config: IConfig = {
    features: {
      logging: 'trace',
    },
    firebase: {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      appId: process.env.REACT_APP_FIREBASE_APP_ID,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    },
  };

  static getConfig() {
    return Config.config;
  }

  static getFirebaseConfig() {
    return Config.getConfig().firebase;
  }

  static getFeatures() {
    return Config.getConfig().features;
  }
}
