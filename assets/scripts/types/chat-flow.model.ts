export interface AnswerOption {
  text: string;
  flow: ChatFlowItem[];
}

export interface ChatFlowItem {
  type: 'MESSAGE' | 'QUESTION';
  text: string;
  options?: AnswerOption[];
  question_variable?: string;
}
