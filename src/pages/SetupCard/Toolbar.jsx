import React from 'react';
import { IonToolbar, IonFabButton, IonButton, IonIcon } from '@ionic/react';
import { refreshOutline } from 'ionicons/icons';

const ToolBar = ({disabled, showRotate=true, onSubmit, misc: {pageConfig, setPageConfig, updateMode}}) => {
	return (
		<IonToolbar>
			<div style={{width: "fit-content", margin: "0 auto 20px auto"}}>
				
				{
					showRotate && (
						<IonFabButton 
							style={{display: "inline-block", margin: "0 15px", "--background": (pageConfig.cardFlipped) ? "#b7b0ff" : "#97fff3"}} 
							onClick={() => setPageConfig(
								Object.assign({}, pageConfig, {cardFlipped: !pageConfig.cardFlipped})
							)}
						>
							<IonIcon icon={refreshOutline} />
						</IonFabButton>
					)
				}
				<IonButton shape="round" onClick={onSubmit} disabled={disabled} style={{float: "right", marginRight: "7px"}} >
					{updateMode ? "Update card": "Create new card"}
				</IonButton>
			</div>
		</IonToolbar>
	)
};

export default ToolBar;