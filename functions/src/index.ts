import * as admin from 'firebase-admin';

admin.initializeApp();
export { createUser } from './user.function';
export * from './partcipate.channel.function';
export * from './leave.channel.function';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
