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
    name: string;
}

export interface UserType {
    id: number;
    name: string;
}

export interface TagType {
    id: number;
    tag_name: string;
}
