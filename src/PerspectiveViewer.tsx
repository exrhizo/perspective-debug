import { useEffect, useRef } from "react";

import { Table } from "@finos/perspective";
import { HTMLPerspectiveViewerElement } from "@finos/perspective-viewer";
import useUniqueId from "./hooks/useUniqueId";

const PerspectiveViewer = ({ table }: { table: Table }) => {
  const pspid = `psp_${useUniqueId()}`;
  const viewerRef = useRef<HTMLPerspectiveViewerElement>(null);

  useEffect(() => {
    const willLoad = !!viewerRef.current && !!table;
    console.log("PerspectiveViewer.useEffect", { pspid, willLoad, table });
    if (willLoad) {
      viewerRef.current.load(table);
    }
  }, [table]);

  console.log("PerspectiveViewer.render", { pspid, viewerRef });
  return <perspective-viewer id={pspid} ref={viewerRef} theme="Vaporwave" />;
};

export default PerspectiveViewer;
