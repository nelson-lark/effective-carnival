import { Analytics } from "aws-amplify";

import AnalyticsEventName from "@enums/AnalyticsEventName";
import AnalyticsEventResult from "@enums/AnalyticsEventResult";

interface Event {
  name: AnalyticsEventName;
  result?: AnalyticsEventResult;
  [key: string]: string | number | undefined;
}

export const recordEvent = async (
  event: AnalyticsEventName | Event
): Promise<void> => {
  try {
    if (typeof event === "object") {
      const { name, ...attributes } = event;
      await Analytics.record({
        name,
        attributes,
      });
    } else {
      await Analytics.record(event);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(e);
  }
};

export default {
  recordEvent,
};
