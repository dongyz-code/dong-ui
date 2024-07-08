import React from 'react';
import Button from './Button';

export default function App() {
  function handleClick() {
    alert('Button clicked');
  }

  return (
    <>
      <div style={{ padding: '20px' }}>
        <Button onClick={handleClick}>Hello World</Button>
        <Button type={'primary'}>Hello World</Button>
        <Button type={'dashed'}>Hello World</Button>
        <Button type={'text'}>Hello World</Button>
        <Button type={'link'} href={'https://www.google.com'}>
          Hello World
        </Button>
      </div>
      <div style={{ padding: '20px' }}>
        <Button danger>Hello World</Button>
        <Button type={'primary'} danger>
          Hello World
        </Button>
        <Button type={'dashed'} danger>
          Hello World
        </Button>
        <Button type={'text'} danger>
          Hello World
        </Button>
        <Button type={'link'} danger>
          Hello World
        </Button>
      </div>

      <div style={{ padding: '20px' }}>
        <Button onClick={handleClick} disabled>
          Hello World
        </Button>
        <Button disabled type={'primary'}>
          Hello World
        </Button>
        <Button disabled type={'dashed'}>
          Hello World
        </Button>
        <Button disabled type={'text'}>
          Hello World
        </Button>
        <Button disabled type={'link'}>
          Hello World
        </Button>
      </div>

      <div style={{ padding: '20px' }}>
        <Button size={'small'}>Hello World</Button>
        <Button size={'medium'}>Hello World</Button>
        <Button size={'large'}>Hello World</Button>
      </div>

      <div style={{ padding: '20px' }}>
        <Button block>Hello World</Button>
      </div>

      <div style={{ padding: '20px' }}>
        <Button loading>Hello World</Button>
      </div>
    </>
  );
}
