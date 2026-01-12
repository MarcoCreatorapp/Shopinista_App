import "@canva/app-ui-kit/styles.css";
import type {
  DataConnectorIntent,
  GetDataTableRequest,
  GetDataTableResponse,
  RenderSelectionUiRequest,
} from "@canva/intents/data";
import { auth } from "@canva/user";
import { createRoot } from "react-dom/client";
import { buildDataTableResult, scope } from "../../api";
import { App } from "./app";

export const dataConnector: DataConnectorIntent = {
  getDataTable: async (
    params: GetDataTableRequest,
  ): Promise<GetDataTableResponse> => {
    const oauth = auth.initOauth();
    const token = await oauth.getAccessToken({ scope });
    return buildDataTableResult(params, token?.token);
  },

  renderSelectionUi: async (request: RenderSelectionUiRequest) => {
    function render() {
      const root = createRoot(document.getElementById("root") as Element);
      root.render(<App request={request} />);
    }

    render();

    if (module.hot) {
      module.hot.accept("./app", render);
      module.hot.accept("../../api", render);
    }
  },
};

export default dataConnector;
