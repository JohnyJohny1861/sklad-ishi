import React, {useEffect, useState} from 'react';
import numeral from 'numeral';
import { SimpleForm, SimpleFormIterator, Edit, 
   ArrayInput, NumberInput, DateInput, AutocompleteInput,
   required
} from 'react-admin';
import './style.css';
import Loader from '../../Component/UI/Loader/Index';
import { HTTP } from '../../axios';

const validArray = [required(() => "Ma'lumotni toliq kiriting")];
const validProductId = [required(() => "Ma'lumotni toliq kiriting")];
const validAmount = [required(() => "Ma'lumotni toliq kiriting")];

export default (props) => {
   const [product, setProduct] = useState([]);
   const [loader, setLoader] = useState(false);

   useEffect(() => {
      setLoader(true);
      HTTP('product')
      .then(res => { 
         setLoader(false);
         setProduct(res);
         setStyle();
         const addBtn = document.querySelector('ul li:last-child');
         addBtn.addEventListener('click', setStyle);
         }) 
         .catch (err => console.log(err));
   }, []);

   const setStyle = () => {
      if(window.location.href.includes('input')) {
         setTimeout(() => {
            const inputsDOM = document.querySelectorAll('[name^="products"]');
            inputsDOM.forEach(inp => {
               const btn = inp.closest('section').parentNode.querySelector('button');
               const grandPa = inp.parentNode.parentNode;
               const p = inp.parentNode.parentNode.lastElementChild;
      
               btn.classList.add('mb-20', 'mt-minus-5');
               p.classList.add('hide');
               grandPa.classList.add('mb-5', 'mt-0');
            })
         }, 100)
      }
   }

   const optionText = r => {
      if(r) {
         return `${r.name ? r.name : ''} ${r.type ?'-- ' + r.type : ''} ${r.price ? '-- ' + numeral(r.price).format() : ''}`
      }
      return ''
   }

   return (
      <Edit title="Taxrirlash"
         {...props} >
         <SimpleForm redirect="list">
               { loader ? <Loader /> :
               (<>
                  <DateInput 
                     source="date" 
                     label="Sana" 
                     style={{marginBottom: '0px'}}/>
                  <ArrayInput source="products" label="Tovarlar" validate={validArray}>
                     <SimpleFormIterator>
                        <AutocompleteInput
                           source="productId" 
                           choices={product}
                           validate={validProductId}
                           label="Tovar" 
                           fullWidth 
                           optionText={r => optionText(r)}
                           shouldRenderSuggestions={v => v.trim().length > 2}/>
                        <NumberInput 
                           source="amount" 
                           fullWidth
                           validate={validAmount}
                           label="Miqdor" 
                           parse={v => v.trim()}/>
                     </SimpleFormIterator>
                  </ArrayInput>
               </>)
               }
         </SimpleForm>
      </Edit>
   )
};
