import React, { useMemo, useEffect} from 'react';
import { Form, InputNumber, Tabs, Collapse, Row, Col, Input, Select, Tag, Slider, Checkbox } from 'antd';
import AnimateComponent from './AnimateComponent';
import EventComponent from './EventComponent';
import ReactComponent from './ReactComponent';
import HttpComponent from './HttpComponent';

import './index.css';
import ColorPicker from "../../../components/ColorPicker";
import IconChoice from "../../../components/IconChoice";
const { Panel } = Collapse;
const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;
const CanvasProps = ({
  data,
  onEventValueChange,
  onUpdateComponentProps,
  onUpdateHttpProps,
  onFormValueChange,
}, ref) => {
  const [form] = Form.useForm();
  const { x, y, width, height } = data?.node?.rect || {};
  const {
    rotate,
    lineWidth,
    strokeStyle,
    dash,
    text,
    id,
    fontColor,
    icon,
    fontSize = 12,
    fontFamily,
    borderRadius,
    iconColor,
    iconSize,
  } = data?.node || {};
  const extraFields = data.node.data; // 用户自定义数据片段

  useEffect(()=>{
    form.setFieldsValue({
      x:data.node.rect.x,
      y:data.node.rect.y,
      dash: data.node.dash,
      fontColor: data.node.fontColor,
      fontFamily: data.node.fontFamily,
      fontSize: data.node.fontSize,
      height: data.node.rect.height,
      lineWidth: data.node.lineWidth,
      rotate: data.node.rotate,
      strokeStyle: data.node.strokeStyle,
      text: data.node.text,
      width: data.node.rect.width,
      borderRadius: data.node.borderRadius,
      icon: data.node.icon,
      iconColor: data.node.iconColor,
      iconSize,
    })
  },[data.node])


  const handleValuesChange=(changedValues, allValues)=>{
      if(data.node.name === 'echarts') {
        data.node.data.echarts.option.seriesFunction = changedValues.data;
        onFormValueChange(data.node);
        return;
      }
    console.log(allValues);
      onFormValueChange(allValues);
  }

  /**
   * 渲染位置和大小的表单
   */

  const renderForm = useMemo(() => {
    return (
      <Form form={form} onValuesChange={handleValuesChange}>
        <Row>
          <Col span={12}>
            <Form.Item label="X(px)" name="x">
             <InputNumber />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Y(px)" name="y">
             <InputNumber />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="宽(px)" name="width">
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="高(px)" name="height">
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="旋转(deg)" name="rotate">
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="圆角(deg)" name="borderRadius">
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="内边距(左)" name="paddingLeft">
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="内边距(上)" name="paddingTop">
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="内边距(右)" name="paddingRight">
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="内边距(下)" name="paddingBottom">
              <InputNumber />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }, [x, y, width, height, rotate, borderRadius]);

  /**
   * 渲染样式的表单
   */
  const handleColorChange = ({ hex }) => console.log(hex)
  const renderStyleForm = useMemo(() => {
    return (
      <Form form={form} onValuesChange={handleValuesChange}>
        <Row>
          <Col span={24}>
            <Form.Item label="线条样式" name="dash">
                <Select style={{ width: '95%' }}>
                  <Option value={0}>_________</Option>
                  <Option value={1}>---------</Option>
                  <Option value={2}>_ _ _ _ _</Option>
                  <Option value={3}>- . - . - .</Option>
                </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="线条宽度" name="lineWidth">
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Col span={24}>
          <Form.Item label="末端样式" name="dash">
            <Select style={{ width: '95%' }}>
              <Option value={0}>默认</Option>
              <Option value={1}>圆形</Option>
              <Option value={2}>方形</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="线条渐变" name="dash">
            <Select style={{ width: '95%' }}>
              <Option value={0}>无</Option>
              <Option value={1}>线性渐变</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="线条颜色" name="strokeStyle">
            <ColorPicker />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="开始颜色" name="strokeStyle">
            <ColorPicker />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="结束颜色" name="strokeStyle">
            <ColorPicker />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="背景" name="dash">
            <Select style={{ width: '95%' }}>
              <Option value={0}>纯色背景</Option>
              <Option value={1}>线性渐变</Option>
              <Option value={2}>径向渐变</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="背景颜色" name="strokeStyle">
            <ColorPicker />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="开始颜色" name="strokeStyle">
            <ColorPicker />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="结束颜色" name="strokeStyle">
            <ColorPicker />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="渐变角度" name="lineWidth">
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="渐变半径" name="lineWidth">
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="slider" label="透明度">
            <Slider />
          </Form.Item>
        </Col>
      </Form>
    );
  }, [lineWidth, strokeStyle, dash]);

  /**
   * 渲染字体的表单
   */

  const renderFontForm = useMemo(() => {
    return (
      <Form form={form} onValuesChange={handleValuesChange}>
        <Col span={24}>
          <Form.Item label="字体名字" name="fontFamily">
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="字体大小" name="fontSize">
            <InputNumber />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="文字颜色" name="fontColor">
            <ColorPicker />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="文字背景" name="textBackground">
            <ColorPicker />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="文字倾斜" name="fontStyle">
            <Select>
              <Option value={0}>正常</Option>
              <Option value={1}>倾斜</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="文字加粗" name="fontWeight">
            <Select>
              <Option value={0}>正常</Option>
              <Option value={1}>倾斜</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="水平对齐" name="textAlign">
            <Select>
              <Option value={0}>正常</Option>
              <Option value={1}>倾斜</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="垂直对齐" name="textBaseline">
            <Select>
              <Option value={0}>正常</Option>
              <Option value={1}>倾斜</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="行高" name="lineHeight">
            <InputNumber />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="最大行数" name="textMaxLine">
            <InputNumber />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="换行" name="dash">
            <Select>
              <Option value={0}>默认</Option>
              <Option value={1}>不换行</Option>
              <Option value={2}>回车换行</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="水平偏移" name="textOffsetX">
            <InputNumber />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="垂直偏移" name="textOffsetY">
            <InputNumber />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="文本内容" name="text">
            <TextArea />
          </Form.Item>
        </Col>
      </Form>
    );
  }, [fontColor, fontFamily, fontSize, text]);

  /**
   * 渲染元素图片
   *
   */
  const renderImageForm = useMemo(()=>{
    return (
      <Form form={form}>
        <Col span={24}>
          <Form.Item label="图片地址" name="text">
            <TextArea />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="宽度" name="textOffsetX">
            <InputNumber />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="高度" name="textOffsetX">
            <InputNumber />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="保存比例" name="textOffsetX">
            <Checkbox value="A" style={{ lineHeight: '32px' }}>
              A
            </Checkbox>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="对齐方式" name="dash">
            <Select style={{ width: '95%' }}>
              <Option value={0}>居中</Option>
              <Option value={1}>上</Option>
              <Option value={2}>下</Option>
              <Option value={3}>左</Option>
              <Option value={4}>右</Option>
              <Option value={4}>右</Option>
            </Select>
          </Form.Item>
        </Col>
      </Form>
    )
  },[]);

  const renderIconForm = useMemo(()=>{
    return (
      <Form onValuesChange={handleValuesChange} form={form}>
        <Col span={24}>
          <Form.Item label="字体图标" name="icon">
            <IconChoice/>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="图标大小" name="iconSize">
            <InputNumber />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="图标颜色" name="iconColor">
            <ColorPicker />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="对齐方式" name="dash">
            <Select style={{ width: '95%' }}>
              <Option value={0}>居中</Option>
              <Option value={1}>上</Option>
              <Option value={2}>下</Option>
              <Option value={3}>左</Option>
              <Option value={4}>右</Option>
              <Option value={4}>右</Option>
            </Select>
          </Form.Item>
        </Col>
      </Form>
    )
  },[iconColor,icon,iconSize])

  /**
   * 渲染元素本身数据
   */

  const renderDataForm = useMemo(() => {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 }
    };
    return (
      <Form {...formItemLayout} form={form} onValuesChange={handleValuesChange}>
        <Col>
          <Form.Item label="ID">
            <span className="ant-form-text">
              <Tag color="#f50">{id}</Tag>
            </span>
          </Form.Item>
        </Col>
      </Form>
    );
  }, [id]);

  /**
   * 渲染元素额外数据
   */

  const renderExtraDataForm = () => {
    let value = extraFields;
    if (data.node.data && data.node.data.echarts) {
      value = data.node.data.echarts.option.seriesFunction;
    }


    return (
      <Form form={form} onValuesChange={handleValuesChange}>
        <Col>
          <Form.Item label="自定义数据字段" data="">
            <TextArea rows={30} disabled={!(data.node.data && data.node.data.echarts)} />
          </Form.Item>
        </Col>
      </Form>
    );
  };

  const renderReactComponent = useMemo(() => {
    return (
      <ReactComponent
        onUpdateComponentProps={(value) => onUpdateComponentProps(value)}
        data={data}
      />
    );
  }, [onUpdateComponentProps, data]);

  const renderHttpComponent = useMemo(() => {
    return <HttpComponent onUpdateHttpProps={(value) => onUpdateHttpProps(value)}  data={data.node?.data?.http || {}} />;
  }, [onUpdateHttpProps, data]);


  return (
    <div className="rightArea">
      <Tabs defaultActiveKey="1">
        <TabPane tab="外观" key="1" style={{ margin: 0 }}>
          <Collapse defaultActiveKey={['1']} accordion>
            <Panel header="位置和大小" key="1">
              {renderForm}
            </Panel>
            <Panel header="样式" key="2">
              {renderStyleForm}
            </Panel>
            <Panel header="文字" key="3">
              {renderFontForm}
            </Panel>
            <Panel header="图片" key="4">
              {renderImageForm}
            </Panel>
            <Panel header="图标" key="5">
              {renderIconForm}
            </Panel>
          </Collapse>
        </TabPane>
        <TabPane tab="数据" key="2" style={{ margin: 0 }}>
          <Collapse defaultActiveKey={['1', '2']}>
            <Panel header="本身数据" key="1">
              {renderDataForm}
            </Panel>
            <Panel header="自定义数据" key="2">
              {renderExtraDataForm()}
            </Panel>
          </Collapse>
        </TabPane>
        <TabPane tab="事件" key="3" style={{ margin: 0 }}>
          <EventComponent canvasData={data} onEventValueChange={onEventValueChange} />
        </TabPane>
        {/*<TabPane tab="动效" key="4" style={{ margin: 0 }}>*/}
        {/*  <AnimateComponent canvasData={data} />*/}
        {/*</TabPane>*/}
        {/*<TabPane tab="组件" key="5" style={{ margin: 0 }}>*/}
        {/*  {renderReactComponent}*/}
        {/*</TabPane>*/}
        {/*<TabPane tab="http" key="6" style={{ margin: 0 }}>*/}
        {/*  {renderHttpComponent}*/}
        {/*</TabPane>*/}
      </Tabs>
    </div>
  );
};



export default React.forwardRef(CanvasProps);
