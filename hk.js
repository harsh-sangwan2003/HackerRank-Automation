const puppeteer = require('puppeteer');

const codeObj = require('./code');

let page;
const loginLink = "https://www.hackerrank.com/auth/login"
const email = "modefa7773@xgh6.com";
const passwd = "Samay@229";

let browserOpen = puppeteer.launch({

    headless: false,
    defaultViewport: null,
    args: ['--start-maximized']
})

browserOpen.then(browserObj => {

    let browserOpenPromise = browserObj.pages();
    return browserOpenPromise;

}).then(pagesArr => {

    page = pagesArr[0];
    page.goto(loginLink);

}).then(() => {

    let waitForSelectorPromise = page.waitForSelector("#input-1");
    return waitForSelectorPromise;

}).then(() => {

    let emailEnteredPromise = page.type("#input-1", email, { delay: 50 });
    return emailEnteredPromise;

}).then(() => {

    let passwdEnteredPromise = page.type("#input-2", passwd, { delay: 50 });
    return passwdEnteredPromise;

}).then(() => {

    let loginClickPromise = page.click('button[data-analytics="LoginPassword"]', { delay: 50 });
    return loginClickPromise;

}).then(() => {

    let clickOnAlgoPromise = waitAndClick('a[data-attr1="algorithms"]', page);
    return clickOnAlgoPromise;

}).then(() => {

    let getToWarmpUp = waitAndClick('input[value="warmup"]', page);
    return getToWarmpUp;

}).then(() => {

    let waitfor3secPromise = page.waitForTimeout(4000);
    return waitfor3secPromise;

}).then(() => {

    let allChallengesArrPromise = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled');
    return allChallengesArrPromise;

}).then(questionArr => {

    let questionSolvedPromise = questionSolve(page, questionArr[0], codeObj.answers[0]);
    return questionSolvedPromise;
})

function questionSolve(page, question, answer) {

    return new Promise((resolve, reject) => {

        let questionClickPromise = question.click();
        questionClickPromise.then(() => {

            let editorInFocusPromise = waitAndClick(".hr-monaco-base-editor", page);
            return editorInFocusPromise;

        }).then(() => {

            let checkBoxClickPromise = page.click('input[type="checkbox"]');
            return checkBoxClickPromise;

        }).then(() => {

            return page.waitForSelector("textarea.custominput");

        }).then(() => {

            return page.type("textarea.custominput", answer, { delay: 10 });

        }).then(() => {

            let ctrlIsPressedPromise = page.keyboard.down("Control");
            return ctrlIsPressedPromise;

        }).then(() => {

            let AIsPressedPromise = page.keyboard.press("A");
            return AIsPressedPromise;

        }).then(() => {

            let XIsPressedPromise = page.keyboard.press("X");
            return XIsPressedPromise;

        }).then(() => {

            let ctrlIsPressedPromise = page.keyboard.up("Control");
            return ctrlIsPressedPromise;

        }).then(() => {

            let mainEditorInFocusPromise = waitAndClick(".hr-monaco-base-editor", page);
            return mainEditorInFocusPromise;

        }).then(() => {

            let ctrlIsPressedPromise = page.keyboard.down("Control");
            return ctrlIsPressedPromise;

        }).then(() => {

            let AIsPressedPromise = page.keyboard.press("A");
            return AIsPressedPromise;

        }).then(() => {

            let VISPressedPromise = page.keyboard.press("V");
            return VISPressedPromise;

        }).then(() => {

            let ctrlIsPressedPromise = page.keyboard.up("Control");
            return ctrlIsPressedPromise;

        }).then(() => {

            let submitClickPromise = waitAndClick(".hr-monaco-submit", page);
            return submitClickPromise;

        }).then(() => {

            resolve();

        }).catch(err => {

            reject();

        })
    })
}

function waitAndClick(selector, cPage) {

    return new Promise((resolve, reject) => {

        let waitForModelPromise = cPage.waitForSelector(selector);
        waitForModelPromise.then(() => {

            let clickModel = cPage.click(selector, { delay: 50 });
            return clickModel;
        }).then(() => {

            resolve();
        }).catch(err => {

            reject();
        })
    })
}