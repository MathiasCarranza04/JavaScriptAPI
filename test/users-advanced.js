import supertest from "supertest";
import {
    expect
} from "chai";


const request = supertest('https://gorest.co.in/public/v2/')
const Token = '4a5cedbe79b86bc4f09e74157dc4727b6a1b4f7e341eade34867f255a8dcc271';

describe('Users API TEST', () => {
let userId;

    describe('POST USERS', () => {

        it('Post/Users', () => {

            const data= {
                
             email: `MatiQA${Math.floor(Math.random()* 9999)}@gmail.com`, //le genero al correo value random
             name: "Mathias",
             gender: "male",
             status: "inactive"
                  
            }
            
            return request
            .post('users')
            .set("Authorization", `Bearer ${Token}`)
            .send(data)
            .then(res =>
    
                {
                  console.log(res.body);
                  expect(res.body).to.deep.include(data); // in this way the check all the response result againt the sended data
                  userId=res.body.id;
                  console.log(userId);
                });
            
    
        });



    })

    
    describe('GET USERS', () => {

        it('Get/Users', () => {

            return request.get(`users?access-token=${Token}`).then((res) => {
                console.log(res.body);
                expect(res.body).to.not.be.null;
            });
        });
    
     
        //getting user created in the Post part
        it('Get User created in the Post section', () => {
    
            return request.get(`users/${userId}?access-token=${Token}`).then((res) => {
                console.log(res.body);
                expect(res.body.id).to.be.eq(userId);
            });
        });
    

    })


   





    describe('PUT USERS', () => {


      it('PUT USERS', () => {

        const data= {
            
            email: `MatiQA${Math.floor(Math.random()* 9999)}@gmail.com`, //updated email with random value
            name: `Ramon - ${Math.floor(Math.random()* 9999)}`,
            gender: "male",
            status: "active"
                 
           }


        return request
        .put(`users/${userId}`) //updating the info in the user id 5956
        .set("Authorization", `Bearer ${Token}`)
        .send(data)
        .then (res => {
            console.log(res.body);
            console.log(res.status);
            expect(res.body).to.deep.include(data);
            expect(res.status).to.equal(200);
            
        }
            
            )
       
       });

    })




    describe('DELETE USERS', () => {

     it('DELETE USERS', () => {

        return request
        .delete(`users/${userId}`) //delete user using the id created in post section
        .set("Authorization", `Bearer ${Token}`)
        .then (res => {
            expect(res.status).to.equal(204);   
            console.log("Delete Id: " + userId);      
        }
            
            )
       
     });
    
    })










});