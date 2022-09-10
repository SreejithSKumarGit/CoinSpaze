import React from "react";  
import HomeStyles from "./Home.module.css";
import { Success } from "../../Components/SuccessCase/Success";
import { Unauthorised } from "../../Components/UnauthorizedCase/Unauthorised";
import { BadRequest } from "../../Components/BadRequestCase/BadRequest";
import { ServerError } from "../../Components/ServerErrorCase/ServerError";


export function Home()
{
    return(
        
        <div className={HomeStyles.Container}>
            <Success/>
            <Unauthorised/>
            <BadRequest/>
            <ServerError/>
        </div>  
    )
}