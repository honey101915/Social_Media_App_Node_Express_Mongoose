const admin = require('firebase-admin');
const serviceAccount = require('./firebaseServiceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const sendPushNotification = async (registrationToken, messageData) => {
    const message = {
        token: registrationToken,
        notification: {
            title: messageData.title,
            body: messageData.body,
        },
        data: messageData.data || {}, // Optional custom data
    };

    try {
        const response = await admin.messaging().send(message);
        console.log('Successfully sent message:', response);
    } catch (error) {
        console.error('Error sending message:', error);
    }
};

const registrationToken = 'cnr71YDLEU-dtzmsKZEtPI:APA91bE8vJ7Mzqt6kwzE8-Mb2ot-GuTAn7f-U_O4EfyE_A1rZGPjh2XD4cOnt4Ax9hYemu_Pddg32oO6HNTEABBYtqpquGjr5ooNSPacUYYo3PZVBBpffkfaf4idM3l9hEx0eM8Oisqp';


const messageData = {
    title: 'Hello!',
    body: 'This is a test notification.',
    data: { key1: 'value1', key2: 'value2' },
};


sendPushNotification(registrationToken, messageData);
