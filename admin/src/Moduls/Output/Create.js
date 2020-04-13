import React, {useEffect, useState} from 'react';
import { SimpleForm, SimpleFormIterator, Create, 
   ArrayInput, TextInput, DateInput,
   required
} from 'react-admin';

import { HTTP } from '../../axios';
import Loader from '../../Component/UI/Loader/Index';

import {ProductId, Amount} from './Components/Products';
import {DebtPrice, PaidPrice, TotalPrice} from './Components/Prices';


const validate = [required(() => "Ma'lumotni toliq kiriting")];

export default (props) => {
   const [product, setProduct] = useState([]);
   const [loader, setLoader] = useState(false);

   useEffect(() => {
      let cancel = false;
      if(!cancel) {
         setLoader(true);
         try { HTTP('product').then(res => { setProduct(res) }) } 
         catch (err) { console.log(err) }
         finally { setLoader(false) }
      }
      return () => {
         cancel = true
      }
   }, [])
   return (
      <Create title="Yaratish"
         {...props} >
         <SimpleForm redirect="list">
               <TextInput source="debtor"  label="Klient nomi" validate={validate} fullWidth/>
               <TextInput source="phone"  label="Telefon nomeri" fullWidth/>

               {loader ? (
                  <Loader />
               ) : (
                  <ArrayInput 
                     validate={validate} 
                     source="products" 
                     label="Olgan tovarlari" 
                     fullWidth>
                     <SimpleFormIterator>
                        <ProductId validate={validate} source="product" products={product}/>
                        <Amount validate={validate} source="amount" products={product}/>
                     </SimpleFormIterator>
                  </ArrayInput>
               )}
               <TotalPrice />
               <PaidPrice />
               <DebtPrice />
               <DateInput source="paidDate" label="Tovarni olgan sanasi" fullWidth/>
               <DateInput source="deadlineDate" label="Qarzni qaytarish sanasi" fullWidth/>
         </SimpleForm>
      </Create>
   )
};
