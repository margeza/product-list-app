import firebase from 'firebase/app';
import 'firebase/firestore';
import Product from '../interfaces/Product.interface';

const config = {
    apiKey: "AIzaSyDactW-x0XSjJw79JkHtYYuAloNqAyLsXI",
    authDomain: "product-list-app.firebaseapp.com",
    databaseURL: "https://product-list-app.firebaseio.com",
    projectId: "product-list-app",
    storageBucket: "product-list-app.appspot.com",
    messagingSenderId: "749553082205",
    appId: "1:749553082205:web:45623ff4223d1a189712b4",
    measurementId: "G-HHF43HZC9C"
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const productCollection = firestore.collection('products');

const mapDataToProductObject = (productId: string, productData: firebase.firestore.DocumentData): Product => {
    return {
        "id": productId,
        "name": productData.name,
        "number": productData.number,
        "description": productData.description,
        "images": productData.images,
    };
}

export const getListOfProducts = () : Promise<Product[]> => 
    productCollection.get()
                    .then(products => {
                        let productList: Product[] = []
                        products.docs.forEach(product => {
                            if (product) {
                                const id = product.id;
                                const data = product.data();
                                if (data) {
                                    productList.push(mapDataToProductObject(id, data));
                                }
                            }
                        });
                        return productList;
                    });

export const getProductById = async (productId: string): Promise<Product | null> => 
    productCollection.doc(productId)
                    .get()
                    .then(product => { 
                        if (product) {
                            const id = product.id;
                            const data = product.data();
                            if (data) {
                                return mapDataToProductObject(id, data);
                            }
                        }
                        return null;
                    });

export const updateProductData = (product: Product): Promise<void> =>
    productCollection.doc(product.id).update({...product});

export default firebase;