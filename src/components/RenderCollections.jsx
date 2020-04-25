import React, {useContext, useState} from 'react'
import { Plugins } from '@capacitor/core';
import CollectionItems from './CollectionItems';
import { ItemsContext } from '../ItemsStore';
import { useIonViewWillEnter, IonActionSheet, IonAlert } from '@ionic/react';

const { Storage } = Plugins;

const RenderCollections = ({ callBack }) => {
	const context = useContext(ItemsContext);
	const [showActionSheet, setShowActionSheet] = useState({status: false, collectionID: null});
	const [showPrompt, setShowPrompt] = useState(false);
	const {state: {collection}, dispatch} = context;

	useIonViewWillEnter(() => {
		Storage.get({key: "collections"}).then((collections) => {
			const collectionsJSON = (!collections.value || collections.value === "undefined" || !collections.hasOwnProperty) ? [] : JSON.parse(collections.value);

			if (collection.length < 1 || JSON.stringify(collectionsJSON) !== JSON.stringify(collection)) {
				dispatch({ type: "SET_COLLECTION", value: collectionsJSON });
			}

		})
	});

	if (collection.length < 1) {
		return <></>
	}

	const alertProps = {
		isOpen: showPrompt,
		onDidDismiss: () => setShowPrompt(false),
		header: "Delete Collection",
		message: "Are your sure you want remove this Collection? ",
		buttons: [
			{
				text: 'Cancel',
				role: 'cancel',
				cssClass: 'secondary',
				handler: () => setShowPrompt(false)
			},
			{
				text: 'Okay',
				handler: async () => {
					const collections = await Storage.get({key: 'collections'});
					const newCollectionJSON = (collections.value) ? JSON.parse(collections.value) : [];
					const filteredCollections = newCollectionJSON.filter((e, i) => String(i) !== String(showActionSheet.collectionID));
					
					Storage.set({key: 'collections', value: JSON.stringify(filteredCollections)});
					dispatch({type: "SET_COLLECTION", value: filteredCollections});

					callBack({ visible: true, message: "Collection is successfully removed."});
				}
			}
		]
	}

	return <>
		{collection.map((data, index) => {
			return <CollectionItems key={index} data={data} id={index} callBack={setShowActionSheet}/>
		})}

		<IonAlert {...alertProps}/>
		<IonActionSheet
			isOpen={showActionSheet.status}
			onDidDismiss={() => setShowActionSheet({status: false, collectionID: null})}
			buttons={[
				{
					text: 'Delete',
					role: 'destructive',
					handler: () => {setShowPrompt(true)}
				}, 
				{
					text: 'Edit Collection',
					handler: () => {console.log('Edit Collection clicked')}
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
