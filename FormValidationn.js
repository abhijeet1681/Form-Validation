import React, { useState } from 'react';
import './FormValidation.css'; // Importing the CSS file

const FormValidation = () => {
    const initialFormData = {
        username: '',
        email: '',
        password: '',
    };
    const initialErrors = {
        username: '',
        email: '',
        password: '',
    };
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState(initialErrors);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        return regex.test(password);
    };

    const validateUsername = (username) => {
        const regex = /^[A-Za-z0-9]+$/;
        return regex.test(username);
    };

    const validate = () => {
        const newErrors = {};
        let isValid = true;

        if (!formData.username) {
            newErrors.username = 'Username is required';
            isValid = false;
        } else if (!validateUsername(formData.username)) {
            newErrors.username = 'Username must contain only alphabets and numbers (no special characters)';
            isValid = false;
        } else if (formData.username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
            isValid = false;
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (!validatePassword(formData.password)) {
            newErrors.password =
                'Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setIsSubmitted(true);
            console.log('Form data submitted:', formData);
            setSuccessMessage('Form submitted successfully!');
        } else {
            setIsSubmitted(false);
            setSuccessMessage('');
        }
    };

    const handleReset = () => {
        setFormData(initialFormData);
        setErrors(initialErrors);
        setIsSubmitted(false);
        setSuccessMessage('');
    };

    return ( <
        div className = "form-container" > { /* Display success message at the top of the form */ } {
            successMessage && !Object.values(errors).some((error) => error) && ( <
                p className = "success" > { successMessage } < /p>
            )
        }

        <
        h2 > Registration Form < /h2> <
        form onSubmit = { handleSubmit }
        className = "form" >
        <
        div className = "form-group" >
        <
        label htmlFor = "username" > Username: < /label> <
        input type = "text"
        id = "username"
        name = "username"
        value = { formData.username }
        onChange = { handleInputChange }
        className = { errors.username ? 'input-error' : '' }
        /> {
        errors.username && < p className = "error" > { errors.username } < /p>} < /
        div > <
        div className = "form-group" >
        <
        label htmlFor = "email" > Email: < /label> <
        input type = "email"
        id = "email"
        name = "email"
        value = { formData.email }
        onChange = { handleInputChange }
        className = { errors.email ? 'input-error' : '' }
        /> {
        errors.email && < p className = "error" > { errors.email } < /p>} < /
        div > <
        div className = "form-group" >
        <
        label htmlFor = "password" > Password: < /label> <
        input type = "password"
        id = "password"
        name = "password"
        value = { formData.password }
        onChange = { handleInputChange }
        className = { errors.password ? 'input-error' : '' }
        /> {
        errors.password && < p className = "error" > { errors.password } < /p>} < /
        div > <
        button type = "submit"
        className = "submit-button" > Submit < /button> <
        button type = "button"
        onClick = { handleReset }
        className = "reset-button" > Reset < /button> < /
        form > <
        /div>
    );
};

export default FormValidation;