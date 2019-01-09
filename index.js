// const APIkey = require('./APIKey/APIKey.js').default
// import APIkey from './APIKey/APIKey.js';

Vue.component('artwork-item', {
	props: ['artwork'],
	template: `
	<div>
		<img 
			class='artwork-image' 
			v-bind:src='artwork.primaryimageurl'/>
		<div class='artwork-data-container'>
			<p class='artwork-data art-title'>{{ artwork.title }}</p>
			<p class='artwork-data art-technique'>{{ artwork.technique }}</p>
			<p class='artwork-data art-medium'>{{ artwork.medium }}</p>
			<p class='artwork-data art-date'>{{ artwork.dated }}</p>
		</div>
	</div>
	`
})

var app = new Vue({
	el: '#app',
	data: {
		artworksList: []
	},
	mounted() {
		// axios.get(`https://api.harvardartmuseums.org/object?size=100&height=150&width=150&apikey=${APIKey}`)
		axios.get(`https://api.harvardartmuseums.org/object?size=100&height=150&width=150&apikey=589656b0-12bc-11e9-90d1-473127181d8c`)
			.then(response => { this.artworksList = response.data.records })
			.catch(error => console.log(error))
	}
});
