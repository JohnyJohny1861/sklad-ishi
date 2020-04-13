import React from 'react';
import { Admin, Resource } from 'react-admin';
import dataProvider from './utils/dataProvider';
import authProvider from './utils/authProvider';
import russianMessages from 'ra-language-russian';
import polyglotI18nProvider from 'ra-i18n-polyglot';

// MODULS 
import ProductList from './Moduls/Product/List';
import ProductCreate from './Moduls/Product/Create';
import ProductEdit from './Moduls/Product/Edit';
import ProductShow from './Moduls/Product/Show';

import CategoryList from './Moduls/Category/List';
import CategoryCreate from './Moduls/Category/Create';
import CategoryEdit from './Moduls/Category/Edit';

import InputList from './Moduls/Input/List';
import InputCreate from './Moduls/Input/Create';
import InputEdit from './Moduls/Input/Edit';

import OutputList from './Moduls/Output/List';
import OutputCreate from './Moduls/Output/Create';
import OutputEdit from './Moduls/Output/Edit';
import OutputShow from './Moduls/Output/Show';

const i18nProvider = polyglotI18nProvider(() => russianMessages, 'ru', { allowMissing: true });

const App = () => (
  <Admin 
    i18nProvider={i18nProvider}
    authProvider={authProvider} 
    dataProvider={dataProvider} >
      
      <Resource name="input" options={{label: "Kirim"}}
        list={ InputList } 
        create={ InputCreate }
        edit={ InputEdit }
      />

      <Resource name="output" options={{label: "Chiqim"}}
        list={ OutputList } 
        create={ OutputCreate }
        edit={ OutputEdit }
        show={ OutputShow }
      />

      <Resource name="product" options={{label: "Tovarlar"}}
        list={ ProductList } 
        create={ ProductCreate }
        edit={ ProductEdit }
        show={ ProductShow }
      />

      <Resource name="category" options={{label: "Kategoriyalar"}}
        list={ CategoryList } 
        create={ CategoryCreate }
        edit={ CategoryEdit }
      />

  </Admin>
)

export default App;