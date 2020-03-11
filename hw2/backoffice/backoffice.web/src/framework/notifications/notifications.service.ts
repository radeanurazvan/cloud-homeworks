import { injectable } from "inversify";
import { Subject } from "rxjs";
import * as toastr from "toastr"

import { NotificationMessage } from "./messages/notification.message";

@injectable()
export class NotificationsService {
    private _errorChannel: Subject<NotificationMessage> = new Subject<NotificationMessage>();
    private _successChannel: Subject<NotificationMessage> = new Subject<NotificationMessage>();
    private _warningChannel: Subject<NotificationMessage> = new Subject<NotificationMessage>();
    private _infoChannel: Subject<NotificationMessage> = new Subject<NotificationMessage>();

    public constructor() {
        this.configureToastr();

        this._errorChannel.subscribe((message: NotificationMessage) => toastr.error(message.body, message.title));
        this._successChannel.subscribe((message: NotificationMessage) => toastr.success(message.body, message.title));
        this._warningChannel.subscribe((message: NotificationMessage) => toastr.warning(message.body, message.title));
        this._infoChannel.subscribe((message: NotificationMessage) => toastr.info(message.body, message.title));
    }

    public pushError(...errors: NotificationMessage[]): void {
        errors.forEach((e: NotificationMessage) => this._errorChannel.next(e));
    }

    public pushSuccess(...success: NotificationMessage[]): void {
        success.forEach((s: NotificationMessage) => this._successChannel.next(s));
    }

    public pushWarning(...warnings: NotificationMessage[]): void {
        warnings.forEach((w: NotificationMessage) => this._warningChannel.next(w));
    }

    public pushInfo(...info: NotificationMessage[]): void {
        info.forEach((i: NotificationMessage) => this._infoChannel.next(i));
    }

    private configureToastr(): void {
        toastr.options.positionClass = 'toast-bottom-full-width';
    }
}