import React from 'react';
import {Card, CardBody, CardImg, CardImgOverlay, CardText, CardTitle, CardHeader} from 'reactstrap';
 
    function RenderMenuItem({dish, onClick}){
        return(
            <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name}/>
            <CardImgOverlay>
                <CardTitle heading>{dish.name}</CardTitle>
            </CardImgOverlay>
            </Card>
        );
    }

    const Menu = (props) => {
        const menu = props.dishes.map((dish) => {
            return (
                < div  className="col-12 col-md-5 m-1">
                  <RenderMenuItem dish={dish} onClick={props.onClick}/>
                </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
                
            </div>
        );
    }
    

        
        
    export default Menu;