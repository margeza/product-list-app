import React from 'react';
import ProductList from '../../components/product-list/product-list.component'
import Product from '../../interfaces/Product.interface';

import { getListOfProducts } from '../../firebase/firebase.utils'

export default class HomePage extends React.Component<IHomePageProps, IHomePageState> {
    
    constructor(props: IHomePageProps) {
        super(props);

        this.state = {
            products: []
          }
    }

    async componentWillMount() {
        let products = await getListOfProducts();
        this.setState({ products })
    }

  render() {
    return (
      <div>
        <ProductList products={this.state.products} />
      </div>
    );
  }
}

interface IHomePageProps {

}

interface IHomePageState {
    products: Product[];
}
