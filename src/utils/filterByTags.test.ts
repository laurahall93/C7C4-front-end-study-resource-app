import { isStringInArray } from "./filterByTags";

test("isStringInArray correctly returns true", () => {
    expect(
        isStringInArray("Node.js, HTTP, url and Express", ["Node.js", "CSS"])
    ).toEqual(true);
});

test("isStringInArray correctly returns true", () => {
    expect(
        isStringInArray("Node.js, HTTP, Typescript and Express", [
            "Typescript",
            "CSS",
        ])
    ).toEqual(true);
});

test("isStringInArray correctly returns false", () => {
    expect(
        isStringInArray("Node.js, HTTP, url and Express", ["CSS", "Typescript"])
    ).toEqual(false);
});
