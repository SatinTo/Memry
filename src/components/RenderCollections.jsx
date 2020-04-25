import React, {useContext, useState} from 'react'
import { Plugins } from '@capacitor/core';
import CollectionItems from './CollectionItems';
import { ItemsContext } from '../ItemsStore';
import { useIonViewWillEnter, IonActionSheet } from '@ionic/react';

const { Storage } = Plugins;

const RenderCollections = () => {
	const context = useContext(ItemsContext);
	const [showActionSheet, setShowActionSheet] = useState(false);
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

	return <>
		{collection.map((data, index) => {
			return <CollectionItems key={index} data={data} id={index} callBack={setShowActionSheet}/>
		})}

		<IonActionSheet
			isOpen={showActionSheet}
			onDidDismiss={() => setShowActionSheet(false)}
			buttons={[
				{
					text: 'Delete',
					role: 'destructive',
					handler: () => {console.log('Delete clicked');}
				}, 
				{
					text: 'Edit Collection',
					handler: () => {console.log('Share clicked');} 
				}, 
				{
					text: 'Cancel',
					role: 'cancel',
					handler: () => {setShowActionSheet(false)}
				}
			]}
		>
		</IonActionSheet>
	</>;
}

export default RenderCollections;
