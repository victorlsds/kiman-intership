import React from 'react';

import DetailsContainer from 'components/common/details/details-container';
import DetailsRow from 'components/common/details/details-row';
import { Table } from 'components/common/table';
import { Grid } from 'react-flexbox-grid';
import DetailsItem from 'components/common/details/details-item';


const TableOfContents = (props) => {
    const {columns, data, notFoundContent, tableName, ...rest} = {...props}
    return(
        <DetailsContainer>
            <DetailsRow>
            {
                tableName &&  
                <Grid fluid style={{width: '100%'}}>
                    <DetailsItem label={tableName}/>
                </Grid> 
            }
            <Table {...rest} columns={columns} dataSource={data} pagination={{ hideOnSinglePage: true }} />
            </DetailsRow>
        </DetailsContainer>
    )
}

export default TableOfContents;