const { src, dest, series, parallel, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const fsExtra = require('fs-extra');

function clean(done) {
    fsExtra.emptyDirSync('./publish');
    done();
}

function copyStatic() {
    return src('./src/**', { allowEmpty: true })
        .pipe(dest('./publish'));
}

function watchActivities() {
    watch('./src/**', { delay: 500 }, copyStatic);
}

function reloadServer(done) {
    browserSync.reload();
    done();
}
function browserSyncServer() {
    // static server
    browserSync.init({
        server: {
            baseDir: "./publish"
        }
    });
    watch('./src/**', { delay: 500 }, series(copyStatic, reloadServer)); // this is to force a reload on the browser if any new static content is updated
}

const dev = series(clean, parallel(copyStatic), browserSyncServer);

const build = series(clean, parallel(copyStatic));

exports.build = build;
exports.watchActivities = watchActivities;
exports.dev = dev;

exports.default = watchActivities;