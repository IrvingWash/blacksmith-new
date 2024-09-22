import { useEffect, useState } from "react";
import { Observable } from "@utils/observable";

export function useObservable<T>(observable: Observable<T>): T {
    const [value, setValue] = useState<T>(observable.value());

    useEffect(() => {
        observable.subscribe(setValue);

        return () => {
            observable.unsubscribe(setValue);
        };
    }, [observable.subscribe, observable.unsubscribe]);

    return value;
}
