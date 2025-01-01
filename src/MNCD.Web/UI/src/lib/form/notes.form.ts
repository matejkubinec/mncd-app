export interface NotesForm {
  analysisId: number;
  notes: string;
}

export const defaultValues: NotesForm = {
  analysisId: 0,
  notes: '',
};
