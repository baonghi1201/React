import * as ActionTypes from './ActionTypes';
import {baseUrl} from '../shared/baseUrl';

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (dishId, rating, author, comment) => (dispatch)=> {
    const newComment ={
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    };
    
    newComment.date = new Date().toISOString();

    // To post the comments, we use 'return fetch()'
    return fetch(baseUrl + 'comments', {
        method:"POST",
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type':'application/json'
        },
        credentials:'same-origin'
    })
        .then(response=>{
            if (response.ok){
                return response;
            }else{
                var error = new Error ('Error ' + response.staus + ':' + response.statusText)
                error.response=response
                throw error;
            }
        }, 
        error =>{
            throw error;
        })
        .then(response => response.json())
        .then(response => dispatch(addComment(response)))
        .catch(error=>{console.log('Post comment', error.message);
            alert('You comment could not be posted\n Error' + error.message)});
            
};


//Fetch DISHES
export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')
        .then(response=>{
            if(response.ok){
                return response;
            }else {
                var error=new Error('Error ' + response.status + ":" + response.statusText)
                error.response=response
                throw error;
            }
        },
        // In case the client not receiving any signal from the Server 
        error=>{
            var errmes = new Error (error.mesaage);
            throw errmes;
        })
        .then(response=>response.json())
        .then(dishes=>dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));
}

export const dishesLoading = () => ({
    type:ActionTypes.DISHES_LOADING
});

export const dishesFailed = () => (errmes) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmes
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

// Fetch COMMENTS
export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
        .then(response=>{
            if(response.ok){
                return response;
            }else{
                var error = new Error ('Error ' + response.status + ":" + response.stausText)
                error.response = response
                throw error;
            }
        },
        error=>{
            var errmes = new Error (error.message)
            throw errmes;
        },
        error=>{
            var errmes= new Error(error.message)
            throw errmes;
        })
        .then(response=>response.json())
        .then(comments=>dispatch(addComments(comments)))
        .catch(error=>dispatch(commentFailed(error.message)));
}


export const commentFailed = () => (errmes) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmes
})

export const addComments=(comments) => ({
    type:ActionTypes.ADD_COMMENTS,
    payload:comments
})


// Fetch PROMOS
export const fetchPromos = () => (dispatch) =>{
    dispatch(promosLoading(true));
    
    return fetch(baseUrl + 'promotions')
        .then(response =>{
            if (response.ok){
                return response;
            } else {
                var error = new Error('Error ' + response.status + ":" + response.statusText)
                error.response=response
                throw error;
            }
        },
        error=>{
            var errmes = new Error(error.message)
            throw errmes;
        })
        .then(response => response.json())
        .then(promos=>dispatch(addPromos(promos)))
        .catch(error=>dispatch(promosFailed(error.message)));
}

export const promosLoading = () => ({
    type:ActionTypes.PROMOS_LOADING
})

export const promosFailed=() => (errmes) => ({
    type:ActionTypes.PROMOS_FAILED,
    payload:errmes
})

export const addPromos = () => (promos) => ({
    type:ActionTypes.ADD_PROMOS,
    payload:promos
})


//Fetch LEADERS
export const fetchLeaders = () => dispatch => {
  dispatch(leadersLoading());

  return fetch(baseUrl + "leaders")
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then(response => response.json())
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(error => dispatch(leadersFailed(error.message)));
};
export const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = errmess => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errmess
});

export const addLeaders = leaders => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders
});

// Fetch Feedback
export const postFeedback=(
    firstname, 
    lastname, 
    telnum, 
    email,
    agree,
    contactType,
    message
    ) => (dispatch) => {
        const newFeedback={
            firstname:firstname,
            lastname:lastname,
            telnum:telnum,
            email: email,
            agree: agree,
            contactType: contactType,
            message:message
        };
    
        // Post the feedback, using 'return fetch()'
        return fetch(baseUrl + "feedback", {
        method: "POST",
        body: JSON.stringify(newFeedback),
        headers: {
        "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(
        response => {
            if (response.ok) {
            return response;
            } else {
            var error = new Error(
                "Error " + response.status + ": " + response.statusText
            );
            error.response = response;
            throw error;
            }
        },
            error => {
                throw error;
            }
        )
        .then(response => response.json())
        .then(response =>
        alert("Thank you for your feedback!" + JSON.stringify(response))
        )
        .catch(error => {
        console.log("post feedbacks", error.message);
        alert("Your feedback could not be posted\nError: " + error.message);
        });
};