import { Request } from "@/helpers/httpHelper";
import { IAccount, IAccountsBranch, ITag, ITransaction } from "@/interfaces";
import { useSelect, useTable } from "@refinedev/antd";
import { useApiUrl } from "@refinedev/core";
import { axiosInstance } from "@refinedev/simple-rest";
import { AutoComplete, Input, Mentions, Select, Space, TreeSelect } from "antd";
import { useEffect, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { MentionsOptionProps, MentionsRef, OptionProps } from 'antd/es/mentions';
import type { GetProp, TreeSelectProps } from 'antd';
import { TextAreaRef } from "antd/es/input/TextArea";
import { debounce } from "lodash";


type DefaultOptionType = GetProp<TreeSelectProps, 'treeData'>[number];

const FormulaBuilder = ({formula, setFormula}) => {

    const textAreaRef = useRef<TextAreaRef>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const apiUrl = useApiUrl('laravel');
    const getData = async () => {
      if ( searchTerm.length > 1 ) {
        let url = `${apiUrl}/accounts/search`;
        let res = await Request('GET', url, null, {params:{code: searchTerm}});
        if ( res.data.success ) {
            const newTreeData = formatAccountTreeData(res.data.result)
            console.log('new result', newTreeData)
          setAccountTreeData([...newTreeData]);
        }
      }
    }

    const { tableProps: accountTableProps, filters, setFilters } = useTable<IAccount>({
        resource: "accounts",
        filters: {
            initial: [{
                field: "type",
                operator: "eq",
                value: "all",
            }]
        },
        sorters: {
            mode: "off",
        },
        syncWithLocation: false,
        pagination: {
            mode: "off"
          },
    });

    const {selectProps: tagsSelectProps} = useSelect<ITag>({
        resource: "tags",
        optionLabel: "label" as any,
        optionValue: "label" as any
    })

    const formatAccountTreeData = (data: IAccount[]) => {
        return data?.map(account => {
            console.log('account', account)
            return {
            title: account.code,
            value: account.code,
            key: account.code,
            isLeaf: account.has_children === true ? false : true,
            pId: account.parent_id ? account.parent_id : 0,
            id: account.id
        }
        }
    ) ?? [];
    }

    const [accountTreeData, setAccountTreeData] = useState<Omit<DefaultOptionType, 'label'>[]>([]);
    
    const [ selectedAccount, setSelectedAccount ] = useState<DefaultOptionType | null>(null);

    

    useEffect(()=>{
        console.log('tree data', accountTableProps.dataSource)
        if ( ! accountTableProps.loading) {
            const newAccountData = formatAccountTreeData(accountTableProps.dataSource as any)
            console.log('new account data', newAccountData)
            setAccountTreeData([...accountTreeData, ...newAccountData]);

        }
    },[accountTableProps.dataSource])


    const onLoadData: TreeSelectProps['loadData'] = (record) => {
        const account = accountTreeData.find(account => account.id === record.id);

        console.log('record',record, account);
        setSelectedAccount(record);
        if (account && ! account.isLeaf) {
            setFilters([
                {
                    field: 'type',
                    operator: 'eq',
                    value: 'all',
                },
                {
                    field: 'parent',
                    operator: 'eq',
                    value: record.id,
                }
            ], 'replace');
        }


        return new Promise((resolve) => {
            setTimeout(()=>{
                resolve(undefined);
            }, 300)
        });
        
    };
    useEffect(()=>{
        // console.log(searchTerm);
        // console.log('accountTreeData',accountTreeData);
        getData()
    }, [searchTerm])

    const handleSearch = debounce((searchValue: string) => {

        const filteredData = accountTreeData.filter(item => 
            (item.title as string).toLowerCase().includes(searchValue.toLowerCase())
        );
        // console.log('filteredData',filteredData);
        // If no results found in existing data, trigger API search
        if (filteredData.length === 0) {
            setSearchTerm(searchValue);
        }
    }, 300);

    const handleTagsSelect = (value) => {

        setFormula(prev => `${prev}{{${value}}}`);
        textAreaRef.current?.focus({
            cursor: 'end',
          });
    }

    const handleAccountsSelect = (value) => {
        console.log('ref',textAreaRef);
        setFormula(prev => `${prev}{{${value}}}`);
        textAreaRef.current?.focus({
              cursor: 'end',
            });
    }

    return (
        <div>
            <Space direction="vertical" style={{ width: '100%' }}>
                <Space>
                    {/* <AutoComplete
                        options={formulaOptions}
                        style={{ width: 200 }}
                        placeholder="Formula"
                        onSelect={(value) => setFormula(prev => `${prev} ${value}()`)}
                        filterOption={(inputValue, option) => 
                            (option!.value as string).toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                    /> */}
                    <Select
                        showSearch
                        options={tagsSelectProps.options}
                        style={{ width: 200 }}
                        placeholder="Tags"
                        onSelect={handleTagsSelect}
                        filterOption={(inputValue, option) => 
                            (option!.value as string).toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                    />
                    <TreeSelect
                        treeDataSimpleMode
                        style={{ width: 200 }}
                        popupMatchSelectWidth={false}
                        placeholder="Accounts"
                        treeData={accountTreeData}
                        loadData={onLoadData}
                        onSelect={handleAccountsSelect}
                        showSearch
                        filterTreeNode={(search, item) => 
                            (item?.title as any).toLowerCase().indexOf(search.toLowerCase()) >= 0
                        }
                        onSearch={handleSearch}
                    />
                </Space>
                <Input.TextArea
                    rows={4}
                    value={formula}
                    onChange={e => setFormula(e.target.value)}
                    placeholder="Example: SUM({x}, {y})"
                    ref={textAreaRef}
                />
            </Space>
        </div>
    );
};

export default FormulaBuilder;
