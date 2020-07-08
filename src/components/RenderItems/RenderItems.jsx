import React, {useContext, useState} from "react";
import { Plugins } from '@capacitor/core';
import { GlobalContext } from "../../context/GlobalStore";
import {
	IonActionSheet,
	useIonViewDidEnter,
} from '@ionic/react';
import Item from '../Item';
import useRemoveCardPrompt from "../useRemoveCardPrompt";
const { Storage } = Plugins;

const RenderItems = ({collectionID}) => {
	const context = useContext(GlobalContext);
	const [showActionSheet, setShowActionSheet] = useState({status: false, id: null});
	const {state: {items}, dispatch} = context;
	const [flipped, setFlip] = useState({});

	// Get the Items from localStorage
	useIonViewDidEnter(async () => {
		Storage.get({ key: collectionID }).then((oldItems) => {
			const oldItemsJSON = (!oldItems.value || oldItems.value === "undefined" || !oldItems.hasOwnProperty) ? [] : JSON.parse(oldItems.value);
			
			if (items.length < 1 || JSON.stringify(oldItemsJSON) !== JSON.stringify(items)) {
				dispatch({type: "SET_ITEMS", value: oldItemsJSON});
			}
		});
	})

	const deleteCard = useRemoveCardPrompt(showActionSheet.id, collectionID);

	if (items.length < 1) {
		return <></>;
	}

	return <>
		{items.map((data, index) => {
			return <Item key={index} data={data} id={index} callBack={setShowActionSheet} collectionID={collectionID} flipped={flipped[index]}/>
		})}

		<IonActionSheet 
			isOpen={showActionSheet.status}
			onDidDismiss={() => setShowActionSheet({status: false, collectionID: null})}
			buttons={[
				{
					text: 'Delete',
					role: 'destructive',
					handler:  deleteCard
				},
				{
					text: 'Flip',
					handler: () => {
						const newValue = flipped;
						newValue[showActionSheet.id] = !flipped[showActionSheet.id];
						setFlip(newValue);
					}
				}, 
				{
					text: 'Cancel',
					role: 'cancel',
					handler: () => {setShowActionSheet({status: false, collectionID: null})}
				}
			]}
		/>
	</>
}


export default RenderItems;