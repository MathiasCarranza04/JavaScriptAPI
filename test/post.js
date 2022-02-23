import request from "../config/common";
import {expect} from "chai";
import { createRandomUser, createRandomUserWithFaker } from "../helper/user_helper";
//require('dotenv').config()

const faker = require('faker');

const Token = '4a5cedbe79b86bc4f09e74157dc4727b6a1b4f7e341eade34867f255a8dcc271';
//const Token = process.env.User_Token;  this way is not working

var postId, userId;

describe('USERS POSTS', () => {
    

    before(async () => {
      //  userId=await createRandomUser();
        userId=await createRandomUserWithFaker();
    });



        it('POST USERS', async () => {
            const data = {
                user_id: userId,  //in the json field user_id I pass my userId getted from the randomUser
                title: faker.lorem.sentence(),
                body: faker.lorem.sentence()
            }

            const postRes = await request
                .post('posts')
                .set("Authorization", `Bearer ${Token}`)
                .send(data)

            console.log(postRes.body)
            expect(postRes.body).to.deep.include(data); // in this way the check all the response result againt the sended data
            postId = postRes.body.id;
        });

        
         it('GET CASE', async () => {

             const getRequest= await request
            .get(`posts/${postId}`)
            .set("Authorization", `Bearer ${Token}`)
            console.log("Getting the body")
            console.log(getRequest.body)
            await expect(getRequest.status).to.equal(200);
            console.log("The exit code is : " + getRequest.status)


            
            
            
    });



})


describe('NEGATIVE TEST ', () => {

    it('401 Authentication Failed', async () => {

        const data = {
            user_id: userId,  //in the json field user_id I pass my userId getted from the randomUser
            title: "Post negative from Mathi",
            body: "Post negative body Mathi"
        }

        const postRes = await request
            .post('posts')
            .send(data)
            console.log("El response es " + postRes)
            await expect(postRes.status).to.equal(401);
            await expect(postRes.body.message).to.eq('Authentication failed');
            
        
    });





    //it will fail cuz im not sending the field body in the json
    it.only('422 Validation Failed', async () => {

        const data = {
            user_id: userId,  
            title: "Post negative from Mathi"        
          }

        const postRes = await request
            .post('posts')
            .set("Authorization", `Bearer ${Token}`)
            .send(data)
             console.log(postRes.body)
         //    console.log((postRes.body.data[2]))


            await expect(postRes.status).to.equal(422);
            await expect(postRes.body[2].field).to.eq('body'); //expecting that the body require is in the msg
            await expect(postRes.body[2].message).to.equal("can't be blank");

            console.log("The exit code is : " + postRes.status)
            
        
    });

})