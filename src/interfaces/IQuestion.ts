export enum Category {
  General = "General",
  Neurology = "Neurology",
  Cardiology = "Cardiology",
  Haematology = "Haematology",
  ChestDiseases = "Chest diseases",
  Gastroenterology = "Gastroenterology",
  Endocrinology = "Endocrinology",
  Rheumatology = "Rheumatology",
}

export enum Difficulty {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard",
}

export interface IQuestion {
  id: string;
  text: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: string;
  explanation?: string;
  category?: Category;
  difficulty?: Difficulty;
  createdAt?: Date;
}
