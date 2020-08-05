import React, {Component} from 'react';
import {Card, CardBody, CardImg, CardText, CardTitle} from 'reactstrap';

class Dishdetail extends Component{
    renderComments(comments){
        if (comments == null){
            return (<div></div>)
        }               
            const cmts = comments.map((comment)=>{
                return(
                    <li key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>--{comment.author}, 
                        &nbsp;
                        {new Intl.DateTimeFormat('en-US',{
                            year:'numeric',
                            month:'long',
                            day:'2-digit'
                        }).format(new Date(comment.date))}
                        </p>
                    </li>
                )       
            })
                
        return(
            <div className='col-12 col-md-5 m-1'>
                <h2>Comments</h2>
                <ul className='list-unstyled'>
                    {cmts}
                </ul>
            </div>
        )
    }

    renderDish(dish){
        if (dish !=null){
            return(
                <div className='col-12 col-md-5 m-1'>
                    <Card>
                        <CardImg width="100%" src={dish.image}alt={dish.name}/>
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            )
        }
        else{
            return(<div></div>)
        }
    }

    render(){
        const dish=this.props.dish
        if (dish==null){
            return(<div></div>)
        }

        const dishItem=this.renderDish(dish)
        const dishComment=this.renderComments(dish.comments)
        
        return(
            <div className='row'>
                {dishItem}
                {dishComment}
            </div>
        )

    }
}

export default Dishdetail;