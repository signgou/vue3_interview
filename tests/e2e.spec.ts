import { test } from '@playwright/test'

test.describe.configure({ mode: 'parallel' })
test('学生登入并面试', async ({ page }) => {
  await page.goto('https://localhost:5173/')
  await page.getByRole('button', { name: '开始使用' }).click()
  await page.getByRole('button', { name: '确认' }).click()
  await page.getByRole('textbox', { name: '账号' }).click()
  await page.getByRole('textbox', { name: '账号' }).fill('hjy')
  await page.getByRole('textbox', { name: '密码' }).click()
  await page.getByRole('textbox', { name: '密码' }).fill('111')
  await page.getByRole('button', { name: '登录' }).click()
  await page.getByRole('button', { name: '面试练习 ' }).click()
  await page.getByRole('button', { name: '基础素质测试' }).click()
  await page
    .getByRole('button', {
      name: '基础素质套题类型1 基础素质套题类型1相关题目 ',
    })
    .click()
  await page.getByRole('button', { name: '专家面试' }).click()
  await page.getByRole('button', { name: '等待专家连线' }).click()

  await page.getByRole('button', { name: '已匹配，开始面试' }).click()
  // await page.getByRole('button', { name: '结束这次面试' }).click()
})
test('专家登录并开始面试', async ({ page }) => {
  await page.goto('https://localhost:5173/')
  await page.getByRole('button', { name: '开始使用' }).click()
  await page.getByRole('button', { name: '确认' }).click()
  await page.getByRole('textbox', { name: '身份' }).click()
  await page.getByRole('button', { name: '专家' }).click()
  await page.getByRole('button', { name: '确认' }).click()
  await page.getByRole('textbox', { name: '账号' }).click()
  await page.getByRole('textbox', { name: '账号' }).fill('zj')
  await page.getByRole('textbox', { name: '密码' }).click()
  await page.getByRole('textbox', { name: '密码' }).fill('z')
  await page.getByRole('button', { name: '登录' }).click()
  await page
    .locator('div')
    .filter({ hasText: /^等待连线学生列表现在无学生，可以稍作休息\^_\^hjy$/ })
    .locator('i')
    .click()
  await page.getByRole('button', { name: '开始连线' }).click()
})
