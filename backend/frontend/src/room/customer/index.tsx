import React, { useState, useEffect } from "react";
import {
  Space,
  Button,
  Col,
  Row,
  Divider,
  Form,
  Input,
  Card,
  message,
  
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { CustomersInterface } from "../booking/interfaces/ICustomer";
import { CreateCustomer} from "../booking/services/https";
import { useNavigate } from "react-router-dom";



function CustomerCreate() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();  // Initialize the form instance



  const onFinish = async (values: CustomersInterface) => {
    let res = await CreateCustomer(values);
    
    console.log(res);
    if (res) {
      messageApi.open({
        type: "success",
        content: "บันทึกข้อมูลสำเร็จ",
      });
      form.resetFields();  // Reset form fields after success
      setTimeout(function () {
        
      }, 2000);
    } else {
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาด !",
      });
    }
  };

  


  



 

  useEffect(() => {
    
   
  }, []);

  return (
    <div>
      {contextHolder}
      <Card>
        <h2> เพิ่มข้อมูลลูกค้า</h2>
        <Divider />
        <Form
          form={form}  // Link the form instance
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="ชื่อจริง"
                name="Name"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกชื่อ !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="อีเมล"
                name="Email"
                rules={[
                  {
                    type: "email",
                    message: "รูปแบบอีเมลไม่ถูกต้อง !",
                  },
                  {
                    required: true,
                    message: "กรุณากรอกอีเมล !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="ที่อยู่"
                name="Address"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกที่อยู่ !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="เบอร์โทร"
                name="PhoneNumber"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกเบอร์โทรศัพท์ !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            

          </Row>

          <Row justify="end">
            <Col style={{ marginTop: "40px" }}>
              <Form.Item>
                <Space>
                  <Button htmlType="button" style={{ marginRight: "10px" }}>
                    ยกเลิก
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<PlusOutlined />}
                  >
                    ยืนยัน
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      
      </Card>
  </div>
  );
}

export default CustomerCreate;
