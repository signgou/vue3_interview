export interface Question {
  id: number
  questionText: string
  correctAnswer: string
}
export interface QuestionSet {
  id: number
  questionBankId: number
  title: string
  description: string
  questions: Question[]
}

export interface QuestionBank {
  id: number
  name: string
  type: string
  description: string
  questionSets: QuestionSet[]
}
