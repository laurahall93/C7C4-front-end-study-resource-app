export interface ResourceType {
    id: number;
    title: string;
    author: string;
    url: string;
    description: string;
    tags: string;
    type: string;
    first_study_time: string;
    creation_time: string;
    user_comment: string;
    comment_reason: string;
    user_name: string;
}

export interface StudyListType extends ResourceType {
    studyitem_id: number;
    is_completed: boolean;
}

export interface UserType {
    id: number;
    name: string;
}

export interface TagType {
    id: number;
    tag_name: string;
}
