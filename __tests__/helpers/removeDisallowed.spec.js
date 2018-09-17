import { removeDisallowed } from "../../src/helpers/removeDisallowed";

describe("removeDisallowed()", () => {
  test("should return an empty array when there are no messages", () => {
    expect(removeDisallowed()).toEqual([]);
  });

  test("should return all messages when there are no disallowed items", () => {
    const msgs = [{ service_name: "Wired" }, { service_name: "Giphy" }];
    const disallowedList = [""];
    const messageList = removeDisallowed(msgs, disallowedList);

    expect(messageList).toEqual(msgs);
  });

  test("should remove messages in disallowed list, ignoring case", () => {
    const msgs = [{ service_name: "Wired" }, { service_name: "Giphy" }];
    const disallowedList = ["wired"];

    const messageList = removeDisallowed(msgs, disallowedList);

    expect(messageList).toEqual([{ service_name: "Giphy" }]);
  });
});
