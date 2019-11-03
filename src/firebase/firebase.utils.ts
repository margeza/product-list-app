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
        "description": productData.description
    };
    
}

export const getListOfProducts = () => 
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

export const getProductById = async (productId: string) => 
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

export const getImagesById = async (productId: string) => 
    productCollection.doc(productId)
                    .collection('images')
                    .get()
                    .then(images => {
                        if (images) {
                            let imagesArray: {id: string, url: string, name: string}[] = [];
                            images.docs.forEach(image => imagesArray.push(
                                {
                                    "id": image.id,
                                    "url": image.data().url, 
                                    "name": image.data().name
                                }
                            ));
                            return imagesArray;
                        }
                        return null;
                    });

export default firebase;