export class BlogPost {
    id: string;
    name: string;
    images: string[];
    currentImage: string;
    description: string;
    category: string;
    abstract: string;
    publishedDate: string;
    postDate: Date;
    author: string;
    tags: string[];
    tagStr: string;
    comments: Comments[];
    commentsCount: number;
    likes: number;
    stars: number;
}


export class Comments {
    author: string;
    details: string;
    votedUp: boolean;
    votedDown: boolean;
}

export class BlogUser {
    id: string;
    name: string;
    avatar: string;
    username: string;
    company: string;
    location: string;
    publications = new Array<Publications>();
}

export class Publications {
    id: string;
    title: string;
}

export class BlogSummary {
    id: string;
    username: string;
    title: string;
    publishedDate: string;
    postDataDt: Date;
    likes: number;
    stars: number;
}
