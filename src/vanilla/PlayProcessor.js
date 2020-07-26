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

		// Short by lowest-highest last_review - Prioritize those items that you are not already reviewed
		cardItemsObject = cardItemsObject.sort(function(a, b) {
			// Fallback
			a.last_review = a.last_review || 0;
			b.last_review = b.last_review || 0;
			
			return a.last_review - b.last_review;
		});

		//Short by lowest-highest mempoints - Prioritize those items that you are likely already forget
		cardItemsObject = cardItemsObject.sort(function(a, b) {
			// Fallback
			a.mp = a.mp || 0;
			b.mp = b.mp || 0;
			
			return a.mp - b.mp;
		});

		// Limit the maximum number of items
		let slicedObject = [];
		slicedObject.length = this.max_card; // Predefine the length of the array

		for (let i=0; i< this.max_card; i++){
			slicedObject[i] = cardItemsObject[i];
		}

		this.cards = shuffleArray(slicedObject);
		return this.cards;
	}

}


export default PlayProcessor;