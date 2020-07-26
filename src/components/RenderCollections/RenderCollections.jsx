import React, {useContext, useState} from 'react'
import { Plugins } from '@capacitor/core';
import CollectionItems from '../CollectionItems';
import { GlobalContext } from '../../context/GlobalStore';
import { useIonViewWillEnter, IonActionSheet } from '@ionic/react';
import useRemoveCollectionPrompt from './useRemoveCollectionPrompt';
import useUpdateCollectionPrompt from './useUpdateCollectionPrompt';

const { Storage } = Plugins;

const RenderCollections = () => {
	const [showActionSheet, setShowActionSheet] = useState({status: false, id: null, value: ""});
	const {state: {collection}, dispatch} = useContext(GlobalContext);

	useIonViewWillEnter(() => {
		Storage.get({key: "collections"}).then((collections) => {
			let collectionsJSON = (!collections.value || collections.value === "undefined" || !collections.hasOwnProperty("value")) ? [] : JSON.parse(collections.value);

			if (collection.length < 1 || JSON.stringify(collectionsJSON) !== JSON.stringify(collection)) {
				dispatch({ type: "SET_COLLECTION", value: collectionsJSON });
			}

		})
	});

	const removeCollection = useRemoveCollectionPrompt(showActionSheet.id);
	const updateCollection = useUpdateCollectionPrompt(showActionSheet.id, showActionSheet.value);

	if (collection.length < 1) {
		return <></>
	}

	return <>
		{collection.map((data, index) => {
			if (typeof data === "object" && data.hasOwnProperty("name"))
				return <CollectionItems key={index} id={index} {...data} callBack={setShowActionSheet}/>
			return "";
		})}

		<IonActionSheet
			isOpen={showActionSheet.status}
			onDidDismiss={() => setShowActionSheet({status: false, id: null})}
			buttons={[
				{
					text: 'Delete',
					role: 'destructive',
					handler: removeCollection
				}, 
				{
					text: 'Update',
					handler: updateCollection
				}, 
				{
					text: 'Cancel',
					role: 'cancel',
					handler: () => {setShowActionSheet({status: false, collectionID: null})}
				}
			]}
		>
		</IonActionSheet>
	</>;
}

export default RenderCollections;
