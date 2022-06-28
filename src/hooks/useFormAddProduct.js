import { useState } from "react";

export default function useFormAddProduct(baseData, action) {
  const [formData, setFormData] = useState(baseData);
  const [errorMsg, setErrorMsg] = useState("")

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const regex = /^\d+(\.\d{1,2})?$/;
    if (!regex.test(formData.price)) {
      setErrorMsg("Input valid price, with max 2 digits after decimal point")
      setFormData({...formData, price: ""});
    } else {
      setErrorMsg("");
      action(formData);
      setFormData(baseData);
    };
  }

  return { formData, handleChange, handleSubmit, errorMsg };
}