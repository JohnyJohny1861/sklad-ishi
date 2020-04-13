import React, {useEffect, useState} from 'react';
import {
    List,
    Datagrid, Filter,
    TextField, NumberField,
    TextInput, SelectInput,
    EditButton, 
} from 'react-admin';
import { useMediaQuery } from '@material-ui/core';
import { HTTP } from '../../axios';

const Filt = (props) => {
    const [category, setCategory] = useState([]);
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    useEffect(() => {
        try{HTTP('category').then(res => { setCategory(res) }) } 
        catch (err) { console.log(err) }
    }, []);

    return (
        <Filter {...props}>
            <SelectInput 
                source="categoryId" choices={category} 
                label="Kategoriyasi" alwaysOn resettable />
            <TextInput label="Nomi" source="name" alwaysOn={!isSmall}/>
            <TextInput label="Turi" source="type" alwaysOn={!isSmall}/>
        </Filter>
    )
};

export default props => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        !isSmall ? (
            <List 
                {...props} 
                exporter={false}
                filters={<Filt />}
                title="Tovarlar"
                perPage={25}>
                    <Datagrid rowClick="show">
                        <NumberField source="order" label="No"/>
                        <TextField source="name" label="Nomi"/>
                        <TextField source="type" label="Turi"/>
                        <NumberField source="price" label="Narxi"/>
                        <NumberField source="amount" label="Miqdori"/>
                        <EditButton />
                    </Datagrid>    
            </List>
        ) : (
            <List 
                {...props} 
                exporter={false}
                bulkActionButtons={false}
                filters={<Filt />}
                title="Tovarlar"
                perPage={25}>
                    <Datagrid rowClick="show">
                        <NumberField source="order" label="No"/>
                        <TextField source="name" label="Nomi"/>
                        <TextField source="type" label="Turi"/>
                        <NumberField source="price" label="Narxi"/>
                        <NumberField source="amount" label="Miqdori"/>
                    </Datagrid>   
            </List>
        )
    );
}