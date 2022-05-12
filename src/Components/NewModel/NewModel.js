import "./NewModel.css";
import { useState } from "react";

const NewModel = (props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [addresLine1, setAddresLine1] = useState("");
    const [addresLine2, setAddresLine2] = useState("");
    const [zip, setZip] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [nationality, setNationality] = useState("");
    const [height, setHeight] = useState("");
    const [shoeSize, setShoeSize] = useState("");
    const [hairColor, setHairColor] = useState("");
    const [eyeColor, setEyeColor] = useState("");
    const [comments, setComments] = useState("");
    const [password, setPassword] = useState("");



    const handleFirstName = (event) => {
        setFirstName(event.target.value);
    }
    const handleLastName = (event) => {
        setLastName(event.target.value);
    }
    const handleEmail = (event) => {
        setEmail(event.target.value);
    }
    const handlePhoneNo = (event) => {
        setPhoneNo(event.target.value);
    }
    const handleAddresLine1 = (event) => {
        setAddresLine1(event.target.value);
    }
    const handleAddresLine2 = (event) => {
        setAddresLine2(event.target.value);
    }
    const handleZip = (event) => {
        setZip(event.target.value);
    }
    const handleCity = (event) => {
        setCity(event.target.value);
    }
    const handleCountry = (event) => {
        setCountry(event.target.value);
    }
    const handleBirthDate = (event) => {
        setBirthDate(event.target.value);
    }
    const handleNationality = (event) => {
        setNationality(event.target.value);
    }
    const handleHeight = (event) => {
        setHeight(event.target.value);
    }
    const handleShoeSize = (event) => {
        setShoeSize(event.target.value);
    }
    const handleHairColor = (event) => {
        setHairColor(event.target.value);
    }
    const handleEyeColor = (event) => {
        setEyeColor(event.target.value);
    }
    const handleComments = (event) => {
        setComments(event.target.value);
    }
    const handlePassword = (event) => {
        setPassword(event.target.value);
    }


    const submitHandler = (event) => {
        event.preventDefault();

        const modelData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNo: phoneNo,
            addresLine1: addresLine1,
            addresLine2: addresLine2,
            zip: zip,
            city: city,
            country: country,
            birthDate: birthDate,
            nationality: nationality,
            height: height,
            shoeSize: shoeSize,
            hairColor: hairColor,
            eyeColor: eyeColor,
            comments: comments,
            password: password,

        }

        props.onCreateModel(modelData);
        setFirstName("")
        setLastName("")
        setEmail("")
        setPhoneNo("")
        setAddresLine1("")
        setAddresLine2("")
        setZip("")
        setCity("")
        setCountry("")
        setBirthDate("")
        setNationality("")
        setHeight("")
        setShoeSize("")
        setHairColor("")
        setEyeColor("")
        setComments("")
        setPassword("")
    }

    return (
        <div className="new-model">
            <form onSubmit={submitHandler} className="new-model-form">
                <div className="new-model-wrapper">
                    <div className="labels">
                        <label>firstName: </label>
                        <label>lastName: </label>
                        <label>email: </label>
                        <label>phoneNo: </label>
                        <label>addresLine1: </label>
                        <label>addresLine2: </label>
                        <label>zip: </label>
                        <label>city: </label>
                        <label>country: </label>
                        <label>birthDate: </label>
                        <label>nationality: </label>
                        <label>height: </label>
                        <label>shoeSize: </label>
                        <label>hairColor: </label>
                        <label>eyeColor: </label>
                        <label>comments: </label>
                        <label>password: </label>
                    </div>
                    <div className="inputs">
                        <input type="text" value={firstName} placeholder="Enter Model Name" onChange={handleFirstName} />
                        <input type="text" value={lastName} placeholder="Enter Age" onChange={handleLastName} />
                        <input type="email" value={email} placeholder="Enter Email" onChange={handleEmail} />
                        <input type="text" value={phoneNo} placeholder="Enter Phone No" onChange={handlePhoneNo} />
                        <input type="text" value={addresLine1} placeholder="Enter AddresLine 1" onChange={handleAddresLine1} />
                        <input type="text" value={addresLine2} placeholder="Enter AddresLine 2" onChange={handleAddresLine2} />
                        <input type="text" value={zip} placeholder="Enter Zip" onChange={handleZip} />
                        <input type="text" value={city} placeholder="Enter City" onChange={handleCity} />
                        <input type="text" value={country} placeholder="Enter Country" onChange={handleCountry} />
                        <input type="date" value={birthDate} placeholder="Enter BirthDate" onChange={handleBirthDate} />
                        <input type="text" value={nationality} placeholder="Enter Nationality" onChange={handleNationality} />
                        <input type="number" value={height} placeholder="Enter Height" onChange={handleHeight} />
                        <input type="number" value={shoeSize} placeholder="Enter ShoeSize" onChange={handleShoeSize} />
                        <input type="text" value={hairColor} placeholder="Enter HairColor" onChange={handleHairColor} />
                        <input type="text" value={eyeColor} placeholder="Enter EyeColor" onChange={handleEyeColor} />
                        <input type="text" value={comments} placeholder="Enter Comments" onChange={handleComments} />
                        <input type="password" value={password} placeholder="Enter Password" onChange={handlePassword} />
                    </div>
                </div>
                <button className="button" type="submit">Create Model</button>
            </form>
        </div>
    );
}

export default NewModel;