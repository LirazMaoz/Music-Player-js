var audio;

$(document).ready(function () {
    var key = 0;

    songData = [{
            id: 1,
            author: 'Dua Lipa',
            nameSong: 'Break My Heart',
            image: 'cover1.png',
        },
        {
            id: 2,
            author: 'Dua Lipa',
            nameSong: "Don't Start Now",
            image: 'cover4.jpg',
        },
        {
            id: 3,
            author: 'The Weeknd',
            nameSong: "Blinding Lights",
            image: 'cover2.png',
        },
        {
            id: 4,
            author: 'Years Around The Sun',
            nameSong: "Miles Away",
            image: 'cover3.jpg',
        }
    ]

    filteredSongs = songData.map(song => {
        var id = song.nameSong.split(' ').join('-').toLowerCase()
        $('#playlist').append('<li id="' + id + song.id + '">' + song.nameSong + '</li>')
    });

    $('#pause').hide();



    //Initialize Audio
    initAudio();

    //Initializer Function
    function initAudio() {

        var song = songData[key].author + ' - ' + songData[key].nameSong + '.mp3';
        var title = songData[key].nameSong;
        var cover = songData[key].image;
        var artist = songData[key].author;
        //create Audio Object
        
        audio = new Audio('songs/' + song);
        if (!audio.currentTime) {
            $('#duration').html('0.00');
        }


        // $('playlist li').removeClass('active');
        // element.addClass('active');
        $('li').click(function () {
            audio.pause();

            var name = $(this).html()
            $('.active').removeClass('active');
                $(this).addClass('active')
            var filt = songData.filter(song => song.nameSong == name)
            audio = new Audio('songs/'+filt[0].author + ' - ' + filt[0].nameSong + '.mp3')
            console.log(audio);
            $('#audio-info>.title').html(filt[0].nameSong);
            $('#audio-info>.artist').html(filt[0].author);
            $('img.cover').attr('src', 'pics/cover/' + filt[0].image);

            setTimeout(function(){
                audio.play();
                $('#play').hide();
        $('#pause').show();
        showDuration();

            },500)

            $('#play').hide();
            $('#pause').show();

        })
        $('#audio-info>.title').html(title);
        $('#audio-info>.artist').html(artist);
        
        //Insert Cover Photo
        $('img.cover').attr('src', 'pics/cover/' + cover);
    }



    //Play Button
    $('#play').click(function () {
        audio.pause();
        audio.play();
        $('#play').hide();
        $('#pause').show();
        $('#duration').fadeIn(400);
        showDuration();
    });

    //Pause Button
    $('#pause').click(function () {
        audio.pause();
        $('#pause').hide();
        $('#play').show();

    });

    //Stop Button
    $('#stop').click(function () {
        audio.pause();
        audio.currentTime = 0;
        $('#pause').hide();
        $('#play').show();
        $('#duration').fadeOut(400);
    });

    //Next Button
    $('#next').click(function () {
        audio.pause();
        ++key
if(key === songData.length){
    key=0
}
        initAudio();
        setTimeout(function(){
            audio.play();
            $('#play').hide();
    $('#pause').show();
    showDuration();

        },500)

    });

    //Prev Button
    $('#prev').click(function () {
        audio.pause();
        --key
        if(key < 0){
            key=songData.length -1
        }
        initAudio();
        setTimeout(function(){
            audio.play();
            $('#play').hide();
    $('#pause').show();
    showDuration();

        },500)


    });

    //volume Control
    $('#volume').change(function () {
        audio.volume = parseFloat(this.value / 10);
    });




    //Time Duration
    function showDuration() {
        $(audio).bind('timeupdate', function () {
            //Get Seconds & Minutes
            var m = parseInt((audio.currentTime / 60) % 60);
            var s = parseInt(audio.currentTime) % 60;
            //Add 0 if less than 10
            if (s < 10) {
                s = '0' + s;
            }
            $('#duration').html(m + '.' + s);
            var value = 0;
            if (audio.currentTime > 0) {
                value = ((100 / audio.duration) * audio.currentTime);
            }
            $('#progress').css('width', value + '%');
        });
    }
});