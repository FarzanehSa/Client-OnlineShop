import { useState } from "react";

export default function useFormAddBarcode(baseData, action) {
  const [formBarcodeData, setFormBarcodeData] = useState(baseData);
  const [errorMsg2, setErrorMsg2] = useState("");
  
  const handleChange2 = (event) => {
    const { name, value} = event.target;
    setFormBarcodeData({ ...formBarcodeData, [name]: value })
  };

  const handleSubmit2 = (event) => {
    event.preventDefault();
    const regex =  /^[0-9]\d*$/ ;
    if (!regex.test(formBarcodeData.quantity)) {
      setErrorMsg2("Input valid quantity")
      setFormBarcodeData({...formBarcodeData, quantity: ""});
    } else {
      setErrorMsg2("");
      action(formBarcodeData);
      setFormBarcodeData(baseData);
    };
  };

  return { formBarcodeData, handleChange2, handleSubmit2, errorMsg2 };
}