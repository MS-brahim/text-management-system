import { expect } from 'chai';
import sinon from 'sinon';
import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';
import { login, register } from '../controllers/authController.js';

describe('Auth Controller', () => {
    afterEach(() => {
        sinon.restore(); // Restore all stubs after each test
    });

    describe('register', () => {
        it('should register a new user successfully', async () => {
            const req = {
                body: {
                    email: "user@example.com",
                    password: "123456"
                }
            };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub().returnsThis()
            };

            sinon.stub(User, 'findOne').resolves(null); // Simulate no existing user
            const saveStub = sinon.stub().resolves();
            sinon.stub(User.prototype, 'save').callsFake(saveStub);

            await register(req, res);

            expect(res.status.calledWith(201)).to.be.true;
            expect(saveStub.calledOnce).to.be.true;
            expect(res.json.calledWithMatch({ message: 'User registered successfully' })).to.be.true;
        });

        it('should return an error if user already exists', async () => {
            const req = {
                body: {
                    email: "user@example.com",
                    password: "123456"
                }
            };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub().returnsThis()
            };

            const existingUser = { email: "user@example.com" };
            sinon.stub(User, 'findOne').resolves(existingUser); // Simulate existing user

            await register(req, res);

            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWithMatch({ error: 'User already exists' })).to.be.true;
        });

        it('should return an error if registration fails', async () => {
            const req = {
                body: {
                    email: "user@example.com",
                    password: "123456"
                }
            };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub().returnsThis()
            };

            sinon.stub(User, 'findOne').resolves(null); // Simulate no existing user
            const saveStub = sinon.stub().throws(new Error('Database error'));
            sinon.stub(User.prototype, 'save').callsFake(saveStub);

            await register(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWithMatch({ error: 'Database error' })).to.be.true;
        });
    });

    describe('login', () => {
        
        it('should return an error if user not found', async () => {
            const req = {
                body: {
                    email: "user@example.com",
                    password: "123456"
                }
            };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub().returnsThis()
            };

            sinon.stub(User, 'findOne').resolves(null);

            await login(req, res);

            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWithMatch({ error: 'User not found' })).to.be.true;
        });

        it('should return an error if password is invalid', async () => {
            const req = {
                body: {
                    email: "user@example.com",
                    password: "wrongpassword"
                }
            };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub().returnsThis()
            };

            const user = {
                email: "user@example.com",
                comparePassword: sinon.stub().resolves(false)
            };

            sinon.stub(User, 'findOne').resolves(user);

            await login(req, res);

            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWithMatch({ error: 'Invalid password' })).to.be.true;
        });

        it('should return an error if login fails', async () => {
            const req = {
                body: {
                    email: "user@example.com",
                    password: "123456"
                }
            };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub().returnsThis()
            };

            sinon.stub(User, 'findOne').throws(new Error('Database error'));

            await login(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWithMatch({ error: 'Database error' })).to.be.true;
        });
    });
});
