export type Observer<T> = (value: T) => void;

export class Observable<T> {
    private _value: T;
    private _observers: Observer<T>[] = [];

    public constructor(value: T) {
        this._value = value;
    }

    public value(): T {
        return this._value;
    }

    public setValue(value: T) {
        this._value = value;

        this._notify();
    }

    public subscribe(observer: Observer<T>): void {
        this._observers.push(observer);
    }

    public unsubscribe(observerToRemove: Observer<T>): void {
        this._observers = this._observers.filter(
            (observer) => observer !== observerToRemove
        );
    }

    private _notify(): void {
        for (const observer of this._observers) {
            observer(this._value);
        }
    }
}
