import { Entry /* , User */ } from "../domain";
import { child, get, push, update } from "firebase/database";

import { useDatabase } from "./useDatabase";
import { useState } from "react";
import { Logger } from "../features/logging/logger";

export function useTimer() {
  const [logger] = useState(new Logger("useTimer"));
  const { daily, unregistered } = useDatabase();
  const [key, setKey] = useState<string | null>(null);

  async function start(username: string, startTime: number): Promise<number> {
    logger.trace("Starting new timer for user", username);
    const generatedKey = push(daily).key;

    if (generatedKey === null) {
      logger.error("Failed to generate new key");
      throw new Error("Failed to generate new key");
    }

    await update(unregistered, {
      [generatedKey]: {
        username,
        start: startTime,
      },
    });

    setKey(() => generatedKey);
    logger.info(
      "Successfully created new entry",
      `[key=${generatedKey}]`,
      `[time=${startTime}]`
    );
    return startTime;
  }

  async function stop(stopTime: number): Promise<number> {
    logger.trace("Stopping timer for", key);
    if (key === null) {
      logger.error("Stop was invoked without any ongoing runs", `[key=${key}]`);
      throw new Error("Stop was invoked without any ongoing runs");
    }

    const ref = child(unregistered, `${key}`);
    const entry = await get(ref);

    if (!entry.exists()) {
      logger.error(
        "Unable to find time entry",
        `[key=${key}]`,
        `[src=${ref.toString()}]`
      );
      setKey(() => null);
      throw new Error("Unable to find time entry");
    }

    const data = entry.val() as Entry;

    await update(ref, {
      ...data,
      elapsed: stopTime - data.start,
      finish: stopTime,
    });

    setKey(() => null);
    logger.info(
      "Successfully stopped time for entry",
      `[key=${key}]`,
      `[finish=${stopTime}]`,
      `[elapsed=${stopTime - data.start}]`
    );
    return stopTime - data.start;
  }

  return {
    start,
    stop,
  };
}
