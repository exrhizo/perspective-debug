import perspective from "@finos/perspective";

import "@finos/perspective-viewer-d3fc";
import "@finos/perspective-viewer";
import "@finos/perspective-viewer-datagrid";

// TODO: We only need to get the theme that is used
// but the icons stopped showing when I did that.
import "@fontsource/roboto-mono/400.css";
import "@finos/perspective-viewer/dist/css/themes.css";
// import "@finos/perspective-workspace/dist/css/pro-dark.css";


const worker = perspective.worker();
console.log("PerspectiveWorker", { worker });
export default worker;
