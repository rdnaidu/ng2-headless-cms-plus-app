export class BlogPost {
    name: string;
    images: string[];
    description: string;
    id: string;
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
