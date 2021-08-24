// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  
  production: false,
  admin:true,
  //apiUrl: 'http://huerto.test/',
  apiUrl: 'https://huertoapi.herokuapp.com/',
  apiMoon: 'https://www.icalendar37.net/lunar/api/',
  firebaseConfig: {
    apiKey: "AIzaSyCyC9eYCJZ9qYoyOjoYOX6Eo84YtO5jyVI",
    authDomain: "mihuertoapp-a2783.firebaseapp.com",
    projectId: "mihuertoapp-a2783",
    storageBucket: "mihuertoapp-a2783.appspot.com",
    messagingSenderId: "526427126260",
    appId: "1:526427126260:web:a82c9aa8c384abe2ee61a1"
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
