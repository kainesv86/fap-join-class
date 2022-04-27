import puppeteer from "puppeteer";
import axios from "axios";
import { scrollToTop, scrollToBottom } from "./helpers";

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

        it("home screenshot", async () => {
                await page.setViewport({ width: 1536, height: 722 });
                await page.goto(`${webUrl}`, { waitUntil: "domcontentloaded" });
                await scrollToTop(page);
                await scrollToBottom(page);
                await page.screenshot({ path: "./screenshots/desktop/home.png", fullPage: true });

                await page.setViewport({ width: 390, height: 844 });
                await scrollToTop(page);
                await scrollToBottom(page);
                await page.screenshot({ path: "./screenshots/mobile/home.png", fullPage: true });
        });

        it("user profile screenshot", async () => {
                await page.setViewport({ width: 1536, height: 722 });
                await page.goto(`${webUrl}/user/me`, { waitUntil: "domcontentloaded" });
                await scrollToTop(page);
                await scrollToBottom(page);
                await page.screenshot({ path: "./screenshots/desktop/profile.png", fullPage: true });

                await page.setViewport({ width: 390, height: 844 });
                await scrollToTop(page);
                await scrollToBottom(page);
                await page.screenshot({ path: "./screenshots/mobile/profile.png", fullPage: true });
        });

        it("search post screenshot", async () => {
                await page.setViewport({ width: 1536, height: 722 });
                await page.goto(`${webUrl}/post/search`, { waitUntil: "domcontentloaded" });
                await page.waitForSelector(`#search`);
                await page.select("#categoryId", "a25fc90f-8576-4b5f-94d7-88b27f2e0634");
                await page.click(`#form-btn`);
                await scrollToTop(page);
                await scrollToBottom(page);
                await page.screenshot({ path: "./screenshots/desktop/search.png", fullPage: true });

                await page.setViewport({ width: 390, height: 844 });
                await scrollToTop(page);
                await scrollToBottom(page);
                await page.screenshot({ path: "./screenshots/mobile/search.png", fullPage: true });
        });

        it("view post screenshot", async () => {
                await page.setViewport({ width: 1536, height: 722 });
                await page.waitForSelector(
                        `body > main > div.flex.flex-col.flex-1.md\\:pt-32.bg-opacity-60 > div > div > div > ul > div:nth-child(1) > div > div.flex.flex-col.flex-1.space-y-2 > a.flex-1.text-lg.font-semibold`
                );
                await page.click(
                        `body > main > div.flex.flex-col.flex-1.md\\:pt-32.bg-opacity-60 > div > div > div > ul > div:nth-child(1) > div > div.flex.flex-col.flex-1.space-y-2 > a.flex-1.text-lg.font-semibold`
                );

                await scrollToTop(page);
                await scrollToBottom(page);
                await page.screenshot({ path: "./screenshots/desktop/post.png", fullPage: true });

                await page.setViewport({ width: 390, height: 844 });
                await scrollToTop(page);
                await scrollToBottom(page);
                await page.screenshot({ path: "./screenshots/mobile/post.png", fullPage: true });
        });

        it("category chart screenshot", async () => {
                await page.setViewport({ width: 1536, height: 722 });
                await page.goto(`${webUrl}/admin/category`, { waitUntil: "domcontentloaded" });
                await page.waitForSelector(`#view-chart`);
                await page.click(`#view-chart`);
                await page.waitForSelector(`#SvgjsSvg1006`);
                await page.screenshot({ path: "./screenshots/desktop/ViewCategoryChart.png", fullPage: true });
        });

        it("login screenshot on desktop", async () => {
                await page.setCookie({
                        name: "auth-token",
                        value: "",
                });
                await page.goto(`${webUrl}/auth/login`, { waitUntil: "domcontentloaded" });
                await page.setViewport({ width: 1536, height: 722 });
                await page.waitForSelector(`#form-btn`);
                await page.click(`#form-btn`);
                await page.screenshot({ path: "./screenshots/desktop/LoginFail.png", fullPage: true });

                await page.setViewport({ width: 390, height: 844 });
                await page.screenshot({ path: "./screenshots/mobile/LoginFail.png", fullPage: true });
        });

        afterAll(async () => {
                await browser.close();
        });
});
