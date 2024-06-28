import { useMemo } from "react";
import { uniqueId } from "lodash";

function useUniqueId(): string {
  return useMemo(() => uniqueId(), []);
}

export default useUniqueId;
