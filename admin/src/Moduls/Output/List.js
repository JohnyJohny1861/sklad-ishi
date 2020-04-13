import React from 'react';
import { List, Datagrid, 
    Filter, ArrayField,
    TextField, NumberField, ReferenceField, DateField,
    TextInput, DateInput,
    DeleteButton, EditButton
} from 'react-admin';
import { useMediaQuery } from '@material-ui/core';

const Filt = (props) => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <Filter {...props}>
            <DateInput label="Sana" source="date" alwaysOn/>
            <TextInput label="Klient nomi" source="debtor" alwaysOn={!isSmall}/>
        </Filter>
    )
};

export default props => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        isSmall ? (
            <List title="Chiqimlar"
                {...props} 
                bulkActionButtons={false}
                filters={<Filt />}
                exporter={false}
                perPage={25}>
                    <Datagrid rowClick="show">
                        <TextField source="debtor" label="Klient"/>
                        <NumberField source="paidPrice" label="To'lagan summasi"/>
                        <NumberField source="debtPrice" label="Qarz summasi"/>
                        <DateField 
                            source="paidDate" 
                            label="Olgan vaqti" 
                            options={{year: 'numeric', month: 'short', day: 'numeric' }}/>
                        <EditButton />
                        <DeleteButton />
                    </Datagrid>
            </List>
        ): (
            <List title="Kirimlar"
                {...props} 
                filters={<Filt />}
                exporter={false}
                perPage={25}>
                    <Datagrid rowClick="show">
                    <TextField source="debtor" label="Klient"/>
                        <NumberField source="debtPrice" label="Qarz summasi"/>
                        <DateField 
                            source="deadlineDate" 
                            label="Qarz to'lash vaqti" 
                            options={{year: 'numeric', month: 'short', day: 'numeric' }}/>

                        <ArrayField source="products" label="Olgan tovarlari">
                            <Datagrid>
                                <ReferenceField 
                                    source="productId" 
                                    reference="product" 
                                    label="Nomi">
                                    <TextField source="name" />
                                </ReferenceField>
                                <ReferenceField 
                                    source="productId" 
                                    reference="product" 
                                    label="Turi">
                                    <TextField source="type" />
                                </ReferenceField>
                                <ReferenceField 
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
        )
    );
}