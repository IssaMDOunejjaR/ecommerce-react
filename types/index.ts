export interface Category {
	id: number;
	name: string;
	image: string;
}

export interface Product {
	id: number;
	title: string;
	price: number;
	description: string;
	images: string[];
	category: Category;
}

export interface Cart {
	product: Product;
	quantity: number;
}

export interface Order {
	orderId: number;
	firstName: string;
	lastName: string;
	email: string;
	country: string;
	codePostal: string;
	address: string;
	cardNumber: string;
	cardSecurityCode: string;
	cardExpirationDate: string;
	items: Cart[];
	totalPaid: number;
}

export interface User {
	id: number;
	username: string;
	email: string;
	password: string;
	cart: Cart[];
	orders: Order[];
}
