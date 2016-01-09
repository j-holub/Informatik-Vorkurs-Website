SimpleSchema.messages({
	// Felder die benötigt sind
	required: "[label] muss angegeben werden",
	// Verschiede Regular Expressions
	regEx: [
		// Email
		{exp: SimpleSchema.RegEx.Email, msg: "Keine gültige Email-Adresse"}
	]
});