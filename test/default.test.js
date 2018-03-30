'use strict';

const expect = require('chai').expect,
  sinon = require('sinon'),
  File = require('vinyl'),
  proxyquire = require('proxyquire').noPreserveCache(),
  htmlclean = (htmlclean => {
    htmlclean['@noCallThru'] = true;
    return htmlclean;
  })(sinon.spy(content => `${content}<htmlclean>`)),
  plugin = proxyquire('../', {htmlclean});

function resetAll() {
  htmlclean.resetHistory();
}

function newFile(content, path) {
  return new File({
    // Check `allocUnsafe` to make sure of the new API.
    contents: Buffer.allocUnsafe && Buffer.from ? Buffer.from(content) : new Buffer(content),
    path
  });
}

describe('implements a basic flow as buffer based plugin', () => {
  const OPTS = {p1: 'v1', p2: 'v2'};

  it('should skip process if contents is null', done => {
    resetAll();
    const pluginStream = plugin(OPTS),
      passedFile = new File();
    expect(passedFile.isNull()).to.be.true;
    expect(passedFile.isStream()).to.be.false;
    expect(passedFile.isBuffer()).to.be.false;

    pluginStream.write(passedFile);
    pluginStream.once('data', file => {
      expect(file.isNull()).to.be.true;
      expect(file.isStream()).to.be.false;
      expect(file.isBuffer()).to.be.false;
      expect(htmlclean.notCalled).to.be.true;

      done();
    });
  });

  it('should throw an error if contents is a Stream', () => {
    resetAll();
    const stream = require('stream'),
      es = require('event-stream'),
      pluginStream = plugin(OPTS),
      passedFile = new File({
        contents: new stream.Readable({objectMode: true})
          .wrap(es.readArray(['stream', 'with', 'those', 'contents']))
      });
    expect(passedFile.isNull()).to.be.false;
    expect(passedFile.isStream()).to.be.true;
    expect(passedFile.isBuffer()).to.be.false;

    expect(() => { pluginStream.write(passedFile); }).to.throw('Streaming not supported');
    expect(htmlclean.notCalled).to.be.true;
  });

  it('should accept contents if it is a Buffer', done => {
    resetAll();
    const pluginStream = plugin(OPTS),
      passedFile = newFile('content');
    expect(passedFile.isNull()).to.be.false;
    expect(passedFile.isStream()).to.be.false;
    expect(passedFile.isBuffer()).to.be.true;

    pluginStream.write(passedFile);
    pluginStream.once('data', file => {
      expect(file.isNull()).to.be.false;
      expect(file.isStream()).to.be.false;
      expect(file.isBuffer()).to.be.true;
      expect(htmlclean.calledOnceWithExactly('content', OPTS)).to.be.true;
      expect(file.contents.toString()).to.equal('content<htmlclean>');

      done();
    });
  });

});
