export interface FeedbackConsultation {
  idFeedback?: string;       // Optional: Assigned by the backend upon creation
  consultationId: string;    // ID of the associated consultation
  userId: string;            // ID of the user providing the feedback
  note: number;              // Rating provided by the user
  commentaire: string;       // Feedback comment
}
