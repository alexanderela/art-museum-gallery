Vue.component('artwork-item', {
	props: ['artwork'],
	template: `
	<div>
		<img
			v-if='artwork.image !== null' 
			class='artwork-image' 
			v-bind:src='artwork.image'/>
		<div v-else
			class='no-image-container'>
			<p class='no-image'>No image available</p>
		</div>
		<div class='artwork-data-container'>
			<p class='artwork-data artwork-title'>{{ artwork.title }}</p>
			<p class='artwork-data artwork-artist'>{{ artwork.artist }}</p>
			<p class='artwork-data artwork-medium'>{{ artwork.medium }}</p>
			<p class='artwork-data artwork-date'>{{ artwork.date }}</p>
		</div>
	</div>
	`
})

var app = new Vue({
	el: '#app',
	data: {
		artworksList: [],
		count: 1,
	},
	methods: {
		updateCount: function(e) {
			if(e.target.name === 'previous' && this.count > 1) {
				this.count -= 1
			} else if(e.target.name === 'next' && this.count < 10) {
				this.count += 1				
			}
			this.updateVisibleArtworksOnPageChange()
		},
		checkMediumAndTechnique(technique, medium) {
			if(technique === null) {
				return medium
			} else if (medium === null) {
				return technique
			}
		},
		checkArtist(artwork) {
			const artworkKeys = Object.keys(artwork)
			if(artworkKeys.includes('people')) {
				return artwork.people[0].name
			} else {
				return 'Artist Unknown'
			}
		},
		cleanArtworkData(fetchedArtworkData) {
			const cleanedArtworkData = fetchedArtworkData.map(artwork => {

			const { primaryimageurl, title, people, technique, medium, dated } = artwork
				return {
					image: primaryimageurl,
					title: title,
					artist: this.checkArtist(artwork),
					medium: this.checkMediumAndTechnique(technique, medium),
					date: dated
				}	
			})

			return cleanedArtworkData
		},
		updateVisibleArtworksOnPageChange() {
			axios.get(`https://api.harvardartmuseums.org/object?page=${this.count}&height=150&width=150&apikey=589656b0-12bc-11e9-90d1-473127181d8c`)
				.then(response => { this.artworksList = this.cleanArtworkData(response.data.records) })
				.catch(error => console.log(error))			
		}
	},
	mounted() {
		axios.get(`https://api.harvardartmuseums.org/object?page=1&height=150&width=150&apikey=589656b0-12bc-11e9-90d1-473127181d8c`)
			.then(response => { this.artworksList = this.cleanArtworkData(response.data.records) })
			.catch(error => console.log(error))
	}
});
