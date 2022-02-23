import supertest from "supertest";
const request = supertest('https://gorest.co.in/public/v2/')



const faker = require('faker');
const Token = '4a5cedbe79b86bc4f09e74157dc4727b6a1b4f7e341eade34867f255a8dcc271';

export const createRandomUserWithFaker = async () => {

    const userData = {
        email: faker.internet.email(), 
        name: faker.name.firstName(),
        gender: "male",
        status: "inactive"

    };


    const res= await request
        .post('users')
        .set("Authorization", `Bearer ${Token}`)
        .send(userData)  
        console.log(res.body)    
        return res.body.id;
}






export const createRandomUser = async () => {

    const userData = {
        email: `MatiQA${Math.floor(Math.random()* 9999)}@gmail.com`, 
        name: "Mathias",
        gender: "male",
        status: "inactive"

    };


    const res= await request
        .post('users')
        .set("Authorization", `Bearer ${Token}`)
        .send(userData)      
        return res.body.id;
}