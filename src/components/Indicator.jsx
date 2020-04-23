import { IonIcon} from "@ionic/react";
import React from "react";

const Indicator = ({style, icon, label}) => {
	const customCSS = {
		...{width: "80px",  borderRadius: "5px 10px 10px 5px", marginLeft: "10px", padding: "1px 0", float: "left"}, // Default CSS
		...style // Custom CSS
	};

	return (
		<div style={customCSS} className="clearfix">
			<IonIcon icon={icon} style={{width: "2rem", height: "21px", float:"left"}}/>
			<span style={{float:"left", fontSize: "10px", marginLeft: "4px", fontWeight: "bold", lineHeight: "21px"}}>{label}</span>
		</div>
	)
}

export default Indicator;