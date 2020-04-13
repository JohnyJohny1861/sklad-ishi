import React, {useEffect} from 'react';
import './style.css';
import { Labeled, NumberInput } from 'react-admin';
import { useInput } from 'react-admin';

let DEPT_PRICE = '';
let PAID_PRICE = '';

export const DebtPrice = (props) => {
   const { input: { onChange } } = useInput(props);

   useEffect(() => {
      DEPT_PRICE = '';
      PAID_PRICE = '';
      const debtor = document.querySelector('[name="debtor"]');
      const paidPrice = document.querySelector('[name="paidPrice"]');
      const paidDate = document.querySelector('[name="paidDate"]');
      if(debtor && paidPrice && paidDate) {
         paidPrice.parentNode.nextSibling.remove();
         paidDate.parentNode.nextSibling.remove();
         debtor.parentNode.nextSibling.remove();
      }
   }, [])

   const watchChange = e => {
      const debtPrice = +e.target.value;
      const totalPrice = document.querySelector('.TotalPrice_amount');
      if(totalPrice) {
         let total = totalPrice.textContent.split(' ')[0];
         total = total.length > 4 ? +total.split(',').join(''): +total;
         PAID_PRICE = total - debtPrice;
         DEPT_PRICE = debtPrice;
      }
      return onChange
   }

   return (
      <NumberInput
         name="debtPrice"
         label="Qarz summasi"
         format={() => DEPT_PRICE}
         onChange={watchChange}
      />
   )
}

export const PaidPrice = (props) => {
   const { input: { onChange } } = useInput(props);

   const watchChange = e => {
      const paidPrice = +e.target.value;
      const totalPrice = document.querySelector('.TotalPrice_amount');
      if(totalPrice) {
         let total = totalPrice.textContent.split(' ')[0];
         total = total.length > 4 ? +total.split(',').join(''): +total;
         DEPT_PRICE = total - paidPrice;
         PAID_PRICE = paidPrice;
      }
      return onChange
   }

   return (
      <NumberInput
         name="paidPrice"
         label="Bergan summasi"
         format={() => PAID_PRICE}
         onChange={watchChange}
      />
   )
}

export const TotalPrice = () => {
   return (
      <div className="TotalPrice">
         <Labeled label="Umumiy summa">
            <p className="TotalPrice_amount">0 so'm</p>
         </Labeled>
      </div>
   )
}