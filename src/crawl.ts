import puppeteer from "puppeteer";
import axios from "axios";
import sound from "sound-play";
import * as dotenv from "dotenv";
import { clearInterval } from "timers";
dotenv.config({ path: `config/.env.${process.env.NODE_ENV}` });

async function bootCrawl() {
        const browser = await puppeteer.launch({
                // the amount of delay time for each action by bot
                slowMo: 500,
                // False: show the browser, True: not show the browser
                headless: false,
        });

        const webUrl = "https://fap.fpt.edu.vn/FrontOffice/MoveSubject.aspx?id=21255";

        const page = await browser.newPage();
        await page.goto(webUrl);
        await page.select("#ctl00_mainContent_ddlCampus", "4");

        const googleAuth = await browser.newPage();
        await googleAuth.goto(
                "https://accounts.google.com/o/oauth2/auth/identifier?redirect_uri=storagerelay%3A%2F%2Fhttps%2Ffap.fpt.edu.vn%3Fid%3Dauth573826&response_type=permission%20id_token&scope=email%20profile%20openid&openid.realm&include_granted_scopes=true&client_id=183063314780-0j6vj5ddfm7j3lsledglk2egnk18up7f.apps.googleusercontent.com&ss_domain=https%3A%2F%2Ffap.fpt.edu.vn&fetch_basic_profile=true&gsiwebsdk=2&flowName=GeneralOAuthFlow"
        );

        await googleAuth.type('[type="email"', process.env.FPT_USERNAME);
        await googleAuth.click("#identifierNext");
        await googleAuth.waitForTimeout(1500);

        await googleAuth.type('[type="password"', process.env.FPT_PASSWORD);
        await googleAuth.click("#passwordNext");
        await googleAuth.waitForTimeout(1500);
        await googleAuth.close();

        await page.click("#loginform > center > div > div:nth-child(2) > div > div > div");
        const fapPage = await browser.newPage();
        await fapPage.waitForTimeout(120000);
        await fapPage.on("dialog", async (dialog) => {
                await dialog.accept();
        });
        fapCheckSWP(fapPage);
}

const fapCheckSWP = async (fapPage: puppeteer.Page) => {
        console.log("Alo");
        fapPage.goto("https://fap.fpt.edu.vn/FrontOffice/MoveSubject.aspx?id=27679");

        const id = setInterval(async () => {
                try {
                        await fapPage.select("#ctl00_mainContent_dllCourse", "27870");
                        await fapPage.waitForTimeout(10000);
                        setTimeout(async () => {
                                await fapPage.click("#ctl00_mainContent_btSave");
                        }, 10000);
                } catch (err) {
                        console.log(err);
                        clearInterval(id);
                        fapCheckSWP(fapPage);
                }
                await fapPage.reload();
        }, 15000);
};

bootCrawl();
