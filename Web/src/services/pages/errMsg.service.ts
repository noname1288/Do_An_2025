import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ErrMsgService {
    private errMsgSubject = new BehaviorSubject<string>('')
    public errMsg$ = this.errMsgSubject.asObservable();

    sendMsg(errMsg: string): void {
        this.errMsgSubject.next(errMsg);
    }
}