var reporter = require('cucumber-html-reporter');
 
var options = {
        theme: 'bootstrap',
        jsonFile: 'cucumber_report.json',
        output: 'cucumber_report.html',
        reportSuiteAsScenarios: true,
        launchReport: true
    };
 
    reporter.generate(options);