import { createRoot } from "react-dom/client";
import { ensureExists } from "@utils/ensure-exists";
import { App } from "@gui/app";
import { AppViewModel } from "@gui/app-view-model";
import "./index.css";

export class Renderer {
    public renderGui(): void {
        const rootElement = this._createRootElement();

        const root = createRoot(rootElement);

        const appViewModel = new AppViewModel();

        root.render(<App model={appViewModel} />);
    }

    private _createRootElement(): HTMLElement {
        const id = "root";

        const rootElement = document.createElement("div");
        rootElement.setAttribute("id", id);

        document.body.appendChild(rootElement);

        return ensureExists(document.getElementById(id));
    }
}
