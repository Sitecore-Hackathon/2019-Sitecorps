var yargs = require("yargs").argv;

module.exports = function () {
    var instanceRoot = yargs.instanceRoot || "C:\\inetpub\\wwwroot\\sc910.sc";
    var config = {
        instanceRoot        : instanceRoot,
        transform           : yargs.transform           || "LOCAL", // .transform file extension
        websiteRoot         : yargs.websiteRoot         || instanceRoot + "\\",
        dataRoot            : yargs.dataRoot            || instanceRoot + "\\App_Data",
        srcRoot             : yargs.srcRoot             || "./src",
        hostName            : yargs.hostName            || "http://sc910.sc" ,
        solutionName        : yargs.solutionName        || "Hackathon.Boilerplate",
        buildConfiguration  : yargs.buildConfiguration  || "Debug",
        buildPlatform       : yargs.buildPlatform       || "Any CPU",
        publishPlatform     : yargs.publishPlatform     || "AnyCpu",
        toolsVersion        : yargs.toolsVersion        || "auto", // or 14.0, 15.0, etc
        runCleanBuilds      : yargs.runCleanBuilds      || false,
        licensePath         : yargs.licensePath         || instanceRoot + "\\App_Data\\license.xml", // Needed for Unit Testing
        skipVanilla         : yargs.skipVanilla         || false // Needed for octopus layered deploy
    };
    return config;
}
