import React from 'react';
import { Form, Row, Col, InputNumber, Button } from 'antd';
import { layout } from '@topology/layout';
import { canvas } from '../../../index';
const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 15 }
};
const Layout = ({ form: { getFieldDecorator, validateFields } }) => {

  const startLayout = () => {
    validateFields((err, value) => {
      if(err) return;
      if(canvas) {
        layout(canvas.data.pens, value);
        canvas.updateProps(true, canvas.data.pens);
      }
    });
  }

  return (
    <Form {...formLayout} style={{ margin: '10px 10px' }}>
      <Row>
        <Col span={24}>
          <Form.Item label="最大宽度" name="maxWidth">
            <InputNumber style={{ width: '100%' }} min={0} placeholder="请输入最大宽度" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="节点宽度" name="nodeWidth">
            <InputNumber style={{ width: '100%' }} min={0} placeholder="请输入节点宽度" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="节点高度" name="nodeHeight">
            <InputNumber style={{ width: '100%' }} min={0} placeholder="请输入节点高度" />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item label="水平个数" name="maxCount">
            <InputNumber style={{ width: '100%' }} min={0} placeholder="请输入水平个数" />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item label="水平间距" name="spaceWidth">
            <InputNumber style={{ width: '100%' }} min={0} placeholder="请输入水平间距" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="垂直间距" name="spaceHeight">
            <InputNumber style={{ width: '100%' }} min={0} placeholder="请输入垂直间距" />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Button
            type="primary"
            style={{ marginLeft: 22, width: 245 }}
            onClick={() => startLayout()}
          >
            开始排版
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Layout;
