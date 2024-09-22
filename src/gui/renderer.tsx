import { createRoot } from "react-dom/client";
import { ensureExists } from "@utils/ensure-exists";
import { Test } from "@gui/test";

export class Renderer {
    public renderGui(): void {
        const rootElement = this._createRootElement();

        const root = createRoot(rootElement);

        root.render(<Test />);
    }

    private _createRootElement(): HTMLElement {
        const id = "root";

        const rootElement = document.createElement("div");
        rootElement.setAttribute("id", id);

        document.body.appendChild(rootElement);

        return ensureExists(document.getElementById(id));
    }
}
