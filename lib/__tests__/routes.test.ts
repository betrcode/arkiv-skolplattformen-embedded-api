import * as routes from '../routes'

test.each([
  ['children', routes.children],
  ['calender', routes.calendar('123')],
  ['classmates', routes.classmates('123')],
  ['classmates', routes.user],
  ['news', routes.news('123')],
  ['newsDetails', routes.newsDetails('123', '321')],
  ['image', routes.image('https://example.com/img.png')],
  ['notifications', routes.notifications('123')],
  ['menuRss', routes.menuRss('123')],
  ['menuList', routes.menuList('123')],
  ['menuChoice', routes.menuChoice('123')],
  ['schedule', routes.schedule('123', '2021-01-01', '2021-01-01')],
])('handles route %s', (_name, input) => {
  expect(input).toMatchSnapshot()
})
