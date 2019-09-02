$(document).ready(function () {
    $.get("/api/getVideos", {})
        .then(function (req, res) {
            console.log(req, res)
            for (var i = 0; i < 10; i++) {
                $(".masonry").append(`
                <div class="brick">
                    <iframe width="352.2" height="198" src="https://www.youtube.com/embed/${req[i].link}" frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen></iframe>                
                </div>
                `)
            }
        })
        .catch(function (err) {
            console.log(err);
        });

    // $.get("/api/getAll", {}).then(function { })
})

    // $(".singleProductsHere")

