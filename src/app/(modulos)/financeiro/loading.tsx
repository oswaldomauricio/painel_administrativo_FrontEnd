import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';

export default function LoadingHome() {
  return (
    <div className='h-[720px] flex justify-center items-center'>
      <Flex align="center" justify='center' gap="middle">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 80 }} spin />} />
      </Flex>
    </div>
  );
}
