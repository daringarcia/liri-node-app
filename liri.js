var axios = require('axios');
var Spotify = require('node-spotify-api');
var keys = require('./keys');
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var moment =require("moment");

var command = process.argv[2];
var searchTerm = process.argv.slice(3).join('');

function spotifyThisSong() {
    if(!searchTerm) {
        searchTerm = 'November Rain';
    } 
    spotify
        .search({
            type: 'track',
            query: searchTerm,
        })
        .then(function (response) {
            response.tracks.items.forEach(function (track) {
                console.log('--------------');
                console.log(`Preview: ${track.preview_url}`);
                console.log(`Track name: ${track.name}`);
                console.log(`Artist name: ${track.artists[0].name}`);
                console.log(`Album name: ${track.album.name}`);
            })
        })
        .catch(function (err) {
            console.log(err);
        });
    }    

    if (command === 'spotify-this-song'){
        spotifyThisSong();
    };

function movieThis(){

    if(!searchTerm){
        searchTerm = 'Top Gun';
}

axios.get(`https://www.omdbapi.com/?&apikey=trilogy&t=` + searchTerm)
    .then(function(response){
        console.log("Title:" + " " + response.data.Title);
        console.log("Year:" + " " + response.data.Year);
        console.log("IMDB:" + " " + response.data.Ratings[0].Value);
        console.log("Plot:" + " " + response.data.Plot);
        console.log("Actors:" + " " + response.data.Actors);
    });
};
if (command === 'movie-this'){
    movieThis();
}; 

function concertThis (){
    
    axios.get('https://rest.bandsintown.com/artists/' + searchTerm + '/events?app_id=codingbootcamp')
        .then(function(response){
            
            var shows = response.data;
            for (i = 0; i < shows.length; i ++) {

            console.log('-------------------------------\n');
            console.log('Venue:' + '' + response.data[i].venue.name);
            console.log('Location:' + '' + response.data[i].venue.city);
            console.log('Date:' + '' + moment(response.data[i].datetime).format('MM/DD/YYYY'));
            }
        });
    };
    
    if (command === 'concert-this'){    
    
        concertThis();
    };

    function doWhatItSays(){
        fs.readFile('random.txt', 'utf8', function(error,data){
            console.log(data);
        if(error){
            console.error(error);
        }
        var dataArray = data.split(',');

        console.log(dataArray);

        command = dataArray[0];

        searchTerm = dataArray[1];

        spotifyThisSong();
        });
    }

    if (command === 'do-what-it-says')(
        doWhatItSays()
    );
