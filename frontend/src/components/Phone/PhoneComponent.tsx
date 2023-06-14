import React, {useState} from 'react';
import PhoneInput from 'react-phone-input-2';

const PhoneComponent = () => {
    const [mobile, setMobile] = useState<string>("");
    const handlePhoneChange = (value : string) => {
        setMobile(value);
    }
    return (
        <div>
            <PhoneInput
                country={'us'}
                value={mobile}
                enableSearch={true}
                inputClass="phoneInput"
                containerClass="phoneContainer"
                onChange={handlePhoneChange}
            />
        </div>
    );
};

export default PhoneComponent;