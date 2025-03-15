export interface Round {
  id: string;
  name: string;
  pool_amount: number;
  cover_id: string | null;
  cover: string | null;
  voting_start_at: string;
  voting_end_at: string;
  submission_start_at: string;
  submission_end_at: string;
  total_donations: number;
  total_votes: number;
  total_projects: number;
  voting_announce_at: string | null;
  created_at: string;
  updated_at: string;
}
