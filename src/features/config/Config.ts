interface IConfig {
  features: {
    logging: 'trace' | 'debug' | 'info' | 'warn' | 'error';
  };
  firebase: {
    apiKey: string;
    appId: string;
    authDomain: string;
    databaseURL: string;
    measurementId: string;
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
      apiKey: 'AIzaSyASmJGnEn4LywAV8-MRdaMdeDg1wIqbgJM',
      appId: '1:279313907388:web:77b1897c52b99c8657dab9',
      authDomain: 'ndc-javazone-2021-mock.firebaseapp.com',
      databaseURL:
        'https://ndc-javazone-2021-mock-default-rtdb.europe-west1.firebasedatabase.app',
      measurementId: 'G-Q4GS8NXN28',
      messagingSenderId: '279313907388',
      projectId: 'ndc-javazone-2021-mock',
      storageBucket: 'ndc-javazone-2021-mock.appspot.com',
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
