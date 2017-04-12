var keys = require('./keys.js');
var twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");
var fs = require('fs');

console.log("Type my-tweets , spotify-this-song , movie-this , or do-what-it-says to get started!");

var actionOne = process.argv[2];
var actionTwo = process.argv[3];

	for(i = 4; i <process.argv.length; i++){
	    actionTwo += '+' + process.argv[i];
	}

function switching(){
	//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
	//executes according to what is specified. I like this method.
	switch(actionOne){

		case 'my-tweets':
		getTweets();
		break;

		case 'spotify-this-song':
		spotifyMe();
		break;

		case 'movie-this':
		aMovieForMe();
		break;

		case 'do-what-it-says':
		whatitsays();
		break;	
	}
};

function getTweets(){
	console.log("this is loaded!");

	//not sure how to connect this Twitter stuff
	exports.twitterKeys = {
	  consumer_key: 'gPPM58DF3gYxquucUI0PCC3BH',
	  consumer_secret: 'swr3QbL6vgvtZDhGYhdlAILC7h2h0kqunnmDwYdx0GsdvCS6l7',
	  access_token_key: '779056251632250880-MC0t31Ib8CKmLybKuWGIIx0YztITyqs',
	  access_token_secret: 'wTdwrHKSGxbR0bH3WIkU14WRwiMisCtVuLFWnlyoACJUk',
	}

	var client = new twitter({ 
		consumer_key: exports.twitterKeys.consumer_key,
		consumer_secret: exports.twitterKeys.consumer_secret,
		access_token_key: exports.twitterKeys.access_token_key,
		access_token_secret: exports.twitterKeys.access_token_secret

	});

	var scope = {
		screen_name: 'multishifties',
		count: 20
	};

	client.get('statuses/user_timeline', scope, function(error, tweets, response){
		if (!error) {
	        for (i=0; i<tweets.length; i++) {
	            var returnedData = ('Number: ' + (i+1) + '\n' + tweets[i].created_at + '\n' + tweets[i].text + '\n');
	            console.log(returnedData);
	        }
	    };
	});
};

function spotifyMe(){

	var searchTrack;
	if(actionTwo === undefined){
		searchTrack = "The Sign";
	}else{
		searchTrack = actionTwo;
	}

	spotify.search({type:'track', query:searchTrack}, function(err, data){
	    if(err){
	        console.log('Error occurred: ' + err);
	        return;
	    }else{
	  		console.log("Artist: " + data.tracks.items[0].artists[0].name);
	        console.log("Song: " + data.tracks.items[0].name);
	        console.log("Album: " + data.tracks.items[0].album.name);
	        console.log("Preview Here: " + data.tracks.items[0].preview_url);
	    }
	});
};

function aMovieForMe(){

	var searchMovie;
	if(actionTwo === undefined){
		searchMovie = "Mr. Nobody";
	}
	else{
		searchMovie = actionTwo;
	};

	var url = 'http://www.omdbapi.com/?t=' + searchMovie +'&y=&plot=long&tomatoes=true&r=json';
   	request(url, function(error, response, body){
	    if(!error && response.statusCode == 200){
	        console.log("Title: " + JSON.parse(body)["Title"]);
	        console.log("Year: " + JSON.parse(body)["Year"]);
	        console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
	        console.log("Country: " + JSON.parse(body)["Country"]);
	        console.log("Language: " + JSON.parse(body)["Language"]);
	        console.log("Plot: " + JSON.parse(body)["Plot"]);
	        console.log("Actors: " + JSON.parse(body)["Actors"]);
	        console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"]);
	        console.log("Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"]);
	    }
    });
};

function whatitsays(){
	console.log("Looking at random.txt now");
	fs.readFile("random.txt", "utf8", function(error, data) {
	    if(error){
     		console.log(error);
     	}
     	else {
     	
     	var dataArray = data.split(',');
        actionOne = dataArray[0];
        actionTwo = dataArray[1];
        
        for(i = 2; i < dataArray.length; i++){
            actionTwo = actionTwo + "+" + dataArray[i];
        };
		
		switching();
    	};
    });
};

switching();