module.exports = (function () {

    const BACKEND_API = process.env.LIKEDEMO_API;
    const BATCH_SIZE_FOR_THROUGHPUT = 40;

    var async = require('async');
    var yawp = require('yawp');

    yawp.config(function (c) {
        c.baseUrl(BACKEND_API ? BACKEND_API : 'http://localhost:8080/api');
    });

    function run() {
        if (process.argv.length != 5) {
            console.error('use: many-likes [post id] [total likes] [parallel requests]');
            return;
        }

        var postId = process.argv[2];
        var totalLikes = parseInt(process.argv[3], 10);
        var parallelRequests = parseInt(process.argv[4], 10);

        manyLikes(postId, totalLikes, parallelRequests);
    }

    function manyLikes(postId, totalLikes, parallelRequests) {
        var start = new Date();
        var done = 0;
        var batchDone = 0;
        var throughputStart = new Date();
        var throughputBatchCount = 0;
        var throughputBatchDone = 0;

        function like(i, callback) {
            if (batchDone >= BATCH_SIZE_FOR_THROUGHPUT) {
                logBatchThroughput();
                batchDone = 0;
            }

            var json = {
                postId: '/posts/' + postId
            };

            console.log('like', i+1);

            yawp('/likes').create(json).then(function () {
                done++;
                batchDone++;
                throughputBatchDone++;
                callback();
            }).catch(function (err) {
                console.log('fail?! ', err);
                callback();
            });
        }

        function throughput(start, total) {
            var elapsed = new Date().getTime() - start.getTime();
            var throughput = Math.floor(1000 * total / elapsed);
            return {elapsed: elapsed, throughput: throughput};
        }

        function logBatchThroughput() {
            var t = throughput(throughputStart, throughputBatchDone);
            yawp('/throughputs/' + postId).update({
                value: t.throughput,
                timestamp: new Date().getTime()
            });

            throughputBatchCount++;
            if (throughputBatchCount == 10) {
                throughputStart = new Date();
                throughputBatchDone = 0;
                throughputBatchCount = 0;
            }
        }

        function logTotalThroughput() {
            var t = throughput(start, totalLikes);
            console.log("Finished: " + totalLikes + " likes in " + (t.elapsed / 1000) + " seconds. " + t.throughput + " likes/sec")
        }

        async.timesLimit(totalLikes, parallelRequests, like, function () {
            logTotalThroughput();
        });
    }

    return {
        run: run
    };

})();

var manyLikes = require('./many-likes.js');

if (require.main === module) {
    manyLikes.run();
}
