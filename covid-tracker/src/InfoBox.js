import React from 'react'
import "./InfoBox.css"
import {Card, CardContent, Typography} from "@material-ui/core";

function InfoBox({title, cases, total}) {
    return (
        <Card className="infoBox">
            <CardContent>
                {/* title */}
                <Typography className="info_box_title" color="textSecondary"></Typography>
                    {title}
                
                {/* number of cases */}
                    <h2 className="info_box_cases">{cases}</h2>

                {/* total */}
                   <Typography className="info_box_total" color="textSecondary"> {total} Total</Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox;
