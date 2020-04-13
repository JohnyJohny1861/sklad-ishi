import React from 'react';
import { List, Datagrid, 
    Filter, DateInput, ArrayField,
    TextField, NumberField, ReferenceField, DateField,
    DeleteButton
} from 'react-admin';
import { useMediaQuery } from '@material-ui/core';

const Filt = (props) => {
    return (
        <Filter {...props}>
            <DateInput label="Sana" source="date" alwaysOn/>
        </Filter>
    )
};

export default props => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        isSmall ? (
            <List title="Kirimlar"
                {...props} 
                bulkActionButtons={false}
                filters={<Filt />}
                exporter={false}
                perPage={25}>
                <Datagrid rowClick="edit">
                    <DateField source="date" label="Sanasi" 
                        options={{year: 'numeric', month: 'short', day: 'numeric' }}/>
                    <ArrayField source="products" label="Tovarlar">
                        <Datagrid>
                            <ReferenceField link="show"
                                source="productId" 
                                reference="product" 
                                label="Nomi">
                                <TextField source="name" />
                            </ReferenceField>
                            <ReferenceField link={false}
                                source="productId" 
                                reference="product" 
                                label="Turi">
                                <TextField source="type" />
                            </ReferenceField>
                            <ReferenceField link={false}
                                source="productId" 
                                reference="product" 
                                label="Narxi">
                                <NumberField source="price" />
                            </ReferenceField>
                            <NumberField source="amount" label="Miqdor"/>
                        </Datagrid>
                    </ArrayField>
                    <DeleteButton />
                </Datagrid>
            </List>
        ): (
            <List title="Kirimlar"
                {...props} 
                filters={<Filt />}
                exporter={false}
                perPage={25}>
                    <Datagrid rowClick="edit">
                        <DateField source="date" label="Sanasi" 
                            options={{year: 'numeric', month: 'short', day: 'numeric' }}/>
                        <ArrayField source="products">
                            <Datagrid>
                                <ReferenceField source="productId" reference="product" label="Nomi">
                                    <TextField source="name" />
                                </ReferenceField>
                                <ReferenceField source="productId" reference="product" label="Turi">
                                    <TextField source="type" />
                                </ReferenceField>
                                <ReferenceField source="productId" reference="product" label="Narxi">
                                    <NumberField source="price" />
                                </ReferenceField>
                                <NumberField source="amount" label="Miqdor"/>
                            </Datagrid>
                        </ArrayField>
                        <DeleteButton />
                    </Datagrid>
            </List>
        )
    );
}