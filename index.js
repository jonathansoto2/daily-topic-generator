// WE want an API or to create an API 
//API will be a topic (person, place, item)[pertaining to history, current event]
// randomly select one for the day (every 24hrs change to new topic for “daily topic”
//Center will be a topic generator that will generate new topic when button is clicked
// each new topic will have 3 links underneath that leads to an article about the topic//each topic will have 3 links to YouTube videos about the topic

const topic = document.getElementById("new-topic");
const description = document.getElementById("description-area");
const video_area = document.getElementsByClassName("video-results-1")[0];
const HQ_KEY = config.HQ_KEY;
const YT_KEY = config.YT_KEY;



var HQ_config = {
  method: 'get',
  url: 'https://api.predicthq.com/v1/events/?local_rank\n',
  headers: { 
    'Authorization': 'Bearer ' + HQ_KEY
  }
};



// Using config to get the data and change the topic <p> 
axios(HQ_config)
.then(function (response) {

    topic.innerHTML = response.data.results[1].title;
    description.innerHTML = response.data.results[1].description


// request based on the event returned by the PredictHQ API 
    let one = 'https://www.googleapis.com/youtube/v3/search?key='+ YT_KEY +'&part=snippet&q='+ response.data.results[1].title
    let two = "https://www.googleapis.com/youtube/v3/search?key=" + YT_KEY + "&part=snippet&q=dogs"
    
    
    const requestOne = axios.get(one);
    
    const requestTwo = axios.get(two);
    
    //makes request to the google/youtube search api
    axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
      const responseOne = responses[0]
      const responseTwo = responses[1]
    

      const url = JSON.parse(JSON.stringify(responseOne.data.items[1].snippet.thumbnails.high.url))

        video_area.setAttribute("src", url)
        video_area.src = JSON.stringify(responseOne.data.items[1].snippet.thumbnails.high.url);
    

//creating an iFrame for the youtube video

        for(var i = 0; i<3; i++){

            var ifrm = `
        <iframe src="http://www.youtube.com/embed/${JSON.parse(JSON.stringify(responseOne.data.items[i].id.videoId))} frameborder='0' allowfullscreen"></iframe>
        
        `
        document.getElementsByClassName("video-results-" + (i+1).toString())[0].innerHTML = ifrm;
        }
        
        
    //     document.createElement("iframe");
    //    ifrm.setAttribute("src", "http://www.youtube.com/embed/" + JSON.stringify(responseOne.data.items[1].id.videoId));
    //    video_area.appendChild(ifrm);


      //use/access the results 
    })).catch(errors => {
      console.log(errors);
    })

   //console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});



