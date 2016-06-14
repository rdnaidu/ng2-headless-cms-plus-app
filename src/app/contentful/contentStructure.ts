export class ContentfulAuthor {
    name: string;
    location: string;
    company: string;
    profilePhoto = new cnImage();
}

export class cnImage {
    fields = new cnFields();
}

export class cnFields {
    file = new cnFile();
    title: string;
}

export class cnFile {
    contentType: string;
    url: string;
    fileName: string;
}


export class ContentfulPost {
    fields = new cnPostFields();
}

export class cnPostFields {
    author  = new ContentfulAuthor();
    body: string;
    slug: string;
    featuredImage = new  cnImage();
    title: string;
    tags: string[];
}

