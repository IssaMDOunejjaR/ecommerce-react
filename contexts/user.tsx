import { api } from "@/hooks/useFetchLocal";
import { Cart, Order, User } from "@/types";
import Head from "next/head";
import {
	createContext,
	useContext,
	ReactNode,
	useReducer,
	useEffect,
} from "react";

const SET_USER = "SET_USER";
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const CLEAR_CART = "CLEAR_CART";
const CHANGE_QUANTITY = "CHANGE_QUANTITY";
const ADD_ORDER = "ADD_ORDER";
const SET_IS_LOADING_DATA = "SET_IS_LOADING_DATA";

type State = {
	state: { user: User | null; isLoadingData: boolean };
	handleSetUser: (user: User | null) => void;
	handleAddToCart: (cart: Cart) => void;
	handleRemoveFromCart: (id: number) => void;
	handleClearCart: () => void;
	handleQuantity: (id: number, quantity: number) => void;
	handleAddOrder: (order: Order) => void;
};

type Action =
	| { type: "SET_USER"; payload: User | null }
	| {
			type: "ADD_TO_CART";
			payload: Cart;
	  }
	| { type: "REMOVE_FROM_CART"; payload: number }
	| { type: "CLEAR_CART" }
	| {
			type: "CHANGE_QUANTITY";
			payload: { id: number; quantity: number };
	  }
	| { type: "ADD_ORDER"; payload: Order }
	| { type: "SET_IS_LOADING_DATA"; payload: boolean };

const initialState: State = {
	state: { user: null, isLoadingData: true },
	handleSetUser: () => {},
	handleAddToCart: () => {},
	handleRemoveFromCart: () => {},
	handleClearCart: () => {},
	handleQuantity: () => {},
	handleAddOrder: () => {},
};

const reducer = (
	state: { user: User | null; isLoadingData: boolean },
	action: Action
) => {
	switch (action.type) {
		case SET_USER:
			if (!action.payload) {
				return {
					...state,
					user: null,
				};
			}

			return {
				...state,
				user: {
					...state.user,
					...action.payload,
				},
			};
		case ADD_TO_CART:
			return {
				...state,
				user: {
					...state.user!,
					cart: [
						...state.user?.cart.filter(
							(item) =>
								item.product.id !==
								action.payload.product.id
						)!,
						action.payload,
					],
				},
			};
		case REMOVE_FROM_CART:
			return {
				...state,
				user: {
					...state.user!,
					cart:
						state.user?.cart?.filter(
							(item) =>
								item.product.id !==
								action.payload
						) || [],
				},
			};
		case CLEAR_CART:
			return {
				...state,
				user: {
					...state.user!,
					cart: [],
				},
			};
		case CHANGE_QUANTITY:
			return {
				...state,
				user: {
					...state.user!,
					cart:
						state.user?.cart?.map((item) =>
							item.product.id ===
							action.payload.id
								? {
										...item,
										quantity:
											action.payload
												.quantity,
								  }
								: item
						) || state?.user?.cart!,
				},
			};
		case ADD_ORDER:
			return {
				...state,
				user: {
					...state.user!,
					orders: [
						...state.user?.orders!,
						action.payload,
					],
				},
			};
		case SET_IS_LOADING_DATA:
			return {
				...state,
				isLoadingData: action.payload,
			};
		default:
			return state;
	}
};

const UserContext = createContext<State>(initialState);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [state, dispatch] = useReducer(reducer, {
		user: null,
		isLoadingData: true,
	});

	const handleSetUser = (user: User | null) => {
		dispatch({ type: SET_USER, payload: user });
	};

	const handleAddToCart = (cart: Cart) => {
		api.put(`/users/${state.user?.id}`, {
			...state.user,
			cart: [
				...state.user?.cart.filter(
					(item) =>
						item.product.id !== cart.product.id
				)!,
				cart,
			],
		}).then((response) => {
			localStorage.setItem(
				"user",
				JSON.stringify(response.data)
			);

			dispatch({ type: ADD_TO_CART, payload: cart });
		});
	};

	const handleRemoveFromCart = (id: number) => {
		api.put(`/users/${state.user?.id}`, {
			...state.user,
			cart: state.user?.cart.filter(
				(item) => item.product.id !== id
			),
		}).then((response) => {
			localStorage.setItem(
				"user",
				JSON.stringify(response.data)
			);

			dispatch({
				type: REMOVE_FROM_CART,
				payload: id,
			});
		});
	};

	const handleClearCart = () => {
		dispatch({ type: CLEAR_CART });
	};

	const handleQuantity = (
		id: number,
		quantity: number
	) => {
		if (state.user) {
			api.put(`/users/${state.user.id}`, {
				...state.user,
				cart: state.user.cart.map((item) =>
					item.product.id === id
						? {
								...item,
								quantity,
						  }
						: item
				),
			}).then((response) => {
				localStorage.setItem(
					"user",
					JSON.stringify(response.data)
				);

				dispatch({
					type: CHANGE_QUANTITY,
					payload: {
						id,
						quantity,
					},
				});
			});
		}
	};

	const handleAddOrder = (order: Order) => {
		if (state.user) {
			api.put(`/users/${state.user.id}`, {
				...state.user,
				cart: [],
				orders: [...state.user.orders, order],
			}).then((response) => {
				localStorage.setItem(
					"user",
					JSON.stringify(response.data)
				);

				dispatch({
					type: "ADD_ORDER",
					payload: order,
				});

				handleClearCart();
			});
		}
	};

	const value: State = {
		state,
		handleSetUser,
		handleAddToCart,
		handleRemoveFromCart,
		handleClearCart,
		handleQuantity,
		handleAddOrder,
	};

	useEffect(() => {
		dispatch({
			type: "SET_IS_LOADING_DATA",
			payload: true,
		});
		const user = localStorage.getItem("user");

		if (user) {
			handleSetUser(JSON.parse(user));
		}

		dispatch({
			type: "SET_IS_LOADING_DATA",
			payload: false,
		});
	}, []);

	return (
		<>
			<Head>
				<title>Loading ...</title>
			</Head>
			<UserContext.Provider value={value}>
				{children}
			</UserContext.Provider>
		</>
	);
};
