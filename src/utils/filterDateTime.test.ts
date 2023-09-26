import { filterDateTime } from "./filterDateTime";

test("returns formatted date time", () => {
    expect(filterDateTime("2023-09-23T23:00:00.000Z")).toBe("2023-09-23 23:00");
    expect(filterDateTime("2023-09-12T23:00:00.000Z")).toBe("2023-09-12 23:00");
});
