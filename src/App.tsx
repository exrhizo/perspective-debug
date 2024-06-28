import React, { useEffect, useState } from "react";

import axios from "axios";

import { Table } from "@finos/perspective";

import perspectiveWorker from "./perspectiveWorker";
import PerspectiveViewer from './PerspectiveViewer'


async function getTable(): Promise<Table> {
  const resp = await axios.get('/avr.arrow', {
    responseType: "arraybuffer"
  });

  const data = resp.data;
  return await perspectiveWorker.table(data);
}

const config = {

};

function App() {
  const [table, setTable] = useState<Table | null>(null);

  useEffect(() => {
    getTable().then(setTable);
  }, []);

  const onConfigChange = (config) => {
    console.log("App.onConfigChange", config)
  }

  if (!table) {
    return <div>Loading...</div>;
  }

  console.log("PerspectiveViewer RENDER", { table, config})

  return (
    <>
      <h1>Perspective Test</h1>
      <div >
        <PerspectiveViewer
          table={table}
          config={config}
          onConfigChange={onConfigChange}
        />
      </div>
    </>
  )
}

export default App
