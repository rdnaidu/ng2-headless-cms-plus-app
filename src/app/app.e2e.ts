describe('App', () => {

  beforeEach(() => {
    browser.get('/');
  });


  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'Media Fest Frontend for Headless CMS';
    expect(subject).toEqual(result);
  });


  it('should have <header>', () => {
    let subject = element(by.css('.text-muted')).isPresent();
    expect(subject).toEqual(true);
  });
 /*   
  it('should have <md-toolbar>', () => {
    let subject = element(by.css('app md-toolbar')).isPresent();
    let result  = true;
    expect(subject).toEqual(result);
  });

  it('should have <footer>', () => {
    let subject = element(by.css('app footer')).getText();
    let result  = 'WebPack Angular 2 Starter with demo apps by Tarun Kumar Sukhu';
    expect(subject).toEqual(result);
  });
*/
});
