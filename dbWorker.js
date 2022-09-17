import {parentPort} from 'worker_threads'
import admin from 'firebase-admin'
import { firebaseConfig } from './config';


// Initialize Firebase
const app = admin.initializeApp(firebaseConfig);
const analytics = admin.getAnalytics(app);

