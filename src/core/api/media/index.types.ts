export interface Media {
  id: string;
  url: string;
  filename: string;
  createdAt: Date;
}

export type Files = {
  id: string;
  url?: string;
  name?: string;
};
