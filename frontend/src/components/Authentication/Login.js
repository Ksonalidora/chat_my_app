// // import React, { useState } from 'react';
// // import { VStack, Button, Input, InputGroup, InputRightElement, FormControl, FormLabel } from '@chakra-ui/react';

// // const Login = () => {
  
// //   const [show, setShow] = useState(false);
// //   const [name, setName] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
  

// //   const handleClick = () => setShow(!show);



// //   const submitHandler = () =>{};

// //   return (
// //     <VStack spacing="5px">
// //       <FormControl id="name" isRequired>
// //         <FormLabel>Name</FormLabel>
// //         <Input
// //           placeholder="Enter Your Name"
// //           value={name}
// //           onChange={(e) => setName(e.target.value)}
// //         />
// //       </FormControl>

// //       <FormControl id="email" isRequired>
// //         <FormLabel>Email Address</FormLabel>
// //         <Input
// //           type="email"
// //           placeholder="Enter Your Email Address"
// //           value={email}
// //           onChange={(e) => setEmail(e.target.value)}
// //         />
// //       </FormControl>

// //       <FormControl id="password" isRequired>
// //         <FormLabel>Password</FormLabel>
// //         <InputGroup size="md">
// //           <Input
// //             type={show ? "text" : "password"}
// //             placeholder="Enter Password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //           />
// //           <InputRightElement width="4.5rem">
// //             <Button h="1.75rem" size="sm" onClick={handleClick}>
// //               {show ? "Hide" : "Show"}
// //             </Button>
// //           </InputRightElement>
// //         </InputGroup>
// //       </FormControl>
      
// //        <Button
// //         colorScheme="blue"
// //         width="100%"
// //         style={{ marginTop: 15 }}
// //         onClick={submitHandler}
// //         // isLoading={picLoading}
// //       >
// //         Sign Up
// //       </Button>

// //       {/* You can add the Confirm Password and other fields similarly */}
// //     </VStack>
// // }

// // export default Login





// import React, { useState } from 'react';
// import { VStack, Button, Input, InputGroup, InputRightElement, FormControl, FormLabel } from '@chakra-ui/react';

// const Login = () => {
  
//   const [show, setShow] = useState(false);
 
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
  

//   const handleClick = () => setShow(!show);

//   const submitHandler = () => {
//     // Handle login form submission logic here
//     // console.log("Name: ", name);
//     // console.log("Email: ", email);
//     // console.log("Password: ", password);
//   };

//   return (
//     <VStack spacing="5px">
     

//       <FormControl id="email" isRequired>
//         <FormLabel>Email Address</FormLabel>
//         <Input
//           type="email"
//           placeholder="Enter Your Email Address"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </FormControl>

//       <FormControl id="password" isRequired>
//         <FormLabel>Password</FormLabel>
//         <InputGroup size="md">
//           <Input
//             type={show ? "text" : "password"}
//             placeholder="Enter Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <InputRightElement width="4.5rem">
//             <Button h="1.75rem" size="sm" onClick={handleClick}>
//               {show ? "Hide" : "Show"}
//             </Button>
//           </InputRightElement>
//         </InputGroup>
//       </FormControl>
      
//       <Button
//         colorScheme="blue"
//         width="100%"
//         style={{ marginTop: 15 }}
//         onClick={submitHandler}
//       >
//         Sign Up
//       </Button>
//       <Button
//         variant="solid"
//         colorScheme="red"
//         width="100%"
//         onClick={() => {
//           setEmail("guest@example.com");
//           setPassword("123456");
//         }}
//       >
//         Get Guest User Credentials
//       </Button>
//     </VStack>
//   );
// }

// export default Login;



// // mongodb+srv://sonalidora02:<db_password>@cluster0.0fmrv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0




import React, { useState } from 'react';
import { VStack, Button, Input, InputGroup, InputRightElement, FormControl, FormLabel } from '@chakra-ui/react';
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [show, setShow] = useState(false); // State to toggle password visibility
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [loading, setLoading] = useState(false); // State to handle loading

  const handleClick = () => setShow(!show); // Function to toggle password visibility
  const toast = useToast();
  const history = useHistory(); // Hook for navigating after successful login

  const submitHandler = async () => {
    setLoading(true); // Start loading spinner

    // Check if fields are filled
    if (!email || !password) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    // Prepare login data
    const loginData = { email, password };

    try {
      const { data } = await axios.post("/api/user/login", loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      // Save user data to local storage
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);

      // Redirect to chats or another page
      history.push("/chats");

    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.response && error.response.data.message ? error.response.data.message : "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="5px">
      {/* Email Input */}
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      {/* Password Input */}
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      {/* Login Button */}
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading} // Disable button while loading
      >
        Login
      </Button>

      {/* Guest User Button */}
      <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
