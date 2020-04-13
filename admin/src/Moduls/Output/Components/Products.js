import React, {useEffect, useState} from 'react';
import './style.css';
import { Field } from 'react-final-form';
import { Labeled } from 'react-admin';
import numeral from 'numeral';

const calcTotalPrice = () => {
   const productInputs = document.querySelectorAll(`[name*=".product"]`);
   const amountInputs = document.querySelectorAll(`[name*=".amount"]`);
   const total = document.querySelector('.TotalPrice_amount');

   let summ = 0;
   if(productInputs.length > 0) {
      productInputs.forEach((prodInp, i) => {
         let price = getPriceNumber(prodInp);
         summ += price * +amountInputs[i].value;
      });
      if(total) {
         return total.textContent = `${numeral(summ).format()} so'm`;
      }
   }
   if(total) {
      return total.textContent = `0 so'm`;
   }
}
// UTILS 
const getPriceNumber = (prodInp) => {
   // From 'Gaz plita 3 komforka --0100-- [ 6,000,000 so'm ]' => 6000000
   if(prodInp.value) {
      return +prodInp.value.split("[ ")[1].split(" so'm")[0].split(',').join('');
   }
}

export const ProductId = ({record, source, products}) => {
   const [label, setLabel] = useState('');
   const index = source.split('[')[1].split(']')[0];

   useEffect(() => {
      const product = document.querySelector(`[name="${source}"]`);
      const amount = document.querySelector(`[name="products[${index}].amount"]`);
      if(product) {
         product.addEventListener('change', e => {
            products.forEach((prod, i) => {
               if(e.target.value === '') { return setLabel(''); }
               if(e.target.value.includes(prod.name)) {
                  if(amount.value !== '') {
                     const amountLab = amount.parentNode.previousSibling;
                     amountLab.textContent = `${numeral(prod.price).format()} x ${amount.value} = ${numeral(prod.price * +amount.value).format()} so'm`;
                     calcTotalPrice();
                  }
                  return setLabel(`${prod.name} --- jami ${prod.amount}`)
               }
            }) 
         });
      }
      return () => {
         setTimeout(() => {
            calcTotalPrice();
         }, 300);
      }
   }, []);

   return (
      <span className="Product">
         <Labeled label={label || 'Tovar nomi'}>
            <Field
               name={source} 
               list="list"
               component="input"
               type="text" />
         </Labeled>
         <datalist id="list" >
            {products.map(choice => (
               <option 
                  key={choice.id}
                  value={
                     choice.name + 
                     (choice.type ? ` --${choice.type}--` : '') + 
                     (choice.price ? ` [ ${numeral(choice.price).format()} so'm ]` : '')
                  } />
            ))}
         </datalist>
      </span>
   )
}

export const Amount = ({record, source, products}) => {
   const index = source.split('[')[1].split(']')[0];

   useEffect(() => {
      const productInp = document.querySelector(`[name="products[${index}].product"]`);
      const amountInp = document.querySelector(`[name="${source}"]`);

      if(amountInp && productInp) { 
         amountInp.addEventListener('change', e => {
            products.forEach(prod => {
               if(productInp.value.includes(prod.name)) {
                  calcTotalPrice();
                  calcAmountInput(amountInp, getPriceNumber(productInp));
                  return
               }
            })
         })
      }

      return () => {
         setTimeout(() => {
            calcTotalPrice();
         }, 300);
      }
   }, []);

   const calcAmountInput = (amountInp, price) => {
      const amountVal = +amountInp.value;
      const priceFormat = numeral(price).format();
      const totalSum = numeral(price * amountVal).format();
      const amountLab = amountInp.parentNode.previousSibling;
      if(amountLab) {
         amountLab.textContent = `${amountVal} x ${priceFormat} = ${totalSum} so'm`
      }
   }

   return (
      
      <span className="Product">
         <Labeled label='Miqdor'>
            <Field 
               name={source} 
               component="input" 
               type="number" />
         </Labeled>
      </span>
   )
}
