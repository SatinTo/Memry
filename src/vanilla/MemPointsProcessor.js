import { Plugins } from "@capacitor/core";

const { Storage } = Plugins;

class MemPointsProcessor {

	/**
	 * Refresh mempoints of all collectiosn or by a specific collectionID
	 * @param {Number} collectionID 
	 */
	static refreshMempoints(collectionID = null, callback = function(){}) {

		Storage.get({ key: collectionID }).then((cardItems) => {
			let cardItemsJSON = (!cardItems.value || cardItems.value === "undefined" || !cardItems.hasOwnProperty) ? [] : JSON.parse(cardItems.value);

			let totalMempoints = 0;
			
			if (cardItemsJSON.length > 0){

				// Update the mempoints
				const today = new Date();

				for(let i in cardItemsJSON){
					let mempoints_left = cardItemsJSON[i]["mp"];
					let updateMempointFlag = false; // Change to true to update mp on this item

					if (cardItemsJSON[i].hasOwnProperty("last_review")){
						// Recalculate the mempoints
						const endDate = new Date(cardItemsJSON[i]["last_review"]); // 2017-05-29T00:00:00Z
						const diff =  today - endDate; 

						const hours_past   = Math.floor(diff / 3.6e6);
						let remaining_mp = 100 - (3.125 * hours_past);

						// Constraint to minimum 0
						if (remaining_mp < 1){ remaining_mp = 0; }

						if (mempoints_left !== remaining_mp){
							// Trigger the flag
							updateMempointFlag = mempoints_left !== remaining_mp;
							
							// Replace
							mempoints_left = remaining_mp;
						}
					} else{
						if (mempoints_left !== 0){
							mempoints_left = 0;
							updateMempointFlag = true;
						}
					}

					// Update the mp on this card item
					if (updateMempointFlag){
						cardItemsJSON[i]["mp"] = mempoints_left;
						
						Storage.set({
							key: collectionID,
							value: JSON.stringify(cardItemsJSON)
						});
					}

					totalMempoints += mempoints_left;
				}

				totalMempoints = totalMempoints/cardItemsJSON.length;

				// Update the Storage Data
				Storage.get({ key: 'collections' }).then(async (collections) => {
					let collectionsJson = (!collections.value || collections.value === "undefined" || !collections.hasOwnProperty) ? [] : JSON.parse(collections.value);
				
					collectionsJson[collectionID]["mp"] = totalMempoints;
		
					Storage.set({
						key: 'collections',
						value: JSON.stringify(collectionsJson)
					});
				});

			}

			callback(cardItemsJSON, totalMempoints);

		});
		

	}
}

export default MemPointsProcessor;