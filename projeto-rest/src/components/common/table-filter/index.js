import React, { Component } from 'react';
import styles from './styles.scss';
import { Button } from 'components/common/button';
import { Icon } from 'components/common/icon';
import { Input } from 'components/common/input';
import { Table } from 'components/common/table';

const initialState = {
    searchTextMap: {},
    search: false
}

class TableFilter extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentWillReceiveProps(nextProps){
        this.state = initialState;
        this.setState({ searchTextMap: {}, search: false });
    }

    handleSearch = (selectedKeys, confirm, columnTitle) => () => {
        let searchTextMap = {};
        searchTextMap[columnTitle] = selectedKeys[0];
        this.setState({ searchTextMap: searchTextMap, search: true });
        confirm();
    }

    handleReset = clearFilters => () => {
        clearFilters();
        this.setState({ searchTextMap: {}, search: false });
    }

    render() {
        let searchTextMap = this.state.searchTextMap;
        let columns = this.props.columns;

        if (columns) {
            columns.forEach((column) => {
                if (column.hasFilter) {
                    column.filterDropdown = ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
                        return (<div className={`${styles.customFilterDropdown}`}>
                            <Input
                                ref={ele => this.searchInput = ele}
                                placeholder={`Filtrar por  ${column.title}`}
                                value={selectedKeys[0]}
                                onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                                onPressEnter={this.handleSearch(selectedKeys, confirm, column.title)}
                            />
                            <Button type="primary" onClick={this.handleSearch(selectedKeys, confirm, column.title)}>Filtrar</Button>
                            <Button onClick={this.handleReset(clearFilters)}>Limpar</Button>
                        </div>);
                    };

                    column.onFilterDropdownVisibleChange = (visible) => {
                        if (visible) {
                            setTimeout(() => {
                                this.searchInput.focus();
                            });
                        }
                    };

                    column.filterIcon = filtered => <Icon type="search" style={{ color: filtered ? '#108ee9' : '#aaa' }} />;

                    column.onFilter = (value, record) => {
                        let search = this.state.search;
                        if (!search) {
                            return true;
                        }

                        let searchTextMap = this.state.searchTextMap;
                        for (var key in record) {
                            var selectedProperty = searchTextMap[key];
                            if (selectedProperty) {
                                return record[key].includes(selectedProperty);
                            }
                        }
                        return false;
                    };

                }
            });
        }

        return (
            <Table
                columns={columns}
                dataSource={this.props.dataSource}
                pagination={this.props.pagination}
                size="small"
                scroll={{ x: 'fit-content', y: 'fit-content'}}
            />
        );
    }
}

export default TableFilter;