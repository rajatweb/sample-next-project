export interface GetSNContentsRequest {
    // User id.
    id: String;
    start_date: String;
    end_date: String;
    // SN Platform to filter
    platform: SN_GROUP;
    // Type of the content.
    type: ContentType;

}

export interface GetContent {
    id: String,
    platform: SN_GROUP,
    type: ContentType,
}

export interface GetSNContentsResponse {
    contents: SNContent[];   
    start_date: String;
    end_date: string;
}

export interface SNContent {
    id: String;
    platform: SN_GROUP;
    status: Status;
    // Below field Wouldnt be returned if the end - start > 7 due to latency issues.
    message: string;
    media: Media[];
    type: ContentType;
}

enum ContentType {
    REELS,
    VIDEO,
    POST,
    STORY,
    SHORTS,
}

interface Media {
    id: String;
    url: String;
    media_type: MediaType;
    likes_count: number;
    // Limited to 10 unless Explicitly called GetContent
    comments: Comment[];
}

interface Comment {
    id: String;
    platform: SN_GROUP;
    by: SN_USER;
    message: String;
    likes: number;
}

interface SN_USER {
    name: String;
    picture: String;
    id: String;
    platform: SN_GROUP;
}

enum MediaType {
    IMAGE,
    VIDEO
}

enum Status {
    DRAFT,
    SCHEUDLED,
    PUBLISHED,
    PUBLISHING,
    FAILED
}

enum SN_GROUP {
    INSTAGRAM,
    YOUTUBE,
    LINKEDIN,
    TIKTOK,
}