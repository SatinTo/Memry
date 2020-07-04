
class PlayProcessor {

	constructor(cardsArray, maxCard) {
		this.cards = cardsArray;
		this.max_card = maxCard;
	}

	getCards() {
		let cardItemsObject = Object.assign({}, this.cards); // Convert to object

		// Limit the maximum number of items
		let slicedObject = {};
		for (let i=0; i< this.max_card; i++)
			slicedObject[i] = cardItemsObject[i];
			
		slicedObject.length = 30;

		this.cards = slicedObject;
		return this.cards;
	}

	
}


export default PlayProcessor;