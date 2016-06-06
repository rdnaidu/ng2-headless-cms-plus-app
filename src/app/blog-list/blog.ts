export class BlogPostForm {
     title: string;
     body: string;
}

export interface BlogPost {
    id: string;
    authorid: string;
    authorname: string;
    authoravatar: string;
    authoremail: string;
    title: string;
    description?: string;
    gender?: string;
    currentImage?: string;
    category: string;
    publishdate: string;
    updateddate: Date;
    postDate: Date;
    likes?: number;
    stars?: number;
    abstract: string;
    body?: string;
    images: string[];
    tags: string[];
    comments?: Comments[];
    comment_count: number;
    tagStr?: string;
}

export interface BlogPostLive {
    id: string;
    authorid: string;
    authorname: string;
    authoravatar: string;
    authoremail: string;
    title: string;
    description?: string;
    gender?: string;
    currentImage?: string;
    category: string;
    publishdate: string;
    updateddate: Date;
    postDate: Date;
    likes?: number;
    stars?: number;
    abstract: string;
    body?: string;
    images: string[];
    tags: string[];
    comments?: Comments[];
    comment_count: number;
    tagStr?: string;
}

export interface SearchJSON {
    title : string;
    tag: string
}

export interface Comments {
    username: string;
    comment: string;
    commentDate: string;
    commentDt: Date;
    votedUp: number;
    votedDown: number;
}

export interface BlogUser {
    id: string;
    name: string;
    avatar: string;
    username: string;
    company: string;
    location: string;
    publications: Publications[]
}

export interface Publications {
    id: string;
    title: string;
}

export interface BlogSummary {
    id: string;
    authorname: string;
    authoravatar: string;
    title: string;
    publishdate: string;
    postDate: Date;
    likes: number;
    stars: number;
}
