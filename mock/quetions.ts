import { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: '/questionSets/:id',
    method: 'get',
    response: () => {
      return {
        id: 1,
        questionBankId: 1,
        title: '基础素质套题类型1',
        description: '基础素质套题类型1相关题目',
        questions: [
          {
            id: 9,
            questionText: '这是第一个问题',
            correctAnswer: '我是第一个问题的正确答案',
          },
        ],
      }
    },
  },
  {
    url: '/questionBanks/all',
    method: 'get',
    response: () => {
      return [
        {
          id: 1,
          name: '基础素质测试',
          type: '基础素质',
          description: '包含各类基础素质相关的题目',
          questionSets: [],
        },
        {
          id: 2,
          name: '专业技能测试',
          type: '专业技能',
          description: '包含各类专业相关的题目',
          questionSets: [],
        },
        {
          id: 3,
          name: '综合面试',
          type: '综合面试',
          description: '用于综合面试环节的各类题目',
          questionSets: [],
        },
      ]
    },
  },
  {
    url: '/questionBanks/:id',
    method: 'get',
    response: () => {
      return {
        id: 1,
        name: '基础素质测试',
        type: '基础素质',
        description: '包含各类基础素质相关的题目',
        questionSets: [
          {
            id: 1,
            questionBankId: 1,
            title: '基础素质套题类型1',
            description: '基础素质套题类型1相关题目',
            questions: [],
          },
        ],
      }
    },
  },
] as MockMethod[]
