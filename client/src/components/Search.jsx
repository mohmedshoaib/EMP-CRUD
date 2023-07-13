import React from "react";
import { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  styled,
  Button,
} from "@mui/material";
const SearchUser = () => {
  // const [user, setUsers] = useState([])

  // useEffect(() => {
  //     searchUsers();
  // }, []);

  // const searchUsers = async () => {
  //     let response = await searchUsers();
  //     setUsers(response.data);
  //     console.log(response.data)
  // }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell sx={{ fontWeight: "bold" }}>Id</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Address</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Phone</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {user.map((user) => (
          <TableRow key={user._id}>
            <TableCell>{user._id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.address}</TableCell>
            <TableCell>{user.phone}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SearchUser;
