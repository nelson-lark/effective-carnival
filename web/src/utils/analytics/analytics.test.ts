import { Analytics } from "aws-amplify";
import { recordEvent } from "@utils/analytics";

import AnalyticsEventName from "@enums/AnalyticsEventName";
import AnalyticsEventResult from "@enums/AnalyticsEventResult";

describe("recordEvent()", () => {
  beforeAll(() => {
    Analytics.record = jest.fn();
  });

  it("should call Analytics.record() with event name", () => {
    recordEvent(AnalyticsEventName.SignIn);

    expect(Analytics.record).toBeCalledWith(AnalyticsEventName.SignIn);
  });

  it("should call Analytics.record() with object containing name and attributes properties", () => {
    recordEvent({
      name: AnalyticsEventName.SignIn,
      result: AnalyticsEventResult.Success,
    });

    expect(Analytics.record).toBeCalledWith({
      name: AnalyticsEventName.SignIn,
      attributes: { result: AnalyticsEventResult.Success },
    });
  });
});
