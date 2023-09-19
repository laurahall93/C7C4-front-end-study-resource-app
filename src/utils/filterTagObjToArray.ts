import { SelectedTagsType } from "../components/AddNewResource";

export default function addTagsToResources(userSelectedTags: SelectedTagsType) {
    const tagsArray: string[] = [];
    for (const tag in userSelectedTags) {
        if (userSelectedTags[tag]) {
            tagsArray.push(tag);
        }
    }
    return tagsArray;
}
console.log(addTagsToResources({ node: true, html: false, JS: true }));
