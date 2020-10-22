import React from "react";

import { DropdownButton, Dropdown, ButtonGroup } from "react-bootstrap";

const CustomDropdown = (props) => {
  let variant = "secondary";

  let [selected, setSelected] = React.useState(props.items[0]);

  return (
    <DropdownButton
      as={ButtonGroup}
      key={variant}
      id={`dropdown-variants-${variant}`}
      variant={variant.toLowerCase()}
      title={selected}
    >
      {props.items.map((item) => (
        <Dropdown.Item
          onClick={() => {
            setSelected(item);
            props.selectionCallback(item);
          }}
          eventKey={item}
        >
          {item}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default CustomDropdown;
