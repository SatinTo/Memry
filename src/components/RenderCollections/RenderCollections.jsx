import React, {useContext, useState} from 'react'
import { Plugins } from '@capacitor/core';
import CollectionItems from '../CollectionItems';
import { GlobalContext } from '../../context/GlobalStore';
import { useIonViewWillEnter, IonActionSheet } from '@ionic/react';
import useRemoveCollectionPrompt from './useRemoveCollectionPrompt';
import useUpdateCollectionPrompt from './useUpdateCollectionPrompt';

const { Storage } = Plugins;

const RenderCollections = () => {
	const context = useContext(GlobalContext);
	const [showActionSheet, setShowActionSheet] = useState({status: false, id: null});
	const {state: {collection}, dispatch} = context;

	useIonViewWillEnter(() => {
		Storage.get({key: "collections"}).then((collections) => {
			const collectionsJSON = (!collections.value || collections.value === "undefined" || !collections.hasOwnProperty) ? [] : JSON.parse(collections.value);


			if (collection.length < 1 || JSON.stringify(collectionsJSON) !== JSON.stringify(collection)) {
				dispatch({ type: "SET_COLLECTION", value: collectionsJSON });
			}

		})
	});

	const removeCollection = useRemoveCollectionPrompt(showActionSheet.id);
	const updateCollection = useUpdateCollectionPrompt(showActionSheet.id);

	if (collection.length < 1) {
		return <></>
	}

	return <>
		{collection.map((data, index) => {
			return <CollectionItems key={index} data={data} id={index} callBack={setShowActionSheet}/>
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
