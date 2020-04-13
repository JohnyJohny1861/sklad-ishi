import React from 'react';
import {
   SimpleForm,
   Edit,
   TextInput
} from 'react-admin';

const validation = (values) => {
   const errors = {};
   if (!values.name) {
       errors.name = ['Categoriya nomini kiriting!'];
   }
   return errors
};

export default (props) => (
   <Edit title="Taxrirlash"
      {...props} >
      <SimpleForm redirect="list" validate={validation}>
         <TextInput source="name" label="Nomi"/>
      </SimpleForm>
   </Edit>
);
