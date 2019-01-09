Vue.component('artwork-item', {
	props: ['artwork'],
	template: `
	<div>
		<img
			v-if='artwork.primaryimageurl !== null' 
			class='artwork-image' 
			v-bind:src='artwork.primaryimageurl'/>
		<div v-else
			class='no-image-container'>
			<p class='no-image'>No image available</p>
		</div>
		<div class='artwork-data-container'>
			<p class='artwork-data art-title'>{{ artwork.title }}</p>
			<p v-if='artwork.people' class='artwork-data art-artist-known'>{{ artwork.people[0].name }}</p>
			<p v-else class='artwork-data art-artist-unknown'>Artist Unknown</p>
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
		axios.get(`https://api.harvardartmuseums.org/object?size=100&height=150&width=150&apikey=${APIKey}`)
			.then(response => { this.artworksList = response.data.records })
			.catch(error => console.log(error))
	}
});
