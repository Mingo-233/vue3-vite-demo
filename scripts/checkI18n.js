const VueI18NExtract = require('vue-i18n-extract');

const report = VueI18NExtract.createI18NReport({
    vueFiles: './src/views/**/*.?(js|vue)',
    languageFiles: './src/locales/**/*.?(json|yml|yaml|js)',
    output: 'output.json'
}).then(report => {
    // console.log(report);
    // if (report.missingKeys.length) {
    //     console.error('有存在遗漏的语言变量，请检查');
    //     process.exit(1);
    // }
})
