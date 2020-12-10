import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

import './AddRecipe.css';

const AddRecipe = () => {

    return (


        <Link to="/add-recipe">
            <Button
                variant="contained"
                color="secondary"
                className="addRecipeBtn"
            >
                Add your recipe
          </Button>
        </Link>


    );
};

export default AddRecipe;
