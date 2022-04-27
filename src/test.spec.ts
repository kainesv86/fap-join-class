import puppeteer from "puppeteer";
import axios from "axios";
import { data } from "./data";

const testUser = {
        username: "puppeteer",
        password: "123456789Aa",
};
const webUrl = "https://fptblog.vinhnhan.com";
const serverApiUrl = "https://fptblog.vinhnhan.com/api";

jest.setTimeout(100000);
describe("demo", () => {
        let browser: puppeteer.Browser;
        let page: puppeteer.Page;
        let authCookie: string;

        beforeAll(async () => {
                browser = await puppeteer.launch({
                        // the amount of delay time for each action by bot
                        slowMo: 250,
                        // False: show the browser, True: not show the browser
                        headless: false,
                });

                const { headers } = await axios.post(`${serverApiUrl}/auth/login`, testUser);
                authCookie = (headers["set-cookie"] as string[])[0].split("=")[1].split(";")[0];
                page = await browser.newPage();
                await page.goto(webUrl, { waitUntil: "domcontentloaded" });
                await page.setCookie({
                        name: "auth-token",
                        value: authCookie,
                });
        });

        it("create new post", async () => {
                await page.goto(`${webUrl}/post/me`, { waitUntil: "domcontentloaded" });
                // Create a post
                await page.waitForSelector(`#createNewPost`);
                await page.click(`#createNewPost`);
                await page.waitForSelector(
                        `body > main > div.flex.flex-col.flex-1.md\\:pt-32.bg-opacity-60 > div > div.w-full.px-4.space-y-6.lg\\:py-8 > div.grid.grid-cols-1.gap-4.md\\:grid-cols-2.lg\\:grid-cols-4.intro-y > div:nth-child(1) > div.flex.flex-col.justify-between.flex-1.px-4.py-6.duration-200.bg-white > a`
                );
                await page.click(
                        `body > main > div.flex.flex-col.flex-1.md\\:pt-32.bg-opacity-60 > div > div.w-full.px-4.space-y-6.lg\\:py-8 > div.grid.grid-cols-1.gap-4.md\\:grid-cols-2.lg\\:grid-cols-4.intro-y > div:nth-child(1) > div.flex.flex-col.justify-between.flex-1.px-4.py-6.duration-200.bg-white > a`
                );

                // Input data
                await page.waitForSelector(`#title`);
                await page.$eval(`#title`, (item) => {
                        (item as HTMLInputElement).value = "Demo";
                });

                await page.waitForSelector(`#categoryId > option:nth-child(2)`);
                await page.select(`#categoryId`, "34842ba8-3d29-488f-9448-cf5b6d6c44a1");

                await page.waitForSelector(`#editor > div.ql-editor`);
                await page.$eval(`#editor > div.ql-editor`, (item) => {
                        (
                                item as HTMLInputElement
                        ).innerHTML = `<h1>Hello, we are group 1. This is our demonstration for SWT</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer maximus justo id auctor blandit. Phasellus a dolor quam. In rhoncus faucibus mauris, vitae fermentum felis condimentum vitae. Etiam eu tempus risus. Praesent luctus, tellus id elementum ultricies, mi massa facilisis nisl, nec fermentum orci ipsum ac justo. Etiam vitae commodo sapien. Nunc et lobortis odio. Nam orci tellus, maximus non blandit et, tempus at ipsum. Quisque est dui, imperdiet vitae lacus elementum, dictum dapibus augue. Nulla facilisi. Vestibulum porta arcu quis interdum convallis.

                        Pellentesque a leo malesuada, pretium ipsum in, maximus erat. Nulla dictum lectus quis urna posuere, eget rutrum turpis euismod. Mauris lacinia cursus dictum.</p>`;
                });

                // Save changes
                await page.waitForSelector(`#form-btn`);
                await page.click(`#form-btn`);

                // Review
                await page.waitForSelector(
                        `#createBlogForm > div.flex.flex-col.space-y-2.lg\\:space-y-0.lg\\:space-x-2.md\\:items-center.md\\:flex-row > a`
                );
                await page.evaluate(`window.confirm = () => true`);
                await page.click(`#createBlogForm > div.flex.flex-col.space-y-2.lg\\:space-y-0.lg\\:space-x-2.md\\:items-center.md\\:flex-row > a`);

                const [tabOne, tabTwo, tabThree] = await browser.pages();

                await tabThree.waitForSelector(
                        `body > main > div.flex.flex-col.flex-1.md\\:pt-32.bg-opacity-60 > div > div > div.max-w-3xl.mx-auto > div.ql-editor.intro-y > h1`
                );

                let h1 = await tabThree.$eval(
                        `body > main > div.flex.flex-col.flex-1.md\\:pt-32.bg-opacity-60 > div > div > div.max-w-3xl.mx-auto > div.ql-editor.intro-y > h1`,
                        (item) => {
                                return (item as HTMLInputElement).innerHTML;
                        }
                );

                expect(h1).toBe(`Hello, we are group 1. This is our demonstration for SWT`);

                await tabTwo.waitForSelector(`#post-send`);
                await page.evaluate(`window.confirm = () => true`);
                await tabTwo.click(`#post-send`);
        });

        it("approve post", async () => {
                await page.goto(`${webUrl}/admin/post`, { waitUntil: "domcontentloaded" });

                // Search
                await page.waitForSelector(`#searchName`);
                await page.$eval(`#searchName`, (item) => {
                        (item as HTMLInputElement).value = "Demo";
                });

                await page.waitForSelector(`#listPostForm > div:nth-child(5) > div > button`);
                await page.click(`#listPostForm > div:nth-child(5) > div > button`);

                // Approve post
                await page.waitForSelector(
                        `body > main > div > div.flex.flex-col.flex-1.min-w-0.pb-4.overflow-hidden > div > main > div > div > div.space-y-2 > div.mt-2.overflow-hidden.border-b.border-gray-200.rounded-lg.shadow.intro-y > table > tbody > tr > td:nth-child(4) > button`
                );
                await page.click(
                        `body > main > div > div.flex.flex-col.flex-1.min-w-0.pb-4.overflow-hidden > div > main > div > div > div.space-y-2 > div.mt-2.overflow-hidden.border-b.border-gray-200.rounded-lg.shadow.intro-y > table > tbody > tr > td:nth-child(4) > button`
                );

                await page.waitForSelector(`#note`);
                await page.$eval(`#note`, (item) => {
                        (item as HTMLInputElement).value = "Good content";
                });

                await page.waitForSelector(`#approvedPostForm > div:nth-child(5) > button`);
                await page.evaluate(`window.confirm = () => true`);
                await page.click(`#approvedPostForm > div:nth-child(5) > button`);

                // Search approve post
                await page.goto(`${webUrl}/post/search`);
                await page.waitForSelector(`#search`);
                await page.$eval(`#search`, (item) => {
                        (item as HTMLInputElement).value = "Demo";
                });

                await page.waitForSelector(`#form-btn`);
                await page.click(`#form-btn`);

                await page.waitForSelector(
                        `body > main > div.flex.flex-col.flex-1.md\\:pt-32.bg-opacity-60 > div > div > div > ul > div:nth-child(1) > div > div.flex.flex-col.flex-1.space-y-2 > a.flex-1.text-lg.font-semibold`
                );
                let title = await page.$eval(
                        `body > main > div.flex.flex-col.flex-1.md\\:pt-32.bg-opacity-60 > div > div > div > ul > div:nth-child(1) > div > div.flex.flex-col.flex-1.space-y-2 > a.flex-1.text-lg.font-semibold`,
                        (item) => {
                                return (item as HTMLInputElement).innerHTML;
                        }
                );
                expect(title).toBe("Demo");
        });

        afterAll(async () => {
                await browser.close();
        });
});
