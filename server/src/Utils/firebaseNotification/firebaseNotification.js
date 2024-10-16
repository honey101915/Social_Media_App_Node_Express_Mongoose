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

const registrationToken = 'cIyy3Na_UEvIhkky2tCrNx:APA91bGovBvbRt7oIWjPIkpb0eLdwNQxnypG_OV1rbGKCDuY6AX0v3vIzIUB6OZLLnO0FyooWocNDXgPWR1wqa_M1h82acP50zIgKS7LBod0oAStsFzTYNmAL-YX946Ar72gKWTYjxMg';


const messageData = {
    title: 'This is title',
    body: 'This is a body notification.',
    data: { data: 'value1', data: 'value2' },
};


sendPushNotification(registrationToken, messageData);
