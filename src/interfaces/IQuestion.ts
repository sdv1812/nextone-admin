export interface IQuestion {
  id: string;
  text: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: string;
  explanation?: string;
  category?: string;
  difficulty?: string;
  createdAt?: Date;
}
