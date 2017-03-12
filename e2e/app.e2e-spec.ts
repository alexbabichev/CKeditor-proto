import { A2TestPage } from './app.po';

describe('a2-test App', () => {
  let page: A2TestPage;

  beforeEach(() => {
    page = new A2TestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
