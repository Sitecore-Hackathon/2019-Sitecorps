var gulp = require("gulp");
var msbuild = require("gulp-msbuild");
var foreach = require("gulp-foreach");
var watch = require("gulp-watch");
var runSequence = require("run-sequence");
var config = require("./scripts/gulp-sub-tasks.js").config;
var unicorn = require("./scripts/unicorn.js");
var habitat = require("./scripts/habitat.js");
var exec = require('child_process').exec;

gulp.task("default", function (callback) {
    // config.runCleanBuilds = true;
    return runSequence(
      // "SUB-App-Offline",
      "LOCAL-01-Publish-All-Projects",
      "LOCAL-02-Apply-Xml-Transform",
      // "SUB-App-Online",
      // "LOCAL-03-Sync-Unicorn",
      callback);
});


/*****************************
  Local Deploy
*****************************/

gulp.task("LOCAL-01-Publish-All-Projects", function (callback) {
    return runSequence(
    "Sub-Nuget-Restore",
    "Sub-Build-Solution",
    "Sub-Publish-Foundation-Projects",
    "Sub-Publish-Feature-Projects",
    "Sub-Publish-Project-Projects",
    // "Sub-Publish-Node-Modules",
    callback);
});

gulp.task("LOCAL-02-Apply-Xml-Transform", function (callback) {
    return runSequence(
      "Sub-Apply-Transforms",
      callback);
});

gulp.task("LOCAL-03-Sync-Unicorn", function (callback) {
    var options = {};
    options.siteHostName = habitat.getSiteUrl();
    options.authenticationConfigFile = config.websiteRoot + "/App_config/Include/Unicorn/Unicorn.zSharedSecret.config";

    unicorn(function () { return callback() }, options);
});



/*****************************
  Copy assemblies to all local projects
*****************************/
//gulp.task("Copy-Local-Assemblies", function () {
//  console.log("Copying site assemblies to all local projects");
//  var files = config.sitecoreLibraries + "/**/*";

//  var root = "./src";
//  var projects = root + "/**/code/bin";
//  return gulp.src(projects, { base: root })
//    .pipe(foreach(function (stream, file) {
//      console.log("copying to " + file.path);
//      gulp.src(files)
//        .pipe(gulp.dest(file.path));
//      return stream;
//    }));
//});

/*****************************
 Watchers
*****************************/
gulp.task("Auto-Publish-Css", function () {
  var root = "./src";
  var roots = [root + "/**/styles", "!" + root + "/**/obj/**/styles"];
  var files = "/**/*.css";
  var destination = config.websiteRoot + "\\styles";
  gulp.src(roots, { base: root }).pipe(
    foreach(function (stream, rootFolder) {
      gulp.watch(rootFolder.path + files, function (event) {
        if (event.type === "changed") {
          console.log("publish this file " + event.path);
          gulp.src(event.path, { base: rootFolder.path }).pipe(gulp.dest(destination));
        }
        console.log("published " + event.path);
      });
      return stream;
    })
  );
});

gulp.task("Auto-Publish-Views", function () {
  var root = "./src";
  var roots = [root + "/**/Views", "!" + root + "/**/obj/**/Views"];
  var files = "/**/*.cshtml";
  var destination = config.websiteRoot + "\\Views";
  gulp.src(roots, { base: root }).pipe(
    foreach(function (stream, rootFolder) {
      gulp.watch(rootFolder.path + files, function (event) {
        if (event.type === "changed") {
          console.log("publish this file " + event.path);
          gulp.src(event.path, { base: rootFolder.path }).pipe(gulp.dest(destination));
        }
        console.log("published " + event.path);
      });
      return stream;
    })
  );
});

gulp.task("Auto-Publish-Assemblies", function () {
  var root = "./src";
  var roots = [root + "/**/code/**/bin"];
  var files = "/**/*.{Feature,Foundation,Website}.*.{dll,pdb}";;
  var destination = config.websiteRoot + "/bin/";
  gulp.src(roots, { base: root }).pipe(
    foreach(function (stream, rootFolder) {
      gulp.watch(rootFolder.path + files, function (event) {
        if (event.type === "changed") {
          console.log("publish this file " + event.path);
          gulp.src(event.path, { base: rootFolder.path }).pipe(gulp.dest(destination));
        }
        console.log("published " + event.path);
      });
      return stream;
    })
  );
});