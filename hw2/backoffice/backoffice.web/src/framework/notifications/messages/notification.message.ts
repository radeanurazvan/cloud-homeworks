export class NotificationMessage {
    public constructor(public title: string, public body: string) {
    }

    public static error(body: string): NotificationMessage {
        return new NotificationMessage('Error', body);
    }

    public static success(body: string): NotificationMessage {
        return new NotificationMessage('Success', body);
    }

    public static warning(body: string): NotificationMessage {
        return new NotificationMessage('Warning', body);
    }

    public static info(body: string): NotificationMessage {
        return new NotificationMessage('Info', body);
    }
}