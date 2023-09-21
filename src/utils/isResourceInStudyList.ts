import { StudyListType } from "../types/types";

export function isResourceInStudyList(
    resourceId: number,
    studyList: StudyListType[]
) {
    for (const resource of studyList) {
        if (resource.id === resourceId) {
            return true;
        }
    }
    return false;
}
