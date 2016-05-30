describe('App', () => {

  beforeEach(() => {
    browser.get('/');
  });


  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'Angular2 Webpack Starter by @gdi2290 from @AngularClass';
    expect(subject).toEqual(result);
  });


 /* it('should have <header>', () => {
    let subject = element(by.css('app header')).isPresent();

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
