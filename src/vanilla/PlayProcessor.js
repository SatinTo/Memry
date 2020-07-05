import shuffleArray from "./shuffleArray";

class PlayProcessor {

	constructor(cardsArray, maxCard) {
		this.cards = cardsArray;

		if (this.cards.length < maxCard){
			this.max_card = this.cards.length;
		}else{
			this.max_card = maxCard;
		}
	}

	getCards() {
		let cardItemsObject = this.cards; // Convert to object

		// Reformat for Preserve the id
		for (let key in cardItemsObject) {
			cardItemsObject[key]["id"] = key;
		}

		cardItemsObject = shuffleArray(cardItemsObject);

		// Limit the maximum number of items
		let slicedObject = [];
		slicedObject.length = this.max_card; // Predefine the length of the array

		for (let i=0; i< this.max_card; i++){
			slicedObject[i] = cardItemsObject[i];
		}

		this.cards = slicedObject;
		return this.cards;
	}

	
}


export default PlayProcessor;