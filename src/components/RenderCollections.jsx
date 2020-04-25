import React, {useContext} from 'react'
import { Plugins } from '@capacitor/core';
import CollectionItems from './CollectionItems';
import { ItemsContext } from '../ItemsStore';
import { useIonViewWillEnter } from '@ionic/react';

const { Storage } = Plugins;

const RenderCollections = () => {
	const context = useContext(ItemsContext);
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
			return <CollectionItems key={index} data={data} id={index}/>
		})}
	</>;
}

export default RenderCollections;
