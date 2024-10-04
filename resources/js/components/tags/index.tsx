import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Flex, Input, Tag, theme, Tooltip } from 'antd';
import { useStyles } from './styled';
import { Select } from 'antd/lib';
import { useSelect } from '@refinedev/antd';
import { ITag } from '@/interfaces';

// const tagInputStyle: React.CSSProperties = {
//   width: 64,
//   height: 22,
//   marginInlineEnd: 8,
//   verticalAlign: 'top',
// };

export const DisplayTags = ({initialTags, handleTagsChange}) => {
  const { token } = theme.useToken();
  const { styles } = useStyles();
  const [tags, setTags] = useState<ITag[]>(initialTags);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);

  const { selectProps } = useSelect<ITag>({
    resource: 'tags',
    optionLabel: 'label',
    optionValue: 'id',
  })
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [editInputValue]);

  const handleClose = (removedTag: number) => {
    const newTags = tags.filter((tag) => tag.id !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

//   const handleInputConfirm = () => {
//     if (inputValue && !tags.includes(inputValue)) {
//       setTags([...tags, inputValue]);
//     }
//     setInputVisible(false);
//     setInputValue('');
//   };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
  };

//   const handleEditInputConfirm = () => {
//     const newTags = [...tags];
//     newTags[editInputIndex] = editInputValue;
//     setTags(newTags);
//     setEditInputIndex(-1);
//     setEditInputValue('');
//   };

//   const tagPlusStyle: React.CSSProperties = {
//     height: 22,
//     background: token.colorBgContainer,
//     borderStyle: 'dashed',
//   };

  return (
    <Flex gap="4px 0" wrap>
      {tags.map<React.ReactNode>((tag, index) => {
        // if (editInputIndex === index) {
        //   return (
        //     <Input
        //       ref={editInputRef}
        //       key={tag}
        //       size="small"
        //       className={styles.tagInput}
        //       value={editInputValue}
        //       onChange={handleEditInputChange}
        //       onBlur={handleEditInputConfirm}
        //       onPressEnter={handleEditInputConfirm}
        //     />
        //   );
        // }
        const isLongTag = tag.label.length > 20;
        const tagElem = (
          <Tag
            key={tag.id}
            closable={index !== 0}
            style={{ userSelect: 'none' }}
            onClose={() => handleClose(tag.id)}
          >
            <span
            //   onDoubleClick={(e) => {
            //     if (index !== 0) {
            //       setEditInputIndex(index);
            //       setEditInputValue(tag);
            //       e.preventDefault();
            //     }
            //   }}
            >
              {isLongTag ? `${tag.label.slice(0, 20)}...` : tag.label}
            </span>
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag.label} key={tag.id}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {inputVisible ? (
        // <Input
        //   ref={inputRef}
        //   type="text"
        //   size="small"
        //   className={styles.tagInput}
        //   value={inputValue}
        //   onChange={handleInputChange}
        //   onBlur={handleInputConfirm}
        //   onPressEnter={handleInputConfirm}
        // />
        <Select
        className={styles.tagInput}
        onChange={handleTagsChange}
        {...selectProps}
        />      
      ) : (
        <Tag className={styles.tagPlus} icon={<PlusOutlined />} onClick={showInput}>
          New Tag
        </Tag>
      )}
    </Flex>
  );
};
