const playwright = require('playwright');
const chai = require('chai');
const expect = chai.expect;
const BASE_URL = "http://localhost:9997";
let browser;

describe('Login ok, not ok', () => {
  beforeEach(async () => {
    browser = await playwright['chromium'].launch({ headless: false });
    // browser = await playwright['chromium'].launch();
  });
  afterEach(async () => {
    await browser.close();
  })

  it('accepts Bender', (async () => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(BASE_URL + "?name=Bender");
    const body = await page.$eval('body', e => e.textContent);
    expect(body).to.match(/Hi Bender\./);
  }));
  it('rejects Calculon', (async () => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(BASE_URL + "?name=Calculon");
    const body = await page.$eval('body', e => e.textContent);
    expect(body).to.match(/You are not Bender, permission denied\./);
  }));
});
