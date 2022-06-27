export class SimpleEvent {
    listeners = {};

    addEventListeners = (eventName, callback) => {
        if(!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }

        this.listeners[eventName].push(callback);
    }

    dispatch = (eventName, ...arg) => {
        if(!this.listeners[eventName]) {
            return;
        }

        this.listeners[eventName].forEach(callback => callback(...arg));
    }
}
