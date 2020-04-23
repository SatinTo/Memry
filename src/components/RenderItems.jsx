import React, {useContext, useState} from "react";
import { Plugins } from '@capacitor/core';
import { ItemsContext } from "../ItemsStore";
import {useIonViewWillEnter, IonPopover, IonList, IonItem, IonLabel} from '@ionic/react';
import Item from '../components/Item';
const { Storage } = Plugins;

const RenderItems = () => {
	const context = useContext(ItemsContext);
	const [showPopover, setShowPopover] = useState({event: null, status: false, id: null});
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
			return <Item key={index} data={data} id={index} callBack={setShowPopover}/>
		})}

		<IonPopover
			isOpen={showPopover.status}
			onDidDismiss={e => setShowPopover({event: null, status: false})}
			event={showPopover.event || undefined}
			showBackdrop="true"
			mode="ios"
			translucent={true}
		>
			<IonList>
				<IonItem detail={false} button style={{"--background-activated": "#007EFF", "--color-activated": "#007EFF"}}>
					<IonLabel style={{fontSize: "14px"}}>Delete Card</IonLabel>
				</IonItem>
				<IonItem>
					<IonLabel style={{fontSize: "14px"}}>Coming soon...</IonLabel>
				</IonItem>
			</IonList>
		</IonPopover>
	</>
}


export default RenderItems;