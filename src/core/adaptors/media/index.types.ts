export interface UploadMediaRes {
  id: string;
  filename: string;
  url: string;
  date: string;
}

export type Files = {
  id: string;
  url?: string;
  name?: string;
};
