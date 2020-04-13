import React from 'react';
import { 
   Show, Datagrid, SimpleShowLayout,
   TextField, NumberField, ReferenceField, ArrayField, DateField,
   DeleteButton
} from 'react-admin';

export default props => {
   return (
      <Show {...props} title="To'liq ma'lumot">
         <SimpleShowLayout>
            <TextField source="debtor" label="Klient"/>
            <TextField source="phone" label="Telefon raqami"/>
            <NumberField source="debtPrice" label="Qarz summasi"/>
            <NumberField source="paidPrice" label="To'lagan summasi"/>
            <DateField 
               source="paidDate" 
               label="Olgan vaqti" 
               options={{year: 'numeric', month: 'short', day: 'numeric' }}/>
            <DateField 
               source="deadlineDate" 
               label="Qarz to'lash vaqti" 
               options={{year: 'numeric', month: 'short', day: 'numeric' }}/>

            <ArrayField source="products" label="Olgan tovarlari">
               <Datagrid>
                  <ReferenceField source="productId" reference="product" label="Tovar nomi">
                     <TextField source="name" />
                  </ReferenceField>
                  <ReferenceField source="productId" reference="product" label="Turi">
                     <TextField source="type" />
                  </ReferenceField>
                  <ReferenceField source="productId" reference="product" label="Narxi">
                     <NumberField source="price" />
                  </ReferenceField>
                  <NumberField source="amount" label="Olgan miqdori"/>
               </Datagrid>
            </ArrayField>
            <DeleteButton />
         </SimpleShowLayout>    
      </Show>
   );
}