import { FeedbackConsultation } from "../../FeedbackConsultation/models/feedback.model";

export interface Consultation {
  id?: string; // Optional for creation
  userId: string;
  equipeMedicaleId: string;
  dateConsultation: string; // ISO 8601 date string
  rapport: string;
  feedbacks?: FeedbackConsultation[];
}