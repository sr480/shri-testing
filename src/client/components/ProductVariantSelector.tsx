import { ProductVariant } from "../../common/types";
import React, { ChangeEvent, useCallback, useState } from "react";

interface Props {
  variants: ProductVariant[];
  onSelect: (value: ProductVariant) => void;
}

export const ProductVariantSelector: React.FC<Props> = ({ variants, onSelect }) => {
  const [selectedValue, setSelectedValue] = useState(variants[0]);
  const handleSelect = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    const selected = variants.find((v) => `${v.id}` === event.target.value);
    setSelectedValue(selected);
    onSelect(selected);
  }, [onSelect, variants]);

  if (variants.length === 0) {
    return <span>No Variants</span>
  }

  if (variants.length === 1) {

    return (<>
      <strong className="col-sm-3">Variant: </strong>
      <span className="col-sm-9">{variants[0].displayText}</span>
    </>)
  }

  return <>
    <label className="form-label">Variant</label>
    <select className="form-select" value={selectedValue?.id} onChange={handleSelect}>
      {
        variants.map(variant => (
          <option key={variant.id} value={variant.id}>{variant.displayText}</option>
        ))
      }
    </select>
  </>
}