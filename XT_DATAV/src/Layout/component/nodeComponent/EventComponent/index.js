import React, { useState, useMemo } from 'react';
import { Button, Collapse, Select, Col, Form, Input, message } from 'antd';
import { useCallback } from 'react';
import './index.css';
import { useEffect } from 'react';
import {CopyFilled} from "@ant-design/icons";
const { TextArea } = Input;
const { Panel } = Collapse;
const Page = ({
  onEventValueChange,
  canvasData
}) => {

  const [form] = Form.useForm();
  const [eventData, setEventData] = useState(canvasData.node.events);

  useEffect(() => {
    setEventData(canvasData.node.events);
  }, [canvasData])

  /**
   * 新增事件
   */

  const onHandleAddEventListener = () => {
    const arr = [...eventData];
    arr.push({ type: '0', action: '0' });
    setEventData(arr);
    console.log('eventData', eventData);
  };

  const onHandleEventTypeChange = (e, idx) => {
    const data = [...eventData];
    data[idx].type = e;
    // resetFields();
    setEventData(data);
  };

  const onHandleSelectEvent = (e, idx) => {
    const data = [...eventData];
    data[idx].action = e;
    // resetFields();
    setEventData(data);
  };

  /**
   * 渲染自定义事件表单入口
   */
  const onFinish = () => {
    message.success('Submit success!');
  };

  const onFinishFailed = () => {
    message.error('Submit failed!');
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const renderFontForm = (item, idx) => {
    return (
      <Form form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
      >
        <Col span={24}>
          <Form.Item label="事件类型" name={`eventType${idx}`}>
              <Select
                placeholder="请选择事件类型"
                onSelect={(value) => onHandleEventTypeChange(value, idx)}
              >
                <Select.Option value="0">单击</Select.Option>
                <Select.Option value="1">双击</Select.Option>
                <Select.Option value="2">webSocket事件</Select.Option>
                <Select.Option value="3">MQTT</Select.Option>
              </Select>
          </Form.Item>
        </Col>
        {renderFormByEventType(item, idx)}
        <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
        </Form.Item>
      </Form>
    );
  };

  /**
   * 根据事件类型渲染事件行为表单
   */

  const renderFormByEventType = (item, idx) => {
    const renderCommonForm = () => {
      return (
        <>
          <Col span={24}>
            <Form.Item label="事件行为" name={`event${idx}`}>
                <Select
                  placeholder="请选择事件行为"
                  onSelect={(value) => onHandleSelectEvent(value, idx)}
                >
                  <Select.Option value="0">跳转链接</Select.Option>
                  <Select.Option value="1">执行动画</Select.Option>
                  <Select.Option value="2">执行函数</Select.Option>
                  <Select.Option value="3">执行window下的全局函数</Select.Option>
                  <Select.Option value="4">更新属性数据</Select.Option>
                </Select>
            </Form.Item>
          </Col>
          {renderFormByEvent(item, idx)}
        </>
      );
    };

    switch (item.type) {
      case '0':
      case '1':
        return renderCommonForm();
      case '2':
        return (
          <>
            <Col span={24}>
              {
                <Form.Item label="消息名" name={`name${idx}`}>
                  <Input placeholder="请输入自定义消息名" />
                </Form.Item>
              }
            </Col>
            {renderCommonForm()}
          </>
        );
      case '3':
        return (
          <>
            <Form.Item label="Topic" name={`name${idx}`}>
              <Col span={24}>
                <Input placeholder="请输入Topic/subtopic" />
              </Col>
            </Form.Item>
            {renderCommonForm()}
          </>
        );
      default:
        break;
    }
  };

  /**
   * 根据事件行为生成不同的表单
   */

  const renderFormByEvent = (item, idx) => {
    switch (item.action) {
      case '0':
        return (
          <>
            <Col span={24}>
              <Form.Item label="链接地址" name={`code${idx}`}>
                  <Input
                    placeholder="请输入链接地址"
                    onChange={(e) => onHandleCodeChange(e, idx)}
                    rules={[
                      { required: true },
                      { type: 'url', warningOnly: true },
                      { type: 'string', min: 6 },
                    ]}
                  />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="参数值" name={`params${idx}`}>
                <Input placeholder="_black" />
              </Form.Item>
            </Col>
          </>
        );
      case '2':
        return (
          <Col span={24}>
            <Form.Item label="自定义代码" name={`code${idx}`}>
                <TextArea
                  placeholder="请输入自定义代码"
                  onChange={(e) => onHandleCodeChange(e, idx)}
                  rows={10}
                />
            </Form.Item>
          </Col>
        );
      default:
        break;
    }
  };

  /**
   * value值的变化, 通知canvas更新画布的数据
   */

  const onHandleCodeChange = (e, idx) => {
    console.log(e,idx);
    // form.validateFields((err, value) => {
    //   if (err) return;
    //   eventData[idx] = {
    //     type: null,
    //     action: null,
    //     value: null
    //   };
    //   eventData[idx].type = +value[`eventType${idx}`];
    //   eventData[idx].action = +value[`event${idx}`];
    //   eventData[idx].value = e.target.value;
    //   eventData[idx].params = value[`params${idx}`] || '';
    //   onEventValueChange(eventData);
    // });
    console.log(`code${idx}`);
    const values = form.validateFields([`code${idx}`]);
    console.log('--------');
    console.log(values);
    console.log(values[`code${idx}`]);
  };

  /**
   * 删除自定义事件
   */

  const onHandleDeleteItem = useCallback(
    (idx) => {
      const data = [...eventData];
      delete data[idx];
      // resetFields();
      setEventData(data.filter(Boolean));
    },
    [eventData]
  );

  /**
   * 渲染事件列表
   */

  const renderPanel = useMemo(() => {
    if (eventData.length < 1) return;
    return (
      <Collapse>
        {eventData
          .map((item) => ({ ...item, action: String(item.action), type: String(item.type) }))
          .map((item, index) => (
            <Panel
              header={
                <div>
                  {`自定义事件${index + 1}`}{' '}
                  <CopyFilled style={{ fontSize: '16px', color: '#08c' }}/>
                </div>
              }
              key={index}
            >
              {renderFontForm(item, index)}
            </Panel>
          ))}
      </Collapse>
    );
  }, [eventData, renderFontForm, onHandleDeleteItem]);

  return (
    <div>
      <Button type="primary" className="event-button" onClick={onHandleAddEventListener}>
        新增事件
      </Button>
      {renderPanel}
    </div>
  );
};

export default Page;
