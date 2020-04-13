import React from 'react';
import {
   SimpleForm,
   Create,
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
   <Create title="Yaratish"
      {...props} >
      <SimpleForm redirect="list" validate={validation}>
         <TextInput source="name" label="Nomi"/>
      </SimpleForm>
   </Create>
);
