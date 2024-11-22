import request from '@/utils/request'
import type { QuestionBank, QuestionSet } from './type'

enum API {
  GET_QUESTIONSET_URL = '/questionSets/' /*后面加id*/,
  GET_QUESTIONBANK_URL = '/questionBanks/' /*后面加id*/,
  GET_ALL_QUESTIONBANKS_URL = '/questionBanks/all',
}

export function getQuestionSet(id: string) {
  return request.get<unknown, QuestionSet>(API.GET_QUESTIONSET_URL + id)
}

export function getQuestionBank(id: string) {
  return request.get<unknown, QuestionBank>(API.GET_QUESTIONBANK_URL + id)
}
export function getAllQuestionBanks() {
  return request.get<unknown, QuestionBank[]>(API.GET_ALL_QUESTIONBANKS_URL)
}
