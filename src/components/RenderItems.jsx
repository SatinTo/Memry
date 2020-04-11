import React, {useContext} from "react";
import { Plugins } from '@capacitor/core';
import { ItemsContext } from "../ItemsStore";
import {useIonViewWillEnter} from '@ionic/react';
import Item from '../components/Item';
const { Storage } = Plugins;

const RenderItems = () => {
	const context = useContext(ItemsContext);
	const {state: {items}, dispatch} = context;

	useIonViewWillEnter(() => {
		Storage.get({ key: 'items' }).then((oldItems) => {
			const oldItemsJSON = (!oldItems.value || oldItems.value === "undefined" || !oldItems.hasOwnProperty) ? [] : JSON.parse(oldItems.value);
			
			if (items.length < 1 || JSON.stringify(oldItemsJSON) !== JSON.stringify(items)) {
				dispatch({type: "SET_ITEMS", value: oldItemsJSON});
			}
		});
	})

	if (items.length < 1) {
		return <></>;
	}
	return <>
		{items.map((data, index) => {
			return <Item key={index} data={data} id={index}/>
		})}
	</>
}


export default RenderItems;