import React, { useState, useEffect } from "react";
import "./style.css";
import company from "./company.json";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Breakpoint, BreakpointProvider } from "react-socks";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import axios from "axios";

export default function App() {
    interface Human {
        // _id: Types.ObjectId;
        firstName: string;
        dummy: string;
        middleName: string;
        lastName: string;
        prefix?: string;
        suffix?: string;
        nickname?: string;
        birthDate: Date;
        age: number;
        gender: string;
        address: {
            buildingNumber: string;
            buildingName: string;
            street: string;
            addressLine: string;
            city: string;
            province: string;
            country: string;
            postalCode: string;
        };
        isOpen: boolean;
        updated_date?: Date;
    }
    const [search, setSearch] = useState("");
    const [humanData, setHumanData] = useState<Human[]>([]);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleGetHumanData = () => {
        axios
            .get<Human[]>("https://human-manager.onrender.com/api/humans/all")
            .then(function (response) {
                setHumanData(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const handleDeleteHumanData = () =>{

    }

    useEffect(() => {
        handleGetHumanData();
    }, []);

    const filterHumanData = humanData.filter((items) => {
        const searchText = search.toLowerCase();
        const propertiesToSearch = [
            "lastName",
            "firstName",
            "middleName",
        ];
        return propertiesToSearch.some((property) =>
            items[property].toLowerCase().includes(searchText)
        );
    });

    const filterCompanyData = company.filter((item) => {
        const searchText = search.toLowerCase();
        const propertiesToSearch = [
            "company_name",
            "address",
            "address_line2",
            // Add more properties as needed
        ];
        return propertiesToSearch.some((property) =>
            item[property].toLowerCase().includes(searchText)
        );
    });

    //Hand
    const [dropdownChoice, setDropdownChoice] = React.useState("Users");

    const handleChangeDropdown = (event) => {
        setDropdownChoice(event.target.value);
    };

    const toggleDetails = (index: number) => {
        const newData = [...humanData];
        newData[index].isOpen = !newData[index].isOpen;
        setHumanData(newData);
    };

    return (
        <BreakpointProvider>
            <Breakpoint small up>
                <div className="content">
                    <div className="name"></div>
                    <div className="searchbar-section">
                        <div className="title-text">
                            <p
                                style={{
                                    fontSize: "24px",
                                    fontWeight: "bold",
                                    padding: "30px 0px 0px 50px",
                                    color: "white",
                                }}
                            >
                                Human Management
                            </p>
                        </div>
                        <div className="search-bar">
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search"
                                onChange={handleSearch}
                                style={{
                                    height: "40px",
                                    minWidth: "600px",
                                    width: "100%",
                                    borderRadius: "25px",
                                    border: "2px solid",
                                    borderColor: "#C1C1C1",
                                    padding: "0px 10px",
                                    overflow: "hidden",
                                    flex: "1",
                                }}
                            />
                        </div>
                    </div>
                    <Box>
                        <FormControl
                            variant="filled"
                            sx={{ m: 3, minWidth: 120, float: "right" }}
                            size="small"
                        >
                            <InputLabel id="demo-simple-select-label">
                                Users
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={dropdownChoice}
                                label="User"
                                onChange={handleChangeDropdown}
                            >
                                <MenuItem value={"Users"}>Users</MenuItem>
                                <MenuItem value={"Company"}>Company</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <div
                        style={{
                            margin: "100px 20px 20px",
                            border: "1px solid ##D0D0D0",
                            height: "100vh",
                            borderRadius: "20px",
                            overflow: "hidden",
                        }}
                    >
                        {dropdownChoice === "Users"
                            ? filterHumanData.map((items, index) => {
                                  const isFirst = index === 0;
                                  const isLast =
                                      index === filterHumanData.length - 1;
                                  return (
                                      <div
                                          style={{
                                              display: "flex",
                                              border: "1px solid #D0D0D0",
                                              justifyContent: "space-between",
                                              alignItems: "center",
                                              padding: "20px",
                                              backgroundColor:
                                                  index % 2 === 0
                                                      ? "#E9F5DB"
                                                      : "#CFE1B9",
                                              borderRadius: `${
                                                  isFirst ? "20px 20px 0 0" : ""
                                              }${
                                                  isLast ? "0 0 20px 20px" : ""
                                              }`,
                                          }}
                                      >
                                          <div style={{ flex: "2" }}>
                                              <p
                                                  style={{
                                                      fontSize: "20px",
                                                      fontWeight: "medium",
                                                  }}
                                              >
                                                  {items.lastName},{" "}
                                                  {items.firstName}{" "}
                                                  {items.middleName}
                                              </p>
                                              <p
                                                  style={{
                                                      fontSize: "16px",
                                                      fontStyle: "italic",
                                                      color: "#878787",
                                                  }}
                                              >
                                                  {items.nickname}
                                              </p>
                                          </div>
                                          <div style={{ flex: "1" }}>
                                              <p
                                                  style={{
                                                      fontSize: "20px",
                                                  }}
                                              >
                                                  {/* {items.birthDate} */}
                                              </p>
                                          </div>
                                          <div style={{ flex: "1" }}>
                                              <p
                                                  style={{
                                                      fontSize: "20px",
                                                  }}
                                              >
                                                  {items.gender}
                                              </p>
                                          </div>
                                          <div style={{ flex: "4" }}>
                                              <p
                                                  style={{
                                                      fontSize: "20px",
                                                  }}
                                              >
                                                  {items.address.buildingNumber}
                                                  , {items.address.buildingName}
                                                  , {items.address.street},{" "}
                                                  {items.address.city},{" "}
                                                  {items.address.province},
                                                  {items.address.country},{" "}
                                                  {items.address.postalCode}
                                              </p>
                                          </div>
                                          <div style={{ flex: "1" }}>
                                              <button
                                                  style={{
                                                      backgroundColor:
                                                          "#97A97C",
                                                      width: "60px",
                                                      height: "25px",
                                                      border: "none",
                                                      fontWeight: "bold",
                                                      cursor: "pointer",
                                                      color: "white",
                                                  }}
                                              >
                                                  <EditIcon fontSize="medium" />
                                              </button>

                                              <button
                                                  style={{
                                                      backgroundColor:
                                                          "red",
                                                      width: "60px",
                                                      height: "25px",
                                                      border: "none",
                                                      fontWeight: "bold",
                                                      cursor: "pointer",
                                                      color: "white",
                                                  }}
                                              >
                                                  DELETE
                                              </button>
                                          </div>
                                      </div>
                                  );
                              })
                            : filterCompanyData.map((item, index) => {
                                  const First = index === 0;
                                  const Last = index === filterHumanData.length - 1;
                                  return (
                                      <div
                                          key={index}
                                          style={{
                                              display: "flex",
                                              border: "1px solid #D0D0D0",
                                              justifyContent: "space-between",
                                              alignItems: "center",
                                              padding: "20px",
                                              backgroundColor:
                                                  index % 2 === 0
                                                      ? "#E9F5DB"
                                                      : "#CFE1B9",
                                              borderRadius: `${
                                                  First ? "20px 20px 0 0" : ""
                                              }${Last ? "0 0 20px 20px" : ""}`,
                                          }}
                                      >
                                          <div style={{ flex: "2" }}>
                                              <p
                                                  style={{
                                                      fontSize: "20px",
                                                      fontWeight: "medium",
                                                  }}
                                              >
                                                  {item.company_name}
                                              </p>
                                          </div>
                                          <div style={{ flex: "2" }}>
                                              <p
                                                  style={{
                                                      fontSize: "20px",
                                                      fontWeight: "medium",
                                                  }}
                                              >
                                                  {item.address}
                                              </p>
                                          </div>
                                          <div style={{ flex: "2" }}>
                                              <p
                                                  style={{
                                                      fontSize: "20px",
                                                      fontWeight: "medium",
                                                  }}
                                              >
                                                  {item.address_line2}
                                              </p>
                                          </div>
                                          <div style={{ flex: "1" }}>
                                              <Button>
                                                  <EditIcon fontSize="medium" />
                                              </Button>
                                          </div>
                                      </div>
                                  );
                              })}
                    </div>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#718355",
                            height: "70px",
                            overflow: "hidden",
                        }}
                    >
                        <Button
                            variant="contained"
                            sx={{
                                borderRadius: "25px",
                                backgroundColor: "#87986a",
                            }}
                        >
                            ADD
                        </Button>
                    </Box>
                </div>
            </Breakpoint>
               <Breakpoint medium down>
                    <div className="mobile-view">
                        <div
                            className="name"
                            style={{
                                backgroundColor: "#718355",
                                height: "70px",
                                color: "white",
                                padding: "20px 0px 0px 50px",
                            }}
                        ></div>
                        <div
                            className="searchbar-section"
                            style={{
                                backgroundColor: "#87986a",
                                height: "140px",
                                borderRadius: "0px 0px 30px 30px",
                                display: "flex",
                                flexDirection: "column",
                                textAlign: "center",
                                // gap: "25%",
                                flex: "1",
                            }}
                        >
                            <div className="title-text">
                                <p
                                    style={{
                                        fontSize: "20px",
                                        fontWeight: "bold",
                                        padding: "20px 0px 0px 50px",
                                        color: "white",
                                    }}
                                >
                                    Human Management
                                </p>
                            </div>
                            <div
                                className="search-bar"
                                style={{
                                    padding: "25px 0px 0px 0px",
                                    width: "100%",
                                    flex: "1",
                                    overflow: "visible",
                                }}
                            >
                                <input
                                    type="text"
                                    className="search-input"
                                    placeholder="Search"
                                    onChange={handleSearch}
                                    style={{
                                        height: "35px",
                                        minWidth: "150px",
                                        width: "70%",
                                        borderRadius: "25px",
                                        border: "2px solid",
                                        borderColor: "#C1C1C1",
                                        padding: "0px 10px",
                                        overflow: "hidden",
                                        flex: "1",
                                    }}
                                />
                            </div>
                        </div>
                        <div
                            className="card-section"
                            style={{
                                marginTop: "70px",
                                padding: "10px",
                                border: "1px solid black",
                                height: "500px",
                            }}
                        >
                            {filterHumanData.map((person, index) => (
                                <div
                                    style={{
                                        // border: "1px solid black",
                                        padding: "20px",
                                        backgroundColor:
                                            index % 2 === 0
                                                ? "#E9F5DB"
                                                : "#CFE1B9",
                                    }}
                                    key={index}
                                >
                                    <div>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <div>
                                                <h2
                                                    style={{
                                                        fontSize: "1rem",
                                                        margin: "0",
                                                    }}
                                                >
                                                    {person.lastName}{" "}
                                                    {person.prefix},{" "}
                                                    {person.firstName}{" "}
                                                    {person.middleName}{" "}
                                                    {person.suffix}
                                                </h2>
                                                <p
                                                    style={{
                                                        fontSize: "0.9em",
                                                        margin: "0",
                                                    }}
                                                >
                                                    {person.nickname}
                                                </p>
                                            </div>

                                            <div>
                                                <button
                                                    onClick={() =>
                                                        toggleDetails(index)
                                                    }
                                                >
                                                    {person.isOpen ? (
                                                        <ExpandLessIcon fontSize="medium" />
                                                    ) : (
                                                        <ExpandMoreIcon fontSize="medium" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        <hr style={{ margin: "10px 0" }} />
                                        {person.isOpen && (
                                            <>
                                                <div>
                                                    <p
                                                        style={{
                                                            fontSize: "0.9em",
                                                            margin: "0",
                                                        }}
                                                    >
                                                        {person.gender}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p
                                                        style={{
                                                            fontSize: "0.9em",
                                                            margin: "0",
                                                        }}
                                                    >
                                                        {/* {person.birthDate.toDateString()} */}
                                                        ,
                                                    </p>
                                                    <p
                                                        style={{
                                                            fontSize: "0.9em",
                                                            margin: "0",
                                                        }}
                                                    >
                                                        {person.age}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p
                                                        style={{
                                                            fontSize: "0.9em",
                                                            margin: "0",
                                                        }}
                                                    >
                                                        {
                                                            person.address
                                                                .buildingNumber
                                                        }
                                                        ,{" "}
                                                        {
                                                            person.address
                                                                .buildingName
                                                        }
                                                        ,{" "}
                                                        {person.address.street},{" "}
                                                        {person.address.city},{" "}
                                                        {
                                                            person.address
                                                                .province
                                                        }
                                                        ,
                                                        {person.address.country}
                                                        ,{" "}
                                                        {
                                                            person.address
                                                                .postalCode
                                                        }
                                                    </p>
                                                </div>
                                                <div
                                                    style={{
                                                        flex: "1",
                                                        textAlign: "center",
                                                        marginTop: "15px",
                                                    }}
                                                >
                                                    <button
                                                        style={{
                                                            backgroundColor:
                                                                "#97A97C",
                                                            width: "180px",
                                                            height: "25px",
                                                            border: "none",
                                                            fontWeight: "bold",
                                                            cursor: "pointer",
                                                            color: "white",
                                                        }}
                                                    >
                                                        <EditIcon fontSize="medium" />
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Breakpoint>
        </BreakpointProvider>
    );
}
