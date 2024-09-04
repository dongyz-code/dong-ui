import React from 'react';
import Button from './Button';
import Input from './Input';
import Modal from './Modal';
import Calendar from './Calendar';
import { useMessage } from './Message/useMessage';
import ConfigProvider from './ConfigProvider';
import { Watermark } from './Watermark';

const Play = () => {
  const messageRef = useMessage();
  const [value, setValue] = React.useState('');
  function handleClick() {
    setOpen(true);
  }

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const [open, setOpen] = React.useState(false);

  return (
    <Watermark content={['yuzhong.dong']}>
      <div>
        <Button
          type={'primary'}
          onClick={() =>
            messageRef.add({
              content: 'Hello World',
              type: 'success',
            })
          }
        >
          Hello World
        </Button>
      </div>
      <div style={{ padding: '20px', width: '900px' }}>
        <Calendar />
      </div>

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
    </Watermark>
  );
};

export default function App() {
  return (
    <ConfigProvider>
      <Play />
    </ConfigProvider>
  );
}
