import puppeteer from "puppeteer";
import fs from "fs";
import download from "download";

async function boot() {
        const browser = await puppeteer.launch({
                slowMo: 200, // delay each action (mili second)
                headless: false, // false to show the browser
        });

        // 1. Open browser
        const page = await browser.newPage();

        // 3. Go to editor
        await page.goto(
                "https://www.booking.com/searchresults.en-gb.html?label=namsan1-KaKsGFkOBn24g69IZeWOagS388489905322%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-36909704146%3Alp1028581%3Ali%3Adec%3Adm%3Appccp%3DUmFuZG9tSVYkc2RlIyh9YZnKoGAh3tLoA_MNQwn0RI8&sid=299bdc9ca65fa37585d8bab4ed0e3fbe&aid=314920&lang=en-gb&sb=1&src_elem=sb&error_url=https%3A%2F%2Fwww.booking.com%2Fsearchresults.en-gb.html%3Faid%3D314920%3Blabel%3Dnamsan1-KaKsGFkOBn24g69IZeWOagS388489905322%253Apl%253Ata%253Ap1%253Ap2%253Aac%253Aap%253Aneg%253Afi%253Atikwd-36909704146%253Alp1028581%253Ali%253Adec%253Adm%253Appccp%253DUmFuZG9tSVYkc2RlIyh9YZnKoGAh3tLoA_MNQwn0RI8%3Bsid%3D299bdc9ca65fa37585d8bab4ed0e3fbe%3Btmpl%3Dsearchresults%3Bcheckin_year_month_monthday%3D2022-03-01%3Bcheckout_year_month_monthday%3D2022-03-02%3Bclass_interval%3D1%3Bfrom_sf%3D1%3Bgroup_adults%3D2%3Bgroup_children%3D0%3Blabel_click%3Dundef%3Bno_rooms%3D1%3Boffset%3D0%3Broom1%3DA%252CA%3Bsb_price_type%3Dtotal%3Bsearch_pageview_id%3D619e9906ac560169%3Bshw_aparth%3D1%3Bslp_r_match%3D0%3Bsrc%3Dlandmark%3Bsrc_elem%3Dsb%3Bsrpvid%3D148a996e5b050194%3Bss%3DHo%2520Chi%2520Minh%3Bssb%3Dempty%3Bssne%3DNamsan%2520Park%3Bssne_untouched%3DNamsan%2520Park%26%3B&ss=Ho+Chi+Minh+City&is_ski_area=0&ssne=Ho+Chi+Minh+City&ssne_untouched=Ho+Chi+Minh+City&city=-3730078&checkin_year=2022&checkin_month=3&checkin_monthday=1&checkout_year=2022&checkout_month=3&checkout_monthday=2&group_adults=2&group_children=0&no_rooms=1&from_sf=1&order=upsort_bh"
        );

        await page.waitForSelector(
                `#search_results_table > div > div > div > div > div._814193827 > div:nth-child(4) > div._5d6c618c8 > div._7192d3184 > div > div:nth-child(1) > div > div._29c344764._f57705597 > div > div:nth-child(1) > div > h3 > a`
        );
        await page.click(
                `body > main > div.flex.flex-col.flex-1.md\\:pt-32.bg-opacity-60 > div > div.w-full.px-4.space-y-6.lg\\:py-8 > div.grid.grid-cols-1.gap-4.md\\:grid-cols-2.lg\\:grid-cols-4.intro-y > div:nth-child(1) > div.flex.flex-col.justify-between.flex-1.px-4.py-6.duration-200.bg-white > a`
        );

        // 4. Input data
        await page.waitForSelector(`#title`);
        await page.$eval(`#title`, (item) => {
                (item as HTMLInputElement).value = "Demo puppeteer library";
        });

        await page.waitForSelector(`#editor > div.ql-editor`);
        await page.$eval(`#editor > div.ql-editor`, (item) => {
                (item as HTMLInputElement).innerHTML = `<h1>Hello, we are group 1. This is our demonstration for SWT</h1>
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer maximus justo id auctor blandit. Phasellus a dolor quam. In rhoncus faucibus mauris, vitae fermentum felis condimentum vitae. Etiam eu tempus risus. Praesent luctus, tellus id elementum ultricies, mi massa facilisis nisl, nec fermentum orci ipsum ac justo. Etiam vitae commodo sapien. Nunc et lobortis odio. Nam orci tellus, maximus non blandit et, tempus at ipsum. Quisque est dui, imperdiet vitae lacus elementum, dictum dapibus augue. Nulla facilisi. Vestibulum porta arcu quis interdum convallis.

                                                        Pellentesque a leo malesuada, pretium ipsum in, maximus erat. Nulla dictum lectus quis urna posuere, eget rutrum turpis euismod. Mauris lacinia cursus dictum. Donec volutpat interdum nulla ac pellentesque. Proin egestas hendrerit dapibus. Donec blandit, metus sit amet fringilla ultricies, purus dui euismod elit, quis fringilla libero ipsum non sem. Curabitur imperdiet nisl magna. Etiam sapien nisi, iaculis non massa sed, molestie ultrices dolor. Etiam in tempus mauris. Proin in pulvinar mauris, egestas faucibus dui. In ultricies quis orci vel facilisis. Etiam in bibendum turpis. Duis mauris eros, volutpat a ultricies ut, dignissim non magna. Etiam ex erat, euismod volutpat felis eu, gravida lacinia mi. Maecenas semper diam eget odio consequat, in aliquet sapien porta. Vivamus feugiat quam vitae eleifend vulputate.
                                                        
                                                        Quisque maximus elit at erat congue, quis congue libero facilisis. Cras eu mi quis turpis pharetra faucibus ut nec urna. Phasellus nulla nulla, pulvinar vel nunc a, lobortis accumsan diam. Vestibulum arcu enim, molestie at leo sit amet, blandit molestie metus. Pellentesque sed laoreet dui, ut vulputate velit. Suspendisse consectetur, lorem nec porttitor sagittis, turpis justo egestas massa, eu hendrerit diam libero ultrices sem. Mauris vel commodo libero. Fusce sit amet diam a tortor ullamcorper consectetur. Nulla vitae enim eu erat consequat scelerisque. Pellentesque in nisi sit amet nisi lacinia blandit. Donec vel leo mi. Curabitur congue felis ex, id faucibus quam dignissim ac. Curabitur volutpat cursus sem in interdum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;</p>`;
        });

        await page.waitForSelector(`#categoryId > option:nth-child(2)`);
        await page.select(`#categoryId`, "34842ba8-3d29-488f-9448-cf5b6d6c44a1");

        // 5. Save changes
        await page.waitForSelector(`#form-btn`);
        await page.click(`#form-btn`);

        // 6. Review
        await page.waitForSelector(`#createBlogForm > div.flex.flex-col.space-y-2.lg\\:space-y-0.lg\\:space-x-2.md\\:items-center.md\\:flex-row > a`);
        await page.evaluate(`window.confirm = () => true`);
        await page.click(`#createBlogForm > div.flex.flex-col.space-y-2.lg\\:space-y-0.lg\\:space-x-2.md\\:items-center.md\\:flex-row > a`);
}

boot();
