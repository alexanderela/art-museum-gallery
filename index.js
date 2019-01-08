var app = new Vue({
	el: '#app',
	data: {
		message: 'Well, hello there'
	},
	methods: {
		reverseMessage: function() {
			this.message = this.message.split('').reverse().join('')
		}
	}
});

// app.todos.push({ text: 'newTodo' })