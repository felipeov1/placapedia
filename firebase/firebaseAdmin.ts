import * as admin from 'firebase-admin';
import { ServiceAccount } from "firebase-admin";

const adminConfig: ServiceAccount = {
    "projectId": "placapedia-c7bce",
    "privateKey": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDNKgekPEPXgpP2\ns+rhWULOnS6bxL/ket71h69OSFROXfeiCDcQxn0SAmGcx8rKkUFbpg32O5MAtGkP\nQ3uzciKQRqtn07byjYiIdSH+QYxTjviBfmP4K67EKKQHk/6DCFLEs26axgnZh+ZT\nqESiQCX/d7lUbKoPNMeJKJa16gtsSm3bUCtpwte+cSSH6FI3qGIK/+EolSLntTRV\nko/2LbZ2UTS/vJ5NhT6JAAkSjTO85ddPSRjz0BW1LceiWvFY3i598lzJ2GfA4s/W\n7sq1f1yEHSoyPrrBeW/KtTgyzIcPQHVglNewteDUuqpkFE8DodGQfJgMD3WBszQf\nqjduI9rtAgMBAAECggEADEAvkfWsnLhwsBEw5qE3MAc1ZUUWVZpQqJtK3dh2evIk\nJfS/n6zP2Gdz/1yewKxzw/k3vuBHzYmi9wUHOevddygBIYNZhUTrm4UDBp+mCsdF\nZ4DDOhUXASI8Hoe5HDHptKfSOZkMYC+RPVBAPj/+WjGCoNvsO67hy1A1JPUDbEUv\ncQ3Y9OjFtb4lzxBZxbJrjVFVvJ2DWXb2S6V8cl5phlSbl+XRRTKHiBOTSmnhwhwn\nl6AJhetkAiZ7cMrLfGAZms0Vo7fyRfmMRqg5OF0PDx2IWQQY/+9IkqtnXIOFdBxs\n/ky4hReswo/ISqWDv9HsR3mZP+blk8zVGC1hDwNXsQKBgQDrWbWS5NtQY63pg8U2\nMPJykI5bFy8PRNCaZJn7IqzmG5h9j9sxFKc4qEJLz8En7p7XSRG+hRqQuQP2GcEG\nDBfzj+KQFiap2Z/H6VJT4kiXR61Ah+sfG/nqMFQQcclj1//RktPmYfRZm7RUBQHk\nP6YyZMbA9r2C0G56GaPdSa2S8wKBgQDfKkvgTEVL9ym/QSOqU+P+rBpGcSGyMAsV\nGq2QNn0oUGB+i88IizgTqcMDm20i1U30LSRZx/c/MWGJiOQgvBkjGkhKmYLFzV5F\nlN9fUtjIGmGkrfX5D3SsSiK+vh6omqa0uJ7qYrejVjWDTo5Kqtcn7rSoq2vuVE4s\n6uk52B2SnwKBgGF1hcZttRAmJweTRKB7RnsAt6KrCBbXlVbKICWqJ1Umyk/8uXUq\nq1DABKwmPUOPAgH+xTVTIzwZEbXg1ljtuyFmTRkDw0EE2LDNQwVvqEXVLb6SSmBY\nknZTSwyAQjhxYwNjPRKjL6/H1bYRWMYvQWCO8OtJghLgw08WvQ/PCezXAoGBAJQe\nVKIYvV3APLsuFuf0Kj1cKUxbxkuoS5LEVDKFl+hsAL+9N7qp/JxAbqk0PemCvey1\nEY1thZMxyVUpwJBhiCWeSiEJZpy2xD1WpDN2n1+g8vIEbF/UfFHmGs2TDnJFwyPr\n7b4Pq2cDzxzJxPOWFJvyeYIB1O8okYKKoCW+ZVJtAoGAH20d1PfJBgkFYQrlzasv\n+n3lFvcYBwt7wqxawGBaF0V4xtvK2Eg7592Y6V9AZV8KQP7lUQyeYquRA4FncNeG\nZzg0OcsK5aPccktu+QlE1DgBKB15knqfkhMNi2vlk0zE5OHW6laSUIpMqkjkHoUQ\nHtlFneTi1LJF/1ybRKCYKg4=\n-----END PRIVATE KEY-----\n",
    "clientEmail": "firebase-adminsdk-6p68l@placapedia-c7bce.iam.gserviceaccount.com"
};
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(adminConfig),
        databaseURL: "https://placapedia-c7bce.firebaseio.com",
    });
}

// "private_key_id": "53f051872ce574436abb2072bf63f8441335bdfa",
// "client_id": "118237522505527124582",
// "auth_uri": "https://accounts.google.com/o/oauth2/auth",
// "token_uri": "https://oauth2.googleapis.com/token",
// "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
// "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-6p68l%40placapedia-c7bce.iam.gserviceaccount.com",
// "universe_domain": "googleapis.com"

export default admin;
