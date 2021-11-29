import { Entry } from "../domain";
import { onValue } from "firebase/database";
import { useDatabase } from "./useDatabase";
import { useMount } from "./useMount";
import { useState } from "react";
import { Logger } from "../features/logging/logger";

export interface UnregisteredEntry extends Entry {
  uid: string;
}

export function useUnregistered() {
  const [logger] = useState(new Logger("useUnregistered"));
  const { unregistered } = useDatabase();
  const [unregisteredList, setUnregisteredList] = useState<
    Array<UnregisteredEntry>
  >([]);
  const [ongoing, setOngoing] = useState<Array<UnregisteredEntry>>([]);

  function attachObserver() {
    logger.trace(
      "Attaching listener to unregistered document",
      unregistered.toString()
    );
    onValue(unregistered, (snapshot) => {
      if (!snapshot.exists()) {
        logger.warn("Found no data on", `[src=${unregistered.toString()}]`);
        return;
      }

      const data = snapshot.val();
      const entries = Object.entries(data).map(
        ([key, entry]): UnregisteredEntry => ({
          uid: key,
          ...(entry as Entry),
        })
      );

      const ongoing = entries.filter((entry) => entry.finish === undefined);
      const finished = entries.filter((entry) => entry.finish !== undefined);

      logger.info(
        "found",
        `[ongoing=${ongoing.length}]`,
        "and",
        `[finished=${finished.length}]`
      );

      setUnregisteredList(() => finished);
      setOngoing(() => ongoing);
    });
  }

  useMount(() => {
    attachObserver();
  });

  return {
    unregistered: unregisteredList,
    ongoing,
  };
}
