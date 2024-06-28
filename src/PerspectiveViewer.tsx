import { useEffect, useRef } from "react";

import { Filter, Table, ViewConfig } from "@finos/perspective";
import { HTMLPerspectiveViewerElement } from "@finos/perspective-viewer";
import useUniqueId from "./hooks/useUniqueId";

const PerspectiveViewer = ({ table }: { table: Table }) => {
  const pspid = `psp_${useUniqueId()}`;
  const viewerRef = useRef<HTMLPerspectiveViewerElement>(null);

  useEffect(() => {
    if (viewerRef.current && table) {
      console.log("PerspectiveViewer.useEffect", { table });
      viewerRef.current.load(table);
    }
  }, [table]);

  console.log("PerspectiveViewer.render", { pspid, viewerRef });
  return <perspective-viewer id={pspid} ref={viewerRef} theme="Vaporwave" />;
};

export default PerspectiveViewer;
