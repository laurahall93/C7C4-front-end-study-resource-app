import { isResourceInStudyList } from "./isResourceInStudyList";

test("returns true if ids matchings", () => {
    expect(isResourceInStudyList(1, [obj])).toBe(true);
});

const obj = {
    id: 1,
    title: "hi",
    author: "hi",
    url: "hi",
    description: "hi",
    tags: "hi",
    type: "hi",
    first_study_time: "hi",
    creation_time: "hi",
    user_comment: "hi",
    comment_reason: "hi",
    user_name: "hi",
    studyitem_id: 2,
    is_completed: true,
};
