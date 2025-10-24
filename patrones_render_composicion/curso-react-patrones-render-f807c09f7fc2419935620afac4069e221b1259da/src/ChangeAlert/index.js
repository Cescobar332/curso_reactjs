import React from "react";
import { useStorageListener } from "./useStorageListener";

function ChangeAlert({ sincronize }) {
	const { show, toggleShow } = useStorageListener(sincronize);

	if (show) {
		return (
			<div>
				<p>Hubo cambios</p>
				<button onClick={() => toggleShow(false)}>
					Refrescar la información
				</button>
			</div>
		);
	} else {
		return null;
	}
}

export { ChangeAlert };
