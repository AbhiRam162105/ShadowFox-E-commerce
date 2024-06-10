import React, { useEffect, useState } from "react";
import { getUserDetails } from "../../../Context/UserDetails";
import { Link } from "react-router-dom";
import Account from "../Account";
import { Button } from "@mui/material";

const MyAccount = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userDetails = await getUserDetails();
      setUserDetails(userDetails);
    };

    fetchData();
  }, []);

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <Account>
      <div className="account__details__container">
        <div className="account__details">
          <div className="account__holder__name">
            <h6>Name: {userDetails.FirstName}</h6>
          </div>
          <div className="account__holder__email">
            Email: {userDetails.Email}
          </div>
          <div className="manage__account__action">
            <Button>
              <Link to="/account/manage">Manage account</Link>
            </Button>
          </div>
        </div>
      </div>
    </Account>
  );
};

export default MyAccount;
