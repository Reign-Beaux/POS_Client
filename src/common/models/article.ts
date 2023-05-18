export interface Article {
  id: number;
  articleTypeId: number;
  code: string;
  description: string;
  isActive: boolean;
}

export const articleEmpty: Article = {
  id: 0,
  articleTypeId: 0,
  code: "",
  description: "",
  isActive: true,
};