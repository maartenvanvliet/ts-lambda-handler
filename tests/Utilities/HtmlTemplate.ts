import {} from 'jasmine';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as Lib from '../../src/index';
import * as Lambda from 'aws-lambda';
import { Buffer } from 'buffer';


chai.use(chaiAsPromised);

const assert = chai.assert;
const simpleStr = 'hello world!';
const injectStr = 'foo {{foo}}';
const partialKey = 'myPartial';
const includePartial = 'Partial content is {{> ' + partialKey + '}}';


describe('Utilities.HtmlTemplate', () => {
    let template: Lib.Utilities.HtmlTemplate;

    it('test chai promise', () => {
        return assert.eventually.equal(Promise.resolve(2 + 2), 4, 'This had better be true, eventually');
    });

    it('setTemplateString', () => {
        template = new Lib.Utilities.HtmlTemplate();


        return template
            .setTemplateString(simpleStr)
            .render()
            .then((str) => {assert.equal(str, simpleStr)});
    });

    it('setPartialString', () => {
        template = new Lib.Utilities.HtmlTemplate();
        return template
            .setTemplateString(includePartial)
            .setPartialString(partialKey, simpleStr)
            .render()
            .then((str) => {assert.equal(str, "Partial content is " + simpleStr)});
    });

    it('setTemplate', () => {
        template = new Lib.Utilities.HtmlTemplate();
        return template
            .setTemplate('tests/assets/simpleTemplate.html')
            .render({name: 'bob'})
            .then((str) => {
                assert.equal(str, "Hello bob.\n" )
            });
    });

    it('setPartial', () => {
        template = new Lib.Utilities.HtmlTemplate();
        return template
            .setTemplateString(includePartial)
            .setPartial(partialKey, 'tests/assets/simpleTemplate.html')
            .render({name: 'bob'})
            .then((str) => {assert.equal(str, "Partial content is Hello bob.\n")});
    });

    it('inject', () => {
        template = new Lib.Utilities.HtmlTemplate();
        return template
            .setTemplateString(injectStr)
            .inject('foo', 'bar')
            .render()
            .then((str) => {assert.equal(str, 'foo bar')});
    });

    it('render with invalid file', () => {
        template = new Lib.Utilities.HtmlTemplate();
        return template
            // .setTemplate('src/test/assets/simpleTemplate.html')
            .setTemplate('nothingness.txt')
            .render()
            .then((str) => { assert(false, "Should not resolve with invalid file") })
            .catch((error) => {
                if (error.code != 'ENOENT') {
                    throw error;
                }
            });
    });

    it('render with data', () => {
        template = new Lib.Utilities.HtmlTemplate();
        return template
            .setTemplateString(injectStr)
            .inject('foo', 'bar')
            .render({foo: 'BAR'})
            .then((str) => {assert.equal(str, 'foo BAR')});
    });

});
