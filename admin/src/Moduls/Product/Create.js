import React, {useEffect, useState} from 'react';
import { SimpleForm, Create, NumberInput, TextInput, SelectInput } from 'react-admin';
import { HTTP } from '../../axios';

export default (props) => {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        try{HTTP('category').then(res => { setCategory(res) }) } 
        catch (err) { console.log(err) }
    }, []);

    return (
        <Create title="Yaratish" 
            {...props} >
            <SimpleForm redirect="list">
                <SelectInput 
                    source="categoryId" 
                    choices={category} resettable label="Kategoriyasi"/>
                <NumberInput source="order" label="Tartib raqami"/>
                <TextInput source="name" label="Nomi"/>
                <TextInput source="type" label="Turi"/>
                <NumberInput source="price" label="Narxi"/>
                <NumberInput source="amount" label="Miqdori"/>
            </SimpleForm>
        </Create>
    )
};
