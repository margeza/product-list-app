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

export const getListOfProducts = () => 
    firestore.collection('products')
                    .get()
                    .then(
                        products => {
                            let productList: Product[] = []
                            products.docs.forEach(product => {
                                const productId = product.id;
                                const productData = product.data();
                                productList.push(
                                    {
                                        "id": productId,
                                        "name": productData.name,
                                        "number": productData.number,
                                        "description": productData.description
                                    }
                                );
                            });
                            return productList;
                        });

export const getProductById = async (productId: string) => {
    const productDoc = firestore.collection('products').doc(productId);

    // productDoc.get().then(product => {
    //     if(product) {
    //         const productId = product.id;
    //         const productData = product.data();
    //         if(productData) { 
    //             return {
    //                 "id": productId,
    //                 "name": productData.name,
    //                 "number": productData.number,
    //                 "description": productData.description,
    //                 "images": imagesArray
    //             };
    //         } else {
    //             return null;
    //         }
    //     } else {
    //         return null;
    //     }
    // });
    


    return productDoc.get()
        .then(product => { if (product) {
                                const productId = product.id;
                                const productData = product.data();
                                if(productData) {
                                    return {
                                        "id": productId,
                                        "name": productData.name,
                                        "number": productData.number,
                                        "description": productData.description
                                    }
                                }
                            }
                            return null;
                        });
};

export const getImagesById = async (productId: string) => {
    const productDoc = firestore.collection('products').doc(productId);
    return productDoc.collection('images')
        .get()
        .then(images => {
            if (images) {
                let imagesArray: {url: string, name: string}[] = [];
                images.docs.forEach(image => imagesArray.push(
                    {
                        "url": image.data().url, 
                        "name": image.data().name
                    }
                ));
                return imagesArray;
            }
            return null;
        });
};

export default firebase;