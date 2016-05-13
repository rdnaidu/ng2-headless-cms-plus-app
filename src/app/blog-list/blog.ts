export class BlogPost {
    id: string;
    name: string;
    images: string[];
    description: string;
    abstract: string;
    postDate: string;
    author: string;
    comments: Comments[];
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
    likes: number;
    stars: number;
}
