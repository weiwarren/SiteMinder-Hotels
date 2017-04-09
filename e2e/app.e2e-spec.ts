import { SiteMinderHotelsPage } from './app.po';

describe('site-minder-hotels App', function() {
  let page: SiteMinderHotelsPage;

  beforeEach(() => {
    page = new SiteMinderHotelsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Hotels works!');
  });
});
