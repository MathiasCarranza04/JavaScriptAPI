import supertest from "supertest";
import {
    expect
} from "chai";


const request = supertest('https://gorest.co.in/public/v2/')
const Token = '4a5cedbe79b86bc4f09e74157dc4727b6a1b4f7e341eade34867f255a8dcc271';

describe('Users ', () => {


    it('Get/Users', () => {

        return request.get(`users?access-token=${Token}`).then((res) => {
            console.log(res.body);
            expect(res.body.data).to.not.be.null;
        });
    });


    it('Get/Users2', (done) => {

        request.get(`users?access-token=${Token}`).end((err, res) => {
            console.log(res.body);
            expect(res.body.data).to.not.be.null;
            done();
        });
    });

    //getting user by the id 4069
    it('Get User by specific id', () => {

        return request.get(`users/4069?access-token=${Token}`).then((res) => {
            console.log(res.body);
            expect(res.body.id).to.be.eq(4069);
        });
    });


    //getting user by query parameter
    //this case doesn't work anymore u cannot concate page 5 plus gender female at the page

    it.skip('Get/Users with query parameters', () => {
        const url = `users?access-token=${Token}&page=5&gender=Female`

        return request.get(url).then((res) => {
            console.log(res.body);
            expect(res.body).to.not.be.null;
            res.body.forEach(data => {
                expect(data.gender).to.eq('Female')
            });

        });
    });






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
            //  expect(res.body.email).to.eq(data.email); //checking if the sended email is equal to the receive one
            //  expect(res.body.status).to.eq(data.status);
                expect(res.body).to.deep.include(data); // in this way the check all the response result againt the sended data
            });
        

    });


    it('PUT USERS', () => {

        const data= {
            
            email: `MatiQA${Math.floor(Math.random()* 9999)}@gmail.com`, //le genero al correo value random
            name: `Ramon - ${Math.floor(Math.random()* 9999)}`,
            gender: "male",
            status: "active"
                 
           }


        return request
        .put('users/5956') //updating the info in the user id 5956
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





    it('DELETE USERS', () => {

        return request
        .delete('users/4051') //delete  user id 4058
        .set("Authorization", `Bearer ${Token}`)
        .then (res => {
            console.log(res);
            expect(res.status).to.equal(204);
            
        }
            
            )
       
    });


});