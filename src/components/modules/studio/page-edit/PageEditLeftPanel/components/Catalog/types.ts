export type ActiveItem = {
  id: number;
  title: string;
  bookId: number;
  chapterId?: number;
  type: "page" | "chapter";
  beforePageId?: number;
  afterPageId?: number;
  beforeChapterId?: number;
  afterChapterId?: number;
};
