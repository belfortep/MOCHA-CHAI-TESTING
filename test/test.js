const chai = require('chai');
const chaiHttp = require('chai-http');
const res = require('express/lib/response');
const { response } = require('../index');
const server = require('../index');

chai.should();

chai.use(chaiHttp);

describe('Something API', ()=>{

    //TEST GET

    describe('GET /', ()=>{
        it('Get an array', (done)=>{
            chai.request(server)
                .get('/')
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eq(5);
                done();

                })
        })
        it('Get an 404 error', (done)=>{
            chai.request(server)
                .get('/api/something')
                .end((err,res) => {
                    res.should.have.status(404);
                done();

                })
        })
    })

    //TEST GET BY ID

    describe('GET /:id', ()=>{
        const id = 0;
        it('Get an element of the array', (done)=>{
            chai.request(server)
            .get('/' + id)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('string');
            done();
            })
        })
    })

    //TEST POST

    describe('POST /', ()=>{
        it('Create an element at the end of the array', (done)=>{
            const element =  {
                text : "working!!"
            }
            chai.request(server)
                .post('/')
                .send(element)
                .end((err,res)=>{
                    res.should.have.status(201)
                    res.body.should.be.a('array')
                    res.body.length.should.be.eq(6);
                done()
                })
        })
        it('Not create an element at the end of the array', (done)=>{
            const element =  {
                badProperty : ">:c"
            }
            chai.request(server)
                .post('/')
                .send(element)
                .end((err,res)=>{
                    res.should.have.status(500)
                done()
                })
        })
    })

    //TEST PUT

    describe('PUT /:id', ()=>{
        const id = 0;
        it('Change an element of the array', (done)=>{
            const element = {
                text : 'hi'
            }
            chai.request(server)
            .put('/' + id)
            .send(element)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body[0].should.be.eq('hi');
            done();
            })
        })
    })

    //TEST DELETE

    describe('DELETE /:id', ()=>{
        const id = 0;
        it('Delete last element of array', (done)=>{
            chai.request(server)
            .delete('/' + id)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eq(5);
            done();
            })
        })
    })

})