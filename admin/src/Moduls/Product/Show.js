import React from 'react';
import {
    Show, SimpleShowLayout,
    TextField, NumberField, ReferenceField,
    DeleteButton
} from 'react-admin';

export default (props) => {
    return (
        <Show {...props} title="To'liq ma'lumot">
            <SimpleShowLayout>
                <ReferenceField source="categoryId" reference="category" label="Kategoriyasi">
                    <TextField source="name" />
                </ReferenceField>
                <TextField source="name" label="Nomi"/>
                <TextField source="type" label="Turi"/>
                <NumberField source="price" label="Narxi"/>
                <NumberField source="amount" label="Miqdori"/>
                <DeleteButton />
            </SimpleShowLayout>    
        </Show>
    )
};