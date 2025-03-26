export interface AnswerOption {
  text: string;
  flow: ChatFlowItem[];
}

export interface ChatFlowItem {
  type: 'MESSAGE' | 'ANSWER';
  text: string;
  options?: AnswerOption[];
}
