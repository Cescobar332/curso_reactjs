import React from "react";

const SECURITY_CODE = "paradigma";

function UseReducer({ name }) {
	const [state, dispatch] = React.UseReducer(reducer, initialState);

	const onConfirm = () => dispatch({ type: actionTypes.confirmed });
	const onError = () => dispatch({ type: actionTypes.error });
	const onCheck = () => dispatch({ type: actionTypes.check });
	const onDelete = () => dispatch({ type: actionTypes.delete });
	const onReset = () => dispatch({ type: actionTypes.reset });
    
	const onWrite = ({ target: { value } }) => {
		dispatch({ type: actionTypes.write, payload: value });
	};
    
	React.useEffect(() => {
		console.log("Empezando el efecto");

		if (!!state.loading) {
			setTimeout(() => {
				console.log("Haciendo la validación");

				if (state.value === SECURITY_CODE) {
					onConfirm();
				} else {
					onError();
				}

				console.log("Terminando la validación");
			}, 3000);
		}

		console.log("Terminando el efecto");
	}, [state.loading]);

	if (!state.deleted && !state.confirmed) {
		return (
			<div>
				<h2>Eliminar {name}</h2>

				<p>Por favor, escribe el código de seguridad.</p>

				{state.error && !state.loading && <p>Error: el código es incorrecto</p>}

				{state.loading && <p>Cargando...</p>}

				<input
					placeholder="Código de seguridad"
					value={state.value}
					onChange={onWrite}
				/>
				<button onClick={onCheck}>Comprobar</button>
			</div>
		);
	} else if (!!state.confirmed && !state.deleted) {
		return (
			<React.Fragment>
				<p>Pedimos confirmación. ¿Tas segur@?</p>
				<button onClick={onDelete}>Sí, eliminar</button>
				<button onClick={onReset}>Nop, me arrepentí</button>
			</React.Fragment>
		);
	} else {
		return (
			<React.Fragment>
				<p>Eliminado con éxito</p>

				<button onClick={onReset}>Volver atrás</button>
			</React.Fragment>
		);
	}
}

const initialState = {
	value: "",
	error: false,
	loading: false,
	deleted: false,
	confirmed: false,
};

const actionTypes = {
	confirmed: "CONFIRMED",
	error: "ERROR",
	check: "CHECK",
	delete: "DELETE",
	reset: "RESET",
	write: "WRITE",
};

/* const reducerIf = (state, action) => {
	if (action.type === "ERROR") {
		return {
			...state,
			error: true,
			loading: false,
		};
	} else if (action.type === "CHECK") {
		return {
			...state,
			loading: true,
		};
	} else {
		return {
			...state,
		};
	}
};

const reducerSwitch = (state, action) => {
	switch (action.type) {
		case "ERROR":
			return {
				...state,
				error: true,
				loading: false,
			};
		case "CHECK":
			return {
				...state,
				loading: true,
			};

		default:
			return {
				...state,
			};
	}
}; */

const reducerObject = (state, payload) => ({
	[actionTypes.confirmed]: {
		...state,
		error: false,
		loading: false,
		confirmed: true,
	},
	[actionTypes.error]: {
		...state,
		error: true,
		loading: false,
	},
	[actionTypes.check]: {
		...state,
		loading: true,
	},
	[actionTypes.delete]: {
		...state,
		deleted: true,
	},
	[actionTypes.reset]: {
		...state,
		confirmed: false,
		deleted: false,
		value: "",
	},
	[actionTypes.write]: {
		...state,
		value: payload,
	},
});

const reducer = (state, action) => {
	if (reducerObject(state)[action.type]) {
		return reducerObject(state, action.payload)[action.type];
	} else {
		return state;
	}
};

export { UseReducer };
