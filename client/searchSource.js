
var options = {
	// cache zeit in Milisekunden
	keepHistory: 1000 * 60 * 5,
	localSearch: true
};

var fields = ['firstname', 'lastname']

UserSearch = new SearchSource('users', fields, options);