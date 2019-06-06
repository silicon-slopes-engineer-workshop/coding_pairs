
import React from 'react';
function CheckBoxes({label, isSelected, onCheckBoxChange}) {
    return (
        <div>
        <label>
          <input
            type="checkbox"
            name={label}
            checked={isSelected}
            onChange={onCheckBoxChange}
          />
          {label}
        </label>

        </div>
    )
}

export default CheckBoxes;
