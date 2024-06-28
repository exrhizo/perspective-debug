import React, { useEffect, useState } from "react";

import axios from "axios";

import { Table } from "@finos/perspective";

import perspectiveWorker from "./perspectiveWorker";
import PerspectiveViewer from "./PerspectiveViewer";

// const FILE_PATH = "/avr.arrow";
const FILE_PATH = "/narrow.arrow";

async function getTable(): Promise<Table> {
  const resp = await axios.get(FILE_PATH, {
    responseType: "arraybuffer",
  });

  const data = resp.data;
  return await perspectiveWorker.table(data);
}

const config = {};

function App() {
  const [table, setTable] = useState<Table | null>(null);
  console.log("App.render", { hasTable: !!table });

  useEffect(() => {
    console.log("App.useEffect", { hasTable: !!table });
    getTable().then((table) => {
      setTable(table);
      console.log("App.useEffect.then", { table });
    });
  }, []);

  if (!table) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Perspective Test</h1>
      <div>
        <PerspectiveViewer table={table} />
      </div>
      <p>Notice: hit reset or sort to regain normal scrolling</p>
      <p>Set <code>FILE_PATH</code> for either wide or narrow example.</p>
    </>
  );
}

export default App;
