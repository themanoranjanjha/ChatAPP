import { Client, Databases } from 'appwrite';

export const PROJECT_ID = '6678090d0034ab5b394b'
export const DATABASE_ID = '66780aed002d367147d2'
export const COLLECTION_ID_MESSAGES = '66780b3f00281cf2aa41'

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6678090d0034ab5b394b');
export const database = new Databases(client);
 export default client;