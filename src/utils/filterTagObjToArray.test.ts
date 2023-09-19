import addTagsToResources from "./filterTagObjToArray";

test("returns an array with properties of true", () => {
    expect(addTagsToResources({ node: true, html: false, JS: true })).toEqual([
        "node",
        "JS",
    ]);
});
