import React from "react";

const SignUp = () => {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(fname, lname, email, password);

    }

    return (
        <>
        <div>
            <form onSubmit={handleSubmit}>
                <h3>Sign Up</h3>
                

            </form>
        </div>
        </>
    )


}

export default SignUp;

