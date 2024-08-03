import { expect } from 'chai';
import sinon from 'sinon';
import TextEntry from '../models/TextEntry.js';
import { createTextEntry, getTextEntries, detectDuplicates } from '../controllers/textController.js';

describe('Text Controller', () => {
    afterEach(() => {
        sinon.restore();
    });

    describe('createTextEntry', () => {
        it('should create a new text entry successfully', async () => {
            const req = {
                body: {
                    title: 'Test Title',
                    content: 'This is a test content.',
                    urls: ['http://example.com']
                }
            };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            const textEntries = [];
            sinon.stub(TextEntry, 'find').returns(Promise.resolve(textEntries));
            const saveStub = sinon.stub().resolves();
            sinon.stub(TextEntry.prototype, 'save').callsFake(saveStub);

            await createTextEntry(req, res);

            expect(res.status.calledWith(201)).to.be.true;
            expect(saveStub.calledOnce).to.be.true;
            expect(res.json.calledWithMatch({ title: 'Test Title', content: 'This is a test content.' })).to.be.true;
        });

        it('should return a 400 error for duplicate content', async () => {
            const req = {
                body: {
                    title: 'Test Title',
                    content: 'Duplicate content.',
                    urls: ['http://example.com']
                }
            };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            const existingEntry = { _id: '1', uuid: 'uuid1', title: 'Existing Title', content: 'Duplicate content.' };
            sinon.stub(TextEntry, 'find').resolves([existingEntry]);

            await createTextEntry(req, res);

            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWithMatch({ error: 'Duplicate content found' })).to.be.true;
        });

        it('should return a 500 error if there is a server error', async () => {
            const req = {
                body: {
                    title: 'Test Title',
                    content: 'This is a test content.',
                    urls: ['http://example.com']
                }
            };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            sinon.stub(TextEntry, 'find').throws(new Error('Database error')); // تقليد خطأ في قاعدة البيانات

            await createTextEntry(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWithMatch({ error: 'Database error' })).to.be.true;
        });
    });

    describe('getTextEntries', () => {
        it('should return all text entries', async () => {
            const req = {};
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            const entries = [{ title: 'Entry 1' }, { title: 'Entry 2' }];
            sinon.stub(TextEntry, 'find').resolves(entries);

            await getTextEntries(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(entries)).to.be.true;
        });

        it('should return a 500 error if there is a server error', async () => {
            const req = {};
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            sinon.stub(TextEntry, 'find').throws(new Error('Database error'));

            await getTextEntries(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWithMatch({ error: 'Database error' })).to.be.true;
        });
    });

    describe('detectDuplicates', () => {
        it('should return a 500 error if there is a server error', async () => {
            const req = {};
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            sinon.stub(TextEntry, 'find').throws(new Error('Database error'));

            await detectDuplicates(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWithMatch({ error: 'Database error' })).to.be.true;
        });
    });

});
