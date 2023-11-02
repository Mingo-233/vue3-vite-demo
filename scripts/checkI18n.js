const VueI18NExtract = require('vue-i18n-extract');
const util = require('util');

function logError(message) {
    const redError = '\x1b[31m%s\x1b[0m'; // 使用 ANSI 转义码设置文本颜色为红色
    console.error(util.format(redError, message));
}


const report = VueI18NExtract.createI18NReport({
    vueFiles: './src/views/**/*.?(js|vue)',
    languageFiles: './src/locales/**/*.?(json|yml|yaml|js)',
    output: 'output.json'
}).then(report => {
    logError('这是一条红色的错误信息！');

    // if (report.missingKeys.length) {
    //     console.error('有存在遗漏的语言变量，请检查');
    //     process.exit(1);
    // }
})
