import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import './PlanetCard.css';
const AllPLanets = (props)=>{
    const element = props.planet;
        return (
            <div style={{fontSize:`${40 - 3*props.index}px`}} className="population-card">
                <Card>
                    <CardHeader
                        title={element.name}
                        subtitle={`Population = ${element.population}`}
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardText expandable={true}>
                        The terrain on this planet is {element.terrain}.
                        The rotation period of this planet is {element.rotation_period}.
                        The orbital period of this planet is {element.orbital_period}.
                        The gravity on this planet is {element.gravity}.
                        The diameter of this planet is {element.diameter}.
                    </CardText>
                </Card>
            </div>
        )

}


export default AllPLanets;