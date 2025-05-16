interface IConfig {
  features: {
    logging: "trace" | "debug" | "info" | "warn" | "error";
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
      logging: "trace",
    },
    firebase: {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
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
