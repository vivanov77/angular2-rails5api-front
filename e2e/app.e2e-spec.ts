import { Angular2-rails5api-frontPage } from './app.po';

describe('angular2-rails5api-front App', function() {
  let page: Angular2-rails5api-frontPage;

  beforeEach(() => {
    page = new Frontlivelaw2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
