import { useState } from "react";
import LoginForm from "./Login/LoginForm";
import RegisterForm from "./Register/RegisterForm";

function ToggleAuthenticationForm() {
    const [toggle, setToggle] = useState(true);
    const toggleForm = () => setToggle(!toggle);
    return (
        <div>
            {toggle ? (<LoginForm onSwitch={toggleForm}/>) : (<RegisterForm onSwitch={toggleForm}/>)}
        </div>
    )
}

export default ToggleAuthenticationForm;