import { Request } from "@/helpers/httpHelper";
import { IAccount, IAccountsBranch, ITag, ITransaction } from "@/interfaces";
import { useSelect, useTable } from "@refinedev/antd";
import { useApiUrl } from "@refinedev/core";
import { axiosInstance } from "@refinedev/simple-rest";
import { AutoComplete, Input, Mentions, Space, TreeSelect } from "antd";
import { useEffect, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { MentionsOptionProps, MentionsRef, OptionProps } from 'antd/es/mentions';
import type { GetProp, TreeSelectProps } from 'antd';


type DefaultOptionType = GetProp<TreeSelectProps, 'treeData'>[number];


const validateFormula = async (formula) => {
    try {
        const response = await axiosInstance.post("/custom-calculation/calculate", {
            formula,
            data: { TotalIncome: 5000, TotalExpenses: 2000 },
        });
        alert(`Result: ${response.data.result}`);
    } catch (error) {
        alert("Invalid Formula");
    }
};

const saveFormula = async (name, formula) => {
    await axiosInstance.post("/custom-calculation/save", {
        name,
        formula,
        user_id: 1, // Replace with actual user ID
    });
    alert("Formula saved successfully!");
};

const { getMentions } = Mentions;
const FormulaBuilder = ({formula, setFormula}) => {
    // Options for different autocompletes
    const textAreaRef = useRef<MentionsRef>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [ trigger, setTrigger ] = useState('');

    const [searchResults, setSearchResults] = useState<any[]>([]);
    const apiUrl = useApiUrl('laravel');
    const getData = async () => {
      if ( searchTerm.length > 1 ) {
        let url = `${apiUrl}/accounts/search`;
        let res = await Request('GET', url, null, {params:{code: searchTerm}});
        if ( res.data.success ) {
          setSearchResults([...res.data.result]);
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

    const [mentions, setMentions] = useState<any[]>([]);

    const accountOptions = accountTableProps.dataSource?.map(account => ({
        label: account.code,
        value: account.code
    })) || [];

    const formulaOptions = [
        { label: 'ABS', value: 'ABS' },
        { label: 'ACOS', value: 'ACOS' },
        { label: 'ACOSH', value: 'ACOSH' },
        { label: 'ASIN', value: 'ASIN' },
        { label: 'ASINH', value: 'ASINH' },
        { label: 'ATAN', value: 'ATAN' },
        { label: 'ATAN2', value: 'ATAN2' },
        { label: 'ATANH', value: 'ATANH' },
        { label: 'CEILING', value: 'CEILING' },
        { label: 'COMBIN', value: 'COMBIN' },
        { label: 'COS', value: 'COS' },
        { label: 'COSH', value: 'COSH' },
        { label: 'DEGREES', value: 'DEGREES' },
        { label: 'EVEN', value: 'EVEN' },
        { label: 'EXP', value: 'EXP' },
        { label: 'FACT', value: 'FACT' },
        { label: 'FACTDOUBLE', value: 'FACTDOUBLE' },
        { label: 'FLOOR', value: 'FLOOR' },
        { label: 'GCD', value: 'GCD' },
        { label: 'INT', value: 'INT' },
        { label: 'LCM', value: 'LCM' },
        { label: 'LN', value: 'LN' },
        { label: 'LOG', value: 'LOG' },
        { label: 'LOG10', value: 'LOG10' },
        { label: 'MDETERM', value: 'MDETERM' },
        { label: 'MINVERSE', value: 'MINVERSE' },
        { label: 'MMULT', value: 'MMULT' },
        { label: 'MOD', value: 'MOD' },
        { label: 'ODD', value: 'ODD' },
        { label: 'PI', value: 'PI' },
        { label: 'POWER', value: 'POWER' },
        { label: 'PRODUCT', value: 'PRODUCT' },
        { label: 'QUOTIENT', value: 'QUOTIENT' },
        { label: 'RADIANS', value: 'RADIANS' },
        { label: 'RAND', value: 'RAND' },
        { label: 'RANDBETWEEN', value: 'RANDBETWEEN' },
        { label: 'ROMAN', value: 'ROMAN' },
        { label: 'ROUND', value: 'ROUND' },
        { label: 'ROUNDDOWN', value: 'ROUNDDOWN' },
        { label: 'ROUNDUP', value: 'ROUNDUP' },
        { label: 'SERIESSUM', value: 'SERIESSUM' },
        { label: 'SIGN', value: 'SIGN' },
        { label: 'SIN', value: 'SIN' },
        { label: 'SINH', value: 'SINH' },
        { label: 'SQRT', value: 'SQRT' },
        { label: 'SQRTPI', value: 'SQRTPI' },
        { label: 'SUBTOTAL', value: 'SUBTOTAL' },
        { label: 'SUM', value: 'SUM' },
        { label: 'SUMIF', value: 'SUMIF' },
        { label: 'SUMPRODUCT', value: 'SUMPRODUCT' },
        { label: 'SUMSQ', value: 'SUMSQ' },
        { label: 'TAN', value: 'TAN' },
        { label: 'TANH', value: 'TANH' },
        { label: 'TRUNC', value: 'TRUNC' }
    ];

    // const handleSearch = (value) => {
    //     if ( value === '@') {
    //         setMentions([...formulaOptions.map(item => ({key: `${item.value}()`, label: item.label}))]);
    //     } else if ( value === '{{') {
    //         setMentions([...branchOptions?.map(item => ({key: item.value, label: item.label})) || []]);
    //     }
    //     // console.log(`search value: ${value}`);
    //     // setFormula(value);
        
    // }

    const handleSelect = (value, option) => {
        // let newFormula = '';

        // if ( prefix === '{{' ) {
        //     console.log('formula',formula);
        //     if ( formula.endsWith(')') ) {
        //         newFormula = `${formula.slice(0, formula.length - 1)}${option.key}}}${formula.slice(formula.length-1)}`;
        //     }
        //     else {
        //         newFormula = `${formula}${option.key}}}`;
        //     }
        // }
        // else {
        //     newFormula = `${formula.replace('@','')}${option.key}`;
        // }
        // // console.log(option, formula, newFormula,textAreaRef.current?.textarea?.textLength,textAreaRef.current?.textarea?.selectionStart, textAreaRef.current?.textarea?.selectionEnd);
        // setFormula(newFormula);
        // // if ( prefix === '@' )
        // // {
        // //     console.log(formula,textAreaRef.current?.textarea?.textContent,textAreaRef.current?.textarea?.textLength,textAreaRef.current?.textarea?.selectionStart, textAreaRef.current?.textarea?.selectionEnd);
        // //     if ( textAreaRef.current?.textarea?.selectionEnd ) {
        // //         textAreaRef.current.textarea.value = newFormula;
        // //         textAreaRef.current.textarea.selectionStart = textAreaRef.current.textarea.textLength - 1;
        // //         textAreaRef.current.textarea.selectionEnd = newFormula.length - 1;
        // //         console.log(textAreaRef.current);

        // //     }
        // // }
        const newFormula = `${formula.replace('@','')}${option.key}`;
        setFormula(newFormula);
        console.log(`selectvalue: ${value}, formula: ${newFormula},option:`,option);
    }

    useEffect(()=>{
        // console.log('formula',formula);
        if ( formula.endsWith(')') )
            {
                if ( textAreaRef.current?.textarea?.selectionEnd ) {
                    // textAreaRef.current.textarea.value = newFormula;
                    textAreaRef.current.textarea.selectionStart = formula.length - 1;
                    textAreaRef.current.textarea.selectionEnd = formula.length - 1;
                    // console.log(textAreaRef.current);
    
                }
            }
        else {
            if ( textAreaRef.current?.textarea?.selectionEnd ) {
                // textAreaRef.current.textarea.value = newFormula;
                textAreaRef.current.textarea.selectionStart = formula.length;
                textAreaRef.current.textarea.selectionEnd = formula.length;
                // console.log(textAreaRef.current);
            }
        }
        // console.log('formula1',formula,textAreaRef.current);
    }, [formula])
    const handleChange = (value) => {

        // console.log('change',trigger,value, formula,textAreaRef.current);
        // setFormula(value);
        console.log(`change value: ${value}`);
        setFormula(value);
    }

    // useEffect(()=>{

    //     setTimeout(()=>{
    //         console.log('timeout', formula,textAreaRef.current);
    //     }, 3000)
    // },[formula])
    const formatAccountTreeData = (data: IAccount[]) => {
        return data?.map(account => ({
            title: account.code,
            value: account.code,
            key: account.code,
            isLeaf: account.taxonomy === 'leaf' ? true : false,
            pId: account.parent_id ? account.parent_id : 0,
            id: account.id
        })) ?? [];
    }

    // Transform account data into TreeSelect format
    const [accountTreeData, setAccountTreeData] = useState<Omit<DefaultOptionType, 'label'>[]>([...formatAccountTreeData(accountTableProps?.dataSource as any) ?? []]);
    // const accountTreeData: Omit<DefaultOptionType, 'label'>[] = accountTableProps.dataSource?.map(account => ({
    //     title: account.code,
    //     value: account.code,
    //     key: account.id,
    //     isLeaf: account.taxonomy === 'leaf' ? true : false,
    //     pId: account.parent_id ? account.parent_id : 0
    // })) || [];

    
    const [ selectedAccount, setSelectedAccount ] = useState<DefaultOptionType | null>(null);

    useEffect(()=>{
        console.log('record',selectedAccount);
                if ( ! selectedAccount?.isLeaf ) {
                    console.log('record.isLeaf',selectedAccount?.isLeaf);
                setFilters([
                    {
                        field: 'type',
                        operator: 'eq',
                        value: 'all',
                    },
                    {
                        field: 'parent',
                        operator: 'eq',
                        value: selectedAccount?.id,
                        
                    }
                ], 'replace');
            }
    },[selectedAccount])
    useEffect(()=>{
        console.log('accountTableProps.dataSource',accountTableProps.dataSource);
        if ( ! accountTableProps.loading ) {
            setAccountTreeData([...accountTreeData, ...formatAccountTreeData(accountTableProps.dataSource as any)]);
        }
    },[accountTableProps.dataSource])


    const onLoadData: TreeSelectProps['loadData'] = (record) => {
        console.log('record',record);
        return new Promise((resolve) => {
                
            setTimeout(()=>{
                console.log('accountTreeData',accountTreeData);
                setSelectedAccount(record);
            resolve(undefined);
        }, 300)});
        
    };
    return (
        <div>
            <Space direction="vertical" style={{ width: '100%' }}>
                <Space>
                    <AutoComplete
                        options={formulaOptions}
                        style={{ width: 200 }}
                        placeholder="Formula"
                        onSelect={(value) => setFormula(prev => `${prev} ${value}()`)}
                        filterOption={(inputValue, option) => 
                            (option!.value as string).toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                    />
                    <AutoComplete
                        options={tagsSelectProps.options}
                        style={{ width: 200 }}
                        placeholder="Tags"
                        onSelect={(value) => setFormula(prev => `${prev} ${value}`)}
                        filterOption={(inputValue, option) => 
                            (option!.value as string).toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                    />
                    <TreeSelect
                        treeDataSimpleMode
                        style={{ width: 200 }}
                        placeholder="Accounts"
                        treeData={accountTreeData}
                        loadData={onLoadData}
                        onSelect={(value) => setFormula(prev => `${prev} ${value}`)}
                        showSearch
                        filterTreeNode={(search, item) => 
                            (item?.title as any).toLowerCase().indexOf(search.toLowerCase()) >= 0
                        }
                    />
                    {/* <AutoComplete
                        options={branchesSelectProps.options}
                        style={{ width: 200 }}
                        placeholder="Formulas"
                        onSelect={(value) => setFormula(prev => `${prev} ${value}`)}
                        filterOption={(inputValue, option) => 
                            (option!.value as string).toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}

                    /> */}
                </Space>
                {/* <AutoComplete
                    options={mentions}
                    value={formula}
                    style={{ width: 200 }}
                    placeholder="Formula"
                    onSelect={handleSelect}
                    onChange={handleChange}
                    onSearch={handleSearch}
                    filterOption={(inputValue, option) => 
                    {
                        console.log(`inputValue: ${inputValue}, formula:${formula}`);
                        // console.log(`inputValue: ${inputValue}, option:`,option);
                        if ( inputValue === '@' || inputValue === '{{') {
                            return true;
                        }
                        // console.log(`inputValue: ${inputValue.slice(1)}`);
                        return (option!.key as string).toUpperCase().startsWith(inputValue.slice(1).toUpperCase());
                    }
                        
                }
                > */}
                <Input.TextArea
                    rows={4}
                    value={formula}
                    // onChange={e => console.log(e.target.value)}
                    placeholder="Example: SUM({x}, {y})"
                />
                {/* </AutoComplete> */}
                
                {/* <Mentions
                    ref={textAreaRef}
                    autoSize
                    value={formula}
                    options={mentions}
                    prefix={['@', '{{']}
                    onSearch={handleSearch}
                    onSelect={handleSelect}
                    onChange={handleChange}
                    // validateSearch={(text, split)=>{
                    //     console.log(`text:${text},split:${split}`);
                    //     return /^[A-Za-z]+$/.test(text.at(- 1) || '') ? true : false;
                    // }}
                    filterOption={(input, option: MentionsOptionProps) => {
                        console.log(`input:${input},option`,option);
                        // if (input.length > 0 && /^[A-Za-z0-9]+$/.test(input.at(- 1) || '')) {
                            // console.log(`length: ${input.length}  test: ${/^[AZa-z]+$/.test(input.at(- 1) || '')}`);
                            return (option!.key as string).toLowerCase().startsWith(input.toLowerCase())
                        // }
                        return true;
                    }
                }
                        
                    // onChange={e => setSearchTerm(e)}
                    // onSelect={(value) => setFormula(prev => `${prev} ${value}`)}
                /> */}
            </Space>
        </div>
    );
};

export default FormulaBuilder;
