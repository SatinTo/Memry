import { Plugins } from "@capacitor/core";

const { Storage } = Plugins;

class MemPointsProcessor {

	/**
	 * Refresh mempoints of all collectiosn or by a specific collectionID
	 * @param {Number} collectionID 
	 */
	refreshMempoints(collectionID = null, callback = function(){}) {

		Storage.get({ key: collectionID }).then((oldItems) => {
			const oldItemsJSON = (!oldItems.value) ? [] : JSON.parse(oldItems.value);

			console.log(oldItemsJSON);
		});
		

	}
}

export default MemPointsProcessor;