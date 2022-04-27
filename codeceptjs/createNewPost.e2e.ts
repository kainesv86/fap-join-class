Feature("Create New Post");

const given = {
        userAccount: {
                username: "puppeteer",
                password: "123456789Aa",
        },
        postContent: {
                title: "Puppeteer is amazing",
                category: "IT",
                tag: ["Puppeteer", "Automation Test"],
                content: "Hello There, Pupperteer is control your browser",
        },
};
Scenario("Perform login account", ({ I }) => {
        // go to login page
        I.amOnPage("/auth/login");
        I.fillField("#username", given.userAccount.username);
        I.fillField("#password", given.userAccount.password);
        I.wait(2);
        I.click("#form-btn");

        // go to create post page
        I.amOnPage("/post/me");
        I.click("#createNewPost");
        I.wait(2);
        I.click(
                "body > main > div.flex.flex-col.flex-1.md\\:pt-32.bg-opacity-60 > div > div.w-full.px-4.space-y-6.lg\\:py-8 > div.grid.grid-cols-1.gap-4.md\\:grid-cols-2.lg\\:grid-cols-4.intro-y > div > div.flex.flex-col.justify-between.flex-1.px-4.py-6.duration-200.bg-white > a"
        );
        I.wait(2);
        I.fillField("#title", given.postContent.title);
        I.selectOption("#categoryId", given.postContent.category);
        I.fillField("#tag", given.postContent.tag[0]);
        I.pressKey("Enter");
        I.fillField("#tag", given.postContent.tag[1]);
        I.pressKey("Enter");
        I.wait(2);

        I.click("#editor > div.ql-editor");
        I.type(given.postContent.content);
        I.wait(2);
        I.click("#form-btn");
        I.click("#createBlogForm > div.flex.flex-col.space-y-2.lg\\:space-y-0.lg\\:space-x-2.md\\:items-center.md\\:flex-row > a");
        I.seeInPopup("Do you save your post, click ok to go to preview page");
        I.acceptPopup();
        I.wait(2);

        // check all valid information
        I.see(given.postContent.title);
        I.see(given.postContent.category);
        I.see(given.postContent.tag[0]);
        I.see(given.postContent.tag[1]);
        I.see(given.postContent.content);
});
