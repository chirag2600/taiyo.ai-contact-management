import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Popover,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import "../Css/Contact.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { v4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../Redux/Add_Contacts/addContacts.action.js";

// Function to fetch contact data
const getData = async () => {
  return await axios.get("https://taiyo-ai-server.onrender.com/contacts");
};

const Contacts = () => {
  // States for managing various aspects of the component
  const [flag, setFlag] = useState(false); // Controls the display of the "Create Contact" form
  const [contacts, setContacts] = useState({
    name: "",
    lastName: "",
    status: "",
  }); // State to store the input values for creating a contact
  const [edit, setEdit] = useState({ name: "", lastName: "", status: "" }); // State to store the input values for editing a contact
  const [data, setData] = useState([]); // State to store the contact data
  const dispatch = useDispatch(); // Redux dispatch function for managing actions
  const [view, setView] = useState(false); // Controls the display of a popover for viewing contact details

  // Handle input changes for creating a contact
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContacts({ ...contacts, [name]: value });
  };

  // Handle submission of the "Create Contact" form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (contacts.name && contacts.lastName && contacts.status) {
      // Dispatch an action to add a new contact to the Redux store
      dispatch(
        addContact({
          id: v4(),
          ...contacts,
        })
      );
      // Clear the input fields
      setContacts({ name: "", lastName: "", status: "" });
    } else {
      alert("Please fill in all credentials");
    }
  };

  // Handle input changes for editing a contact
  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    setEdit({ ...edit, [name]: value });
  };

  // Handle submission of the "Edit Contact" form
  const handleSubmitEdit = (e, id) => {
    e.preventDefault();
    try {
      // Make an API request to edit the contact and update the data
      axios
        .put(`https://taiyo-ai-server.onrender.com/contacts/${id}`, {
          name: edit.name,
          lastName: edit.lastName,
          status: edit.status,
        })
        .then(() => alert("Contact Edit Successfully"))
        .then(() => getData().then((res) => setData(res.data)));
    } catch (err) {
      console.error(err);
    }
  };

  // Delete a contact
  const deleteContact = (id) => {
    axios
      .delete(`https://taiyo-ai-server.onrender.com/contacts/${id}`)
      .then((res) => alert("Contact Delete Successfully"))
      .then(() => getData().then((res) => setData(res.data)));
  };

  // Fetch contact data on component mount
  useEffect(() => {
    getData().then((res) => setData(res.data));
  }, [handleSubmit]);

  // Open the "Create Contact" form
  const onOpen = () => {
    setFlag(true);
  };

  // Close the "Create Contact" form
  const onClose = () => {
    setFlag(false);
  };

  // Toggle the view of contact details popover
  const viewContact = () => {
    setView(!view);
  };

  return (
    <div id="contact_page">
      <Heading color={"white"} p={"10px 20px"} bg={"#28686e"}>
        Contact Page
      </Heading>
      <div id="contact_page_div">
        {window.innerWidth > 900 ? (
          <Box
            padding={"10px"}
            w={"19%"}
            boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
          >
            <Box>
              <Link
                style={{
                  textDecoration: "none",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
                to="/"
              >
                Contacts
              </Link>
            </Box>
            <br />
            <br />
            <Box>
              <Link
                style={{
                  textDecoration: "none",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
                to="/chartsandmaps"
              >
                Charts & Maps
              </Link>
            </Box>
          </Box>
        ) : (
          <Flex
            justifyContent={"space-evenly"}
            w={"100%"}
            margin={"auto"}
            marginBottom={"20px"}
            p={"10px 0px"}
            boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
          >
            <Box>
              <Link
                style={{
                  textDecoration: "none",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
                to="/"
              >
                Contacts
              </Link>
            </Box>
            <Box>
              <Link
                style={{
                  textDecoration: "none",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
                to="/chartsandmaps"
              >
                Charts & Maps
              </Link>
            </Box>
          </Flex>
        )}
        <Box
          padding={"30px"}
          margin={"auto"}
          w={"79%"}
          boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
          border={"1px solid gray"}
        >
          {flag ? (
            <></>
          ) : (
            <Button marginTop={"20px"} onClick={onOpen}>
              Create Contact
            </Button>
          )}
          <Box>
            {flag ? (
              <form onSubmit={handleSubmit} id="form">
                <Heading onClick={onClose}>X</Heading>
                <label>First Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={contacts.name}
                  onChange={handleChange}
                />
                <br />
                <br />
                <label>Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={contacts.lastName}
                  onChange={handleChange}
                />
                <br />
                <br />
                <label>Status:</label>
                <input
                  type="checkbox"
                  id="status"
                  name="status"
                  value="active"
                  checked={contacts.status === "active"}
                  onChange={handleChange}
                />
                <label>Active</label>
                <input
                  type="checkbox"
                  id="status"
                  name="status"
                  value="inactive"
                  checked={contacts.status === "inactive"}
                  onChange={handleChange}
                />
                <label>Inactive</label>
                <br />
                <br />
                <input type="submit" value="Save Contact" />
              </form>
            ) : (
              <></>
            )}
          </Box>
          {data.length < 1 ? (
            <Box
              id="empty"
              margin={"auto"}
              marginTop={"4%"}
              width={"50%"}
              border={"1px solid gray"}
            >
              <Heading>
                No Contacts Found. Please add a contact using the Create Contact
                button.
              </Heading>
            </Box>
          ) : (
            <Box marginTop={"4%"}>
              <div id="data_container">
                {data.map((el) => (
                  <div key={el.id}>
                    <Text fontWeight={"bold"}>
                      {el.name} {el.lastName}
                    </Text>
                    <Popover>
                      <PopoverTrigger>
                        <button
                          onClick={viewContact}
                          style={{ backgroundColor: "#bbc1c6" }}
                        >
                          View
                        </button>
                      </PopoverTrigger>
                      <PopoverContent
                        backgroundColor={"#bbc1c6"}
                        padding={"20px"}
                        color="white"
                        margin="auto"
                      >
                        <PopoverCloseButton backgroundColor={"#bbc1c6"}>
                          <Button backgroundColor="black" color="white">
                            X
                          </Button>
                        </PopoverCloseButton>
                        <Text color={"black"}>Name: {el.name}</Text>
                        <Text color={"black"}>Last Name: {el.lastName}</Text>
                        <Text color={"black"}>Status: {el.status}</Text>
                      </PopoverContent>
                    </Popover>
                    <Popover>
                      <PopoverTrigger>
                        <button
                          style={{ color: "white", backgroundColor: "#194d33" }}
                        >
                          Edit
                        </button>
                      </PopoverTrigger>
                      <PopoverContent
                        backgroundColor={"#194d33"}
                        padding={"10px"}
                        color="white"
                        margin="auto"
                      >
                        <PopoverCloseButton backgroundColor={"#194d33"}>
                          <Button backgroundColor="black" color="white">
                            X
                          </Button>
                        </PopoverCloseButton>
                        <label>Name:</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={edit.name}
                          onChange={handleChangeEdit}
                        />
                        <br />
                        <label>Last Name:</label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={edit.lastName}
                          onChange={handleChangeEdit}
                        />
                        <label>Status:</label>
                        <input
                          type="checkbox"
                          id="status"
                          name="status"
                          value="active"
                          checked={edit.status === "active"}
                          onChange={handleChangeEdit}
                        />
                        <label>Active</label>
                        <input
                          type="checkbox"
                          id="status"
                          name="status"
                          value="inactive"
                          checked={edit.status === "inactive"}
                          onChange={handleChangeEdit}
                        />
                        <label>Inactive</label>
                        <br />
                        <button onClick={(e) => handleSubmitEdit(e, el.id)}>
                          Submit
                        </button>
                      </PopoverContent>
                    </Popover>
                    <button
                      onClick={() => deleteContact(el.id)}
                      style={{ color: "white", backgroundColor: "red" }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </Box>
          )}
        </Box>
      </div>
    </div>
  );
};

export default Contacts;
