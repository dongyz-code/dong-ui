import React from 'react';
import Button from './Button';
import Input from './Input';
import Modal from './Modal';

export default function App() {
  const [value, setValue] = React.useState('');
  function handleClick() {
    setOpen(true);
  }

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div>
        <Input value={value} disabled onChange={onInputChange} maxLength={10} placeholder="请输入"></Input>
        <Input
          value={value}
          autoFocus
          onChange={onInputChange}
          maxLength={10}
          size={'small'}
          placeholder="请输入"
        ></Input>
        <Input value={value} onChange={onInputChange} maxLength={10} size={'large'} placeholder="请输入"></Input>
      </div>
      <div style={{ padding: '20px' }}>
        <Button onClick={handleClick}>Hello World</Button>
        <Button type={'primary'}>Hello World</Button>
        <Button type={'dashed'}>Hello World</Button>
        <Button type={'text'}>Hello World</Button>
        <Button type={'link'} href={'https://www.google.com'} target={'_blank'}>
          Link
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

      <Modal open={open} onCancel={() => setOpen(false)} onOk={() => setOpen(false)} title="Basic Modal">
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
}
