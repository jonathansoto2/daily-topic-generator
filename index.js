// WE want an API or to create an API 
//API will be a topic (person, place, item)[pertaining to history, current event]
// randomly select one for the day (every 24hrs change to new topic for “daily topic”
//Center will be a topic generator that will generate new topic when button is clicked
// each new topic will have 3 links underneath that leads to an article about the topic//each topic will have 3 links to YouTube videos about the topic

const topic = document.getElementById("new-topic");
const description = document.getElementById("description-area");



var config = {
  method: 'get',
  url: 'https://api.predicthq.com/v1/events/?local_rank\n',
  headers: { 
    'Authorization': 'Bearer access'
  }
};


// Using config to get the data and change the topic <p> 
axios(config)
.then(function (response) {
    JSON.stringify(response.data)


    topic.innerHTML = response.data.results[1].title;
    description.innerHTML = response.data.results[1].description


    console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
