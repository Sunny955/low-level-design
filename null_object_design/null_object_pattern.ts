interface CustomNotification {
    send(): void;
}

class EmailNotification implements CustomNotification {
    constructor(private recipients: string, private message: string) { };

    send(): void {
        console.log(`Email sent to ${this.recipients}: ${this.message}`);
    }
}

class NullNotification implements CustomNotification {
    send(): void {
        // do nothing
    }
}

class NotificationFactory {
    static createNotification(recipient: string, message: string): CustomNotification {
        if (recipient && message) {
            return new EmailNotification(recipient, message);
        } else {
            return new NullNotification();
        }
    }
}

const recipient1 = "user@example.com";
const message1 = "Hello, how are you?";
const notification1 = NotificationFactory.createNotification(recipient1, message1);
notification1.send(); // Output: Email sent to user@example.com: Hello, how are you?

const recipient2 = ""; // No recipient
const message2 = "This message should not be sent";
const notification2 = NotificationFactory.createNotification(recipient2, message2);
notification2.send(); 