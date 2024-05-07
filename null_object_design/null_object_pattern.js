var EmailNotification = /** @class */ (function () {
    function EmailNotification(recipients, message) {
        this.recipients = recipients;
        this.message = message;
    }
    ;
    EmailNotification.prototype.send = function () {
        console.log("Email sent to ".concat(this.recipients, ": ").concat(this.message));
    };
    return EmailNotification;
}());
var NullNotification = /** @class */ (function () {
    function NullNotification() {
    }
    NullNotification.prototype.send = function () {
        // do nothing
    };
    return NullNotification;
}());
var NotificationFactory = /** @class */ (function () {
    function NotificationFactory() {
    }
    NotificationFactory.createNotification = function (recipient, message) {
        if (recipient && message) {
            return new EmailNotification(recipient, message);
        }
        else {
            return new NullNotification();
        }
    };
    return NotificationFactory;
}());
var recipient1 = "user@example.com";
var message1 = "Hello, how are you?";
var notification1 = NotificationFactory.createNotification(recipient1, message1);
notification1.send(); // Output: Email sent to user@example.com: Hello, how are you?
var recipient2 = ""; // No recipient
var message2 = "This message should not be sent";
var notification2 = NotificationFactory.createNotification(recipient2, message2);
notification2.send();
