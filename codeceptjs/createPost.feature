Feature: Create New Post
    As A FPT Student, I want to create my own post
    Scenario:  Perform Create A Post Successfully
        Given Login with username and password (Test Account)
            | Username  | Password     |
            | puppeteer | 1234567890Aa |
        And  I Go to /auth/login
        When I fill username and password field with given account
        And  I click login button
        Then I should see the home page
        Given Post Content
            | Title                | Category | Tag                        | Content                                         |
            | Puppeteer is amazing | IT       | Puppeteer, Automation Test | Hello There, Pupperteer is control your browser |
        And  I Go to /post/me
        When I Go to that page
        And I click  create new draft button
        And I click  edit button in the first post
        Then I Go to the editor page
        When I fill title, category, tag, and content field with given post content
        And I click save button
        And I click preview button
        Then I should the popup dialog
        And I click accept button
        Then I Should go the preview page
        Then I check all information to confirm