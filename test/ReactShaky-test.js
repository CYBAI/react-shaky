/* eslint-disable no-unused-vars */

import React from 'react';
import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow, mount, render } from 'enzyme';
import ReactShaky from '../src/index';

chai.use(chaiEnzyme());

describe('A suite', () => {
  it('contains textarea with an expectation', () => {
    expect(shallow(<ReactShaky
      children={`
        +----+  +----+
        |V8  |  |    |
        |   *+--+> JS|
        +----+  +----+
      `}
    />).find('textarea').length).to.equal(1);
  });

  it('contains canvas with an expectation', () => {
    expect(shallow(<ReactShaky
      children={`
        +----+  +----+
        |V8  |  |    |
        |   *+--+> JS|
        +----+  +----+
      `}
    />).find('canvas').length).to.equal(1);
  });

  it('contains id of react-shaky-wrapper with an expectation', () => {
    expect(shallow(<ReactShaky children="" />)
      .is('#react-shaky-wrapper'))
      .to.equal(true);
  });

  it('should simulate double-click events and change display styles', () => {
    const onDoubleClick = sinon.spy();
    const mounted = mount(
      <ReactShaky
        children={`
          +----+  +----+
          |V8  |  |    |
          |   *+--+> JS|
          +----+  +----+
        `}
        onDoubleClick={onDoubleClick}
      />
    );
    expect(mounted.find('textarea')).to.have.style('display', 'none');
    expect(mounted.find('canvas')).to.have.style('display', 'block');
    mounted.find('canvas').simulate('dblclick');
    expect(mounted.find('textarea')).to.have.style('display', 'block');
    expect(mounted.find('canvas')).to.have.style('display', 'none');
  });
});
