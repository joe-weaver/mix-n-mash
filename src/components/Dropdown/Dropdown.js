import React from "react";

import { DropdownButton, Dropdown, ButtonGroup } from "react-bootstrap";

import "./DropdownStyle.css"

const CustomDropdown = (props) => {
  let [selected, setSelected] = React.useState(props.defaultIndex ? props.items[props.defaultIndex] : props.items[0]);

  return (
    <DropdownButton
      as={ButtonGroup}
      title={selected}
      onClick={(event) => event.stopPropagation()}
    >
      {props.items.map((item) => (
        <Dropdown.Item
          onClick={() => {
            setSelected(item);
            props.selectionCallback(item);
          }}
          eventKey={item}
          key={item}
        >
          {item}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default CustomDropdown;
