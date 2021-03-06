import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Preferences from './preferences';
import './PlanATrip.css';

const PlanATrip = ({ setClickedPage, currentUser }) => (
    <div>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          setClickedPage(
            <Preferences
              currentUser={currentUser}
              setClickedPage={setClickedPage}
            />,
          );
        }}
      >
        Plan A Trip
      </Button>
    </div>
);

PlanATrip.propTypes = {
  setClickedPage: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    profile_pic: PropTypes.string,
    host: PropTypes.bool,
    googleId: PropTypes.string,
  }).isRequired,
};

export default PlanATrip;
