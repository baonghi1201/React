import React, {Component} from 'react';
import {Card, CardBody, CardImg, CardText, CardTitle, BreadcrumbItem, Breadcrumb, Button,
    Row, Col, Label, Modal, ModalHeader, ModalBody,} from 'reactstrap';
import { Control, LocalForm, Errors } from "react-redux-form";
import {Link} from 'react-router-dom';

const required = val => val && val.length;
const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };
    
    this.toggleModal=this.toggleModal.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
}


toggleModal(){
    this.setState({
        isModalOpen:!this.state.isModalOpen
    })
}

handleSubmit(values){
    this.toggleModal();
    this.props.postComment(
        this.props.dishId,
        values.rating,
        values.author,
        values.comment,
    )
}

render(){
    return(
        <div>
            <Button onClick={this.toggleModal}>
                <span className='fa fa-pencil'>Submit Comment</span>
            </Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={this.handleSubmit}>
                        <Row className='form-group'>
                            <Label htmlfor='rating' md={12}>Rating</Label>
                            <Col md={{size:12}}>
                                <Control.select model='.rating' name='rating' className='form-control'>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Col>
                        </Row>

                        <Row className='form-group'>
                            <Label htmlFor='author' md={12}>Your Name</Label>
                            <Col md={{size:12}}>
                                <Control.text model='.author' 
                                    id='author' 
                                    name='author' 
                                    placeholder='Your Name' 
                                    className='form-control'
                                    validators={{required, minLength:minLength(3), maxLength:maxLength(15)}}/>
                                    <Errors className="text-danger"
                                            model=".author"
                                            show="touched"
                                            messages={{
                                                required:'Required', 
                                                minLength: "Must be greater than 2 characters",
                                                maxLength: "Must be 15 characters or less"
                                            }}/>
                            </Col>
                        </Row>

                        <Row className='form-group'>
                            <Label htmlFor='Comment'>Comment</Label>
                            <Col md={{size:12}}>
                                <Control.textarea model='.comment'
                                    id='comment'
                                    name='comment'
                                    placeholder='comment'
                                    className='form-control'/>
                            </Col>
                        </Row>

                        <Button type='submit' value='submit' color='primary'>Submit</Button>
                    </LocalForm>
                </ModalBody>
            </Modal>
        </div>
    )
    }
}
    
function RenderComments({comments, postComment, dishId}){
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
                     
                );       
            })
                
        return(
            <div className='col-12 col-md-5 m-1'>
                    <h2>Comments</h2>
                    <ul className='list-unstyled'>
                        {cmts}
                    </ul>
            <CommentForm dishId={dishId} postComment={postComment}/>
            </div>
            
        )
    }

    function RenderDish({dish}){
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

    const Dishdetail = (props) => {
        const dish=props.dish
        if (dish==null){
            return(<div></div>)
        }
       
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">                   
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.comments}
                                    postComment={props.comments} 
                                    dishId={props.dish.id}/>               
                </div>
            </div>
        )

    }
        


export default Dishdetail;