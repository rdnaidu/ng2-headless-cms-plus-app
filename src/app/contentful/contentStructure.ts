export class ContentfulAuthor {
    name: string;
    location: string;
    company: string;
    profilePhoto = new cnImage();
}

export class CnImage {
    fields = new CnFields();
}

export class CnFields {
    file = new cnFile();
    title: string;
}

export class CnFile {
    contentType: string;
    url: string;
    fileName: string;
}


export class ContentfulPost {
    fields = new CnPostFields();
}

export class CnPostFields {
    author  = new ContentfulAuthor();
    body: string;
    slug: string;
    featuredImage = new CnImage();
    title: string;
    tags: string[];
}

