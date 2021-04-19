import React, { useState, useEffect, useRef } from 'react';
import { useActions } from '../../hooks/useActions';
import { Updates, FormFields } from '../../shared';

interface CardFormProps {
  id: string;
  edit: boolean;
  formFields: FormFields;
  setFormFields: (updates: Updates) => void;
}

const editStyle = { border: '1px dashed gray' };
const defaultStyle = { border: '1px solid transparent' };

const CardForm: React.FC<CardFormProps> = ({ id = null, edit, formFields, setFormFields }) => {
  const [style, setStyle] = useState(defaultStyle);
  const { updateCard } = useActions();
  const form = useRef(null);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLSpanElement>): void => {
    if (event.keyCode === 13) {
      event.preventDefault();
      const dataAttribute = event.currentTarget.getAttribute("data")?.valueOf();
      const node: HTMLElement | null = document.querySelector(`#${dataAttribute}`);
      if (node) node.blur();
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLSpanElement>): void => {
    const name = event.currentTarget.getAttribute("data")?.valueOf() as string;
    const value = event.target.innerText;
    const updates: Updates = { ...formFields, [name]: value };
    setFormFields(updates);
    if (id) {
      updateCard(id, updates);
    }
  };

  useEffect(() => {
    if (edit) setStyle(editStyle);
    else setStyle(defaultStyle);
  }, [edit]);

  return (
    <div className="cardForm" ref={form}>
      {Object.entries(formFields).map((field) => (
        <div key={field[0]} className="cardForm-input">
          <span
            contentEditable={edit}
            suppressContentEditableWarning={true}
            role="textbox"
            tabIndex={0}
            className="cardForm-input__input"
            style={style}
            id={field[0]}
            // data={field[0]}
            onKeyDown={handleKeyPress}
            onBlur={handleBlur}
          >
            {formFields[field[0] as keyof FormFields]}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CardForm;
