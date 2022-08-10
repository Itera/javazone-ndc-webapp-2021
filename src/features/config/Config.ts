interface IConfig {
  features: {
    logging: 'trace' | 'debug' | 'info' | 'warn' | 'error';
  };
  firebase: {
    apiKey: string;
    appId: string;
    authDomain: string;
    databaseURL: string;
    messagingSenderId: string;
    projectId: string;
    storageBucket: string;
  };
}

export class Config {
  static config: IConfig = {
    features: {
      logging: 'trace',
    },
    firebase: {
      apiKey: 'AIzaSyDBto0BE3fNXOqVNxtO7xHACU5cxoenLuo',
      appId: '1:249583921695:web:60d843d7901462c6c0c32a',
      authDomain: 'javazone-ndc-2022.firebaseapp.com',
      databaseURL:
        'https://javazone-ndc-2022-default-rtdb.europe-west1.firebasedatabase.app/',
      messagingSenderId: '249583921695',
      projectId: 'javazone-ndc-2022',
      storageBucket: 'javazone-ndc-2022.appspot.com',
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
