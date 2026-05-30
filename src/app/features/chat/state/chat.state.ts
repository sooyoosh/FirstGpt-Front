import { Injectable, signal } from "@angular/core";
import { ChatMessage } from "../models/chat-message.model";
import { Conversation } from "../models/conversation.model";

@Injectable({
    providedIn: 'root'
})
export class ChatState {

    private _messages = signal<ChatMessage[]>([]);

    messages = this._messages.asReadonly();

    private _isStreaming = signal(false);
    isStreaming = this._isStreaming.asReadonly();



    addMessage(message: ChatMessage) {
        this._messages.update(messages => [...messages, message]);
    };

    setStreaming(value: boolean) {
        this._isStreaming.set(value);
    }




    appendToMessage(
        messageId: string,
        chunk: string
    ) {

        this._messages.update(messages =>
            messages.map(message => {

                if (message.id === messageId) {

                    return {
                        ...message,
                        content: message.content + chunk
                    };
                }

                return message;
            })
        );
    }


    finishStreaming(messageId: string) {

        this._messages.update(messages =>
            messages.map(message => {

                if (message.id === messageId) {

                    return {
                        ...message,
                        isStreaming: false
                    };
                }

                return message;
            })
        );
    }

}