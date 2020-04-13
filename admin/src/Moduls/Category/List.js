import React from 'react';
import {
    List,
    Datagrid,
    TextField, DeleteButton,
} from 'react-admin';

export default props => {
    return (
        <List title="Kategoriyalar"
            {...props} 
            exporter={false}
            perPage={25}>
                <Datagrid rowClick="edit">
                    <TextField source="name" label="Nomi"/>
                    <DeleteButton />
                </Datagrid>    
        </List>
    );
}