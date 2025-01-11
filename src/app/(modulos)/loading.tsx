import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';

export default function LoadingHome() {
  return (
    <div>
      <Flex align="center" gap="middle">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </Flex>
    </div>
  );
}
