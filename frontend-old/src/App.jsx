import { useState } from "react";
import Login from "./login";

function App() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        const data = await response.json();

        setMessage(data.message);

        console.log(data);
    };

    return (
        // <div>
        //     <h1>Harvest Hub</h1>

        //     <form onSubmit={handleSubmit}>

        //         <input
        //             type="text"
        //             placeholder="Name"
        //             value={name}
        //             onChange={(e) => setName(e.target.value)}
        //         />

        //         <input
        //             type="email"
        //             placeholder="Email"
        //             value={email}
        //             onChange={(e) => setEmail(e.target.value)}
        //         />

        //         <input
        //             type="password"
        //             placeholder="Password"
        //             value={password}
        //             onChange={(e) => setPassword(e.target.value)}
        //         />

        //         <button type="submit">
        //             Sign Up
        //         </button>

        //         <p>{message}</p>

        //     </form>
        // </div>
        <Login />
    );
}

export default App;