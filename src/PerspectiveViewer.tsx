import { useEffect, useRef } from "react";

import { isEqual } from "lodash";
import { Filter, Table, ViewConfig } from "@finos/perspective";
import { HTMLPerspectiveViewerElement } from "@finos/perspective-viewer";
import useUniqueId from "./hooks/useUniqueId";

const errorDiv = `
<div style="color: var(--chakra-colors-err); background-color: rgba(255, 0, 0, 0.02); font-weight: bold; text-align: center; padding-top: 50px; height: 100%">
  Error Configuring Perspective
</div>
`;

const PerspectiveViewer = ({
  table,
  config,
  onFilterChange,
  filters,
  onConfigChange,
}: {
  table: Table;
  config: ViewConfig;
  onFilterChange?: (filter: Filter[]) => void;
  filters?: Filter[];
  onConfigChange?: (config: ViewConfig) => void;
}) => {
  const pspid = `psp_${useUniqueId()}`;
  const viewerRef = useRef<HTMLPerspectiveViewerElement>(null);

  const updatePspChildren = (
    selector: string,
    {
      style = {},
      innerHTML = "",
    }: {
      style?: { [k: string]: any };
      innerHTML?: string;
    },
  ) => {
    const pve = document.querySelector(`#${pspid}`) as HTMLPerspectiveViewerElement;
    const children = pve?.shadowRoot?.querySelectorAll(selector) ?? [];
    children.forEach((child) => {
      if (innerHTML) {
        child.innerHTML = innerHTML;
      }
      if (style) {
        Object.keys(style).forEach((key) => {
          child.style[key] = style[key];
        });
      }
    });
  };

  // const hideMenuIfNeeded = () => {
  //     updatePspChildren("#status_bar label", { style: { display: "none" } });
  //     updatePspChildren("#status_bar #rows", { style: { display: "none" } });
  //     updatePspChildren("#menu-bar > :not(#export)", {
  //       style: { display: "none" },
  //     });
  // };

  function updateConfig() {
    if (viewerRef.current && table) {
      console.log(".Perspective updateConfig", { config })
      viewerRef.current
        .restore({
          filter: filters,
        })
        .catch((e) => {
          console.error("Error Updating Perspective", e);
          updatePspChildren("div#main_panel_container", {
            innerHTML: errorDiv,
          });
        })
        // .then(hideMenuIfNeeded);
    }
  }

  function restoreConfig() {
    if (viewerRef.current && table) {
      console.log(".Perspective restoreConfig", { config })
      viewerRef.current
        .restore({
          settings: false,
          ...config,
          filter: filters || config.filter,
        })
        .catch((e) => {
          console.error("Error Configuring Perspective", e);
          updatePspChildren("div#main_panel_container", {
            innerHTML: errorDiv,
          });
        })
        // .then(hideMenuIfNeeded);
    }
  }

  useEffect(() => {
    if (viewerRef.current && table) {
      viewerRef.current.load(table);
      const onUpdate = (event) => {
        console.log(".Perspective onUpdate", event)
        // updatePspChildren("#plugin_selector_container", {
        //   style: { overflowY: "scroll" },
        // });

        if (onFilterChange && event.detail.filter.length != filters?.length) {
          onFilterChange(event.detail.filter);
        }

        const newConfig = ignoringFrontEndFields(event.detail);
        const orig = ignoringFrontEndFields(config);
        !isEqual(orig, newConfig) && onConfigChange?.(newConfig);
      };

      const onClick = (event) => {
        console.log(".Perspective onClick", event)
        onFilterChange && onFilterChange(event.detail.config.filter);
      };

      viewerRef.current.addEventListener("perspective-config-update", onUpdate);
      viewerRef.current.addEventListener("perspective-click", onClick);

      window.onmessage = (event) => {
        console.log(".Perspective window.onMessage", event)
        if (event.data?.type === "perspective-filter-change" && onFilterChange) {
          onFilterChange(event.data.data.config.filters);
        }
      };

      return () => {
        viewerRef.current?.removeEventListener("perspective-config-update", onUpdate);
        viewerRef.current?.removeEventListener("perspective-click", onClick);
      };
    }
  }, [table]);

  useEffect(updateConfig, [config, filters]);

  useEffect(restoreConfig, [table]);

  return <perspective-viewer id={pspid} ref={viewerRef} theme="Vaporwave" />;
};

const ignoringFrontEndFields = (config: { [k: string]: any }) => {
  const { settings, theme, ...rest } = config;
  return rest;
};

export default PerspectiveViewer;
