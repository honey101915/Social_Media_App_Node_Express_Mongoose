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

const registrationToken = 'eWtV_aYUz0yOrjvFiua01n:APA91bFNTExQ8xwGELogmndWBW9WeN7a4SizgfZmd7yB_V0RLdmq2KB4NSa-A9JvRcIsvSS0j6J-LvF_osS3gTbDbTJ24Q-RgUOriQeYX2b8l-OguM5-yMk';


const messageData = {
    title: 'sdfgsdfgsdfg',
    body: 'sdfgsdfgdsfgsdfg',
    data: { data: 'value1', data: 'value2' },
};


sendPushNotification(registrationToken, messageData);
