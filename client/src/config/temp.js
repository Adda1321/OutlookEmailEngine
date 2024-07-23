import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";

function Mails() {
  const [emails, setEmails] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const checkAuthentication = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/isAuthenticated",
        { withCredentials: true }
      );
      setIsAuthenticated(response.data.isAuthenticated);
    } catch (error) {
      console.error("Error checking authentication status:", error);
      navigate("/");
    }
  };

  const fetchEmails = async () => {
    try {
      const response = await fetch("http://localhost:3000/emails", {
        credentials: "include",
      });
      if (response.redirected) {
        navigate("/");
      } else if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      // Sort emails by creationDateTime before setting the state
      const sortedEmails = data.sort(
        (a, b) => new Date(b.datetime) - new Date(a.datetime)
      );
      setEmails(sortedEmails);
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  };

  const createAccount = async () => {
    try {
      const response = await axios.get("http://localhost:3000/createaccount", {
        headers: {
          user_id: user.sub,
        },
        withCredentials: true,
      });
      if (response.status === 201) {
        console.log("Account created successfully");
        sessionStorage.setItem("AccountCreationAttempted", "true");
      } else {
        console.error("Failed to create account", response);
      }
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  const handleRefresh = () => {
    fetchEmails();
  };

  useEffect(() => {
    checkAuthentication();
  }, [navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchEmails();
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const handleUserAndAccountCreation = async () => {
      if (isAuthenticated) {
        await createAccount();
      }
    };

    handleUserAndAccountCreation();
  }, [isAuthenticated]);

  return (
    <div>
      <h1>Mails</h1>
      <Button variant="contained" onClick={handleRefresh}>
        Refresh
      </Button>
      <table
        style={{ borderCollapse: "collapse", width: "100%", marginTop: 50 }}
      >
        <thead>
          <tr>
            <th
              style={{
                border: "1px solid #dddddd",
                textAlign: "left",
                padding: "8px",
                backgroundColor: "#f2f2f2",
              }}
            >
              Subject
            </th>
            <th
              style={{
                border: "1px solid #dddddd",
                textAlign: "left",
                padding: "8px",
                backgroundColor: "#f2f2f2",
              }}
            >
              Body Preview
            </th>
            <th
              style={{
                border: "1px solid #dddddd",
                textAlign: "left",
                padding: "8px",
                backgroundColor: "#f2f2f2",
              }}
            >
              Is Read
            </th>
          </tr>
        </thead>
        <tbody>
          {emails.map((email, index) => (
            <tr key={index}>
              <td
                style={{
                  border: "1px solid #dddddd",
                  textAlign: "left",
                  padding: "8px",
                }}
              >
                {email.subject}
              </td>
              <td
                style={{
                  border: "1px solid #dddddd",
                  textAlign: "left",
                  padding: "8px",
                }}
              >
                {email.body}
              </td>
              <td
                style={{
                  border: "1px solid #dddddd",
                  textAlign: "left",
                  padding: "8px",
                }}
              >
                {email.isRead ? "Yes" : "No"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Mails;
