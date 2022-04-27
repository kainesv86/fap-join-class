import puppeteer from "puppeteer";
export async function scrollToTop(page: puppeteer.Page) {
        await page.evaluate(async () => {
                await new Promise((resolve, reject) => {
                        var totalHeight = 0;
                        var distance = 200;
                        var timer = setInterval(() => {
                                var scrollHeight = document.body.scrollHeight;
                                window.scrollBy(0, distance);
                                totalHeight += distance;

                                if (totalHeight >= scrollHeight) {
                                        clearInterval(timer);
                                        resolve("");
                                }
                        }, 100);
                });
        });
}

export async function scrollToBottom(page: puppeteer.Page) {
        await page.evaluate(async () => {
                await new Promise((resolve, reject) => {
                        var totalHeight = 0;
                        var distance = 200;
                        var timer = setInterval(() => {
                                var scrollHeight = document.body.scrollHeight;
                                window.scrollBy(0, -distance);
                                totalHeight += distance;

                                if (totalHeight >= scrollHeight) {
                                        clearInterval(timer);
                                        resolve("");
                                }
                        }, 100);
                });
        });
}

export function delay(time: number) {
        return new Promise(function (resolve) {
                setTimeout(resolve, time);
        });
}
