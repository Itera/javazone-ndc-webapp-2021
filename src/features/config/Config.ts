export class Config {
  static config = {
    firebase: {
      apiKey: 'AIzaSyDGMJscARK_Wkq2CGhy7wgu0BOd-51VXwo',
      appId: '1:1015382247649:web:21b4626b518b85223d8fa0',
      authDomain: 'javazone-and-ndc-2021.firebaseapp.com',
      databaseURL:
        'https://javazone-and-ndc-2021-default-rtdb.europe-west1.firebasedatabase.app',
      measurementId: 'G-Q4GS8NXN28',
      messagingSenderId: '1015382247649',
      projectId: 'javazone-and-ndc-2021',
      storageBucket: 'javazone-and-ndc-2021.appspot.com',
    },
  };

  static getConfig() {
    return Config.config;
  }

  static getFirebaseConfig() {
    return Config.getConfig().firebase;
  }
}
