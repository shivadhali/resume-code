// src/pocketbase.js
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://sdportfolio.pockethost.io'); // Replace with your PocketHost/PocketBase URL

pb.autoCancellation(false);

export default pb;
