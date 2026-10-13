export interface Book {
    id: number;
    title: string;
    author_id: number;
    genre: string;
    intro: string;
    published_at: Date;
    last_updated_at: Date;
    is_sponsored: boolean
}