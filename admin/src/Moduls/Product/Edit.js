import React, {useEffect, useState} from 'react';
import { SimpleForm, Edit, NumberInput, TextInput, SelectInput } from 'react-admin';
import { HTTP } from '../../axios';

export default (props) => {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        try{HTTP('category').then(res => { setCategory(res) }) } 
        catch (err) { console.log(err) }
    }, []);

    return (
        <Edit title="Taxrirlash" 
            {...props} >
            <SimpleForm redirect="list">
                <SelectInput 
                    source="categoryId" 
                    choices={category} resettable label="Kategoriyasi"/>
                <NumberInput source="order" label="Tartib raqami"/>
                <TextInput source="name" label="Nomi" parse={v => v.trim()}/>
                <TextInput source="type" label="Turi" parse={v => v.trim()}/>
                <NumberInput source="price" label="Narxi" parse={v => v.trim()}/>
                <NumberInput source="amount" label="Miqdori" parse={v => v.trim()}/>
            </SimpleForm>
        </Edit>
    )
};
