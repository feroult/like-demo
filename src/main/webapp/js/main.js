(function ($) {

    var maxThroughput = 0;
    var previousLikes = {};

    function format(num, digits) {
        if (!num) {
            return 0;
        }

        var si = [
            {value: 1E18, symbol: "E"},
            {value: 1E15, symbol: "P"},
            {value: 1E12, symbol: "T"},
            {value: 1E9, symbol: "G"},
            {value: 1E6, symbol: "M"},
            {value: 1E3, symbol: "k"}
        ], rx = /\.0+$|(\.[0-9]*[1-9])0+$/, i;
        for (i = 0; i < si.length; i++) {
            if (num >= si[i].value) {
                return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
            }
        }
        return num.toFixed(digits).replace(rx, "$1");
    }

    function throughputPolling() {
        function loop() {
            setTimeout(throughputPolling, 2000);
        }

        function expired(timestamp) {
            if (!timestamp) {
                return true;
            }
            var elapsed = new Date().getTime() - timestamp;
            return elapsed / 1000 > 15;
        }

        yawp('/throughputs').list(function (ts) {
            try {
                var current = 0;
                ts.forEach(function (t) {
                    var value = 0;
                    if (!expired(t.timestamp)) {
                        value = t.value;
                    }

                    current += value;
                });

                if (current > maxThroughput) {
                    maxThroughput = current;
                }

                $('#current-throughput').html(format(current, 1));
                $('#max-throughput').html(format(maxThroughput, 1));


            } catch (err) {
                console.error('err?', err);
            } finally {
                loop();
            }

        }).catch(function (err) {
            console.error('err?', err);
            loop();
        });
    }

    function likesPolling() {
        function loop() {
            setTimeout(likesPolling, 2000);
        }

        yawp('/posts').order([{p: 'title'}]).list(function (posts) {
            try {
                posts.forEach(function (post) {
                    showPost(post);
                });
            } catch (err) {
                console.error('err?', err);
            } finally {
                loop();
            }

        }).catch(function (err) {
            console.error('err?', err);
            loop();
        });
    }

    function showPost(post) {
        var prev = previousLikes[post.id];

        var added;
        if (prev) {
            added = post.likes - prev.likes;
        }

        var id = post.id.replace(new RegExp('/', 'g'), '');
        var div = $('<div id="' + id + '" />');
        div.append('<label class="left">' + post.title + '</label>');
        div.append('<span class="likes">' + post.likes + '</span> likes');
        div.append('<span class="added">' + (added ? '+' + format(added, 0) : '') + '</span>');

        var selector = '#' + id;
        if ($(selector).length) {
            $(selector).html(div.html());
        } else {
            $('section.posts').append(div);
        }

        previousLikes[post.id] = post;
    }

    $(document).ready(function () {
        throughputPolling();
        likesPolling();
    });

})(jQuery);