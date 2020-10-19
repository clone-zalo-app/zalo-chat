// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  userUrl: 'http://localhost:3006/',
  chatUrl: 'localhost:3007',
  firebaseConfig: {
    apiKey: "AIzaSyA9tdaqc3PIRv63w6pCpMMpNKs2xptZzMA",
    authDomain: "clone-zalo-app.firebaseapp.com",
    databaseURL: "https://clone-zalo-app.firebaseio.com",
    projectId: "clone-zalo-app",
    storageBucket: "clone-zalo-app.appspot.com",
    messagingSenderId: "748262888648",
    appId: "1:748262888648:web:5feeb721b0e1241f8c81fd",
    measurementId: "G-C1RCGC3ZSL"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
