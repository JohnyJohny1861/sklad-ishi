import React from 'react';
import numeral from 'numeral';
import { SimpleForm, SimpleFormIterator, Edit, 
    ReferenceInput, ArrayInput, TextInput, NumberInput, DateInput, AutocompleteInput,
    required 
} from 'react-admin';

const validate = [required(() => "Ma'lumotni toliq kiriting")];

export default (props) => {
    return (
        <Edit title="Taxrirlash"
            {...props} >
            <SimpleForm redirect="list">
                <TextInput source="debtor"  label="Klient nomi" validate={validate} fullWidth/>
                <TextInput source="phone"  label="Telefon nomeri" validate={validate} fullWidth/>

                <ArrayInput source="products" label="Olgan tovarlari" validate={validate}>
                    <SimpleFormIterator>
                        <ReferenceInput 
                            label="Tovar" 
                            fullWidth 
                            source="productId" 
                            reference="product">
                            <AutocompleteInput
                                optionText={r => 
                                    `${r.name ? r.name : ''} ${r.type ?'-- ' + r.type : ''} ${r.price ? '-- ' + numeral(r.price).format() : ''}`}
                                shouldRenderSuggestions={(val) => { return val.trim().length > 2 }}/>
                        </ReferenceInput>
                        <NumberInput 
                            source="amount" 
                            fullWidth
                            label="Miqdor" 
                            parse={v => v.trim()}/>
                    </SimpleFormIterator>
                </ArrayInput>

                <NumberInput 
                    source="paidPrice" 
                    fullWidth
                    label="Bergan summasi" 
                    parse={v => v.trim()}/>
                <NumberInput 
                    source="debtPrice" 
                    fullWidth
                    label="Qarz summasi" 
                    parse={v => v.trim()}/>
                <DateInput source="paidDate" label="Tovarni olgan sanasi" fullWidth/>
                <DateInput source="deadlineDate" label="Qarzni qaytarish sanasi" fullWidth/>
            </SimpleForm>
        </Edit>
    )
};
