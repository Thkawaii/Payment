import { useState, useEffect } from "react";
import {
  Space,
  Button,
  Col,
  Row,
  Divider,
  Form,
  Card,
  message,
  Select,
  DatePicker,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { CustomersInterface } from "../../interfaces/ICustomer";
import { BookingInterface } from "../../interfaces/IBooking";
import {
  GetTypeRooms,
  GetRooms,
  CreateBooking,
  GetCustomers,
  UpdateRoom,
} from "../../services/https";
import { useNavigate } from "react-router-dom";
import { RoomTypesInterface } from "../../interfaces/IRoomTypes";
import { RoomInterface } from "../../interfaces/IRoom";
import moment from "moment";

const { Option } = Select;

function CustomerCreate() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [typerooms, setTypeRooms] = useState<RoomTypesInterface[]>([]);
  const [customers, setCustomers] = useState<CustomersInterface[]>([]);
  const [typeroom, setTypeRoom] = useState<number>();
  const [rooms, setRooms] = useState<RoomInterface[]>([]);
  const [selectRoom, setSelectRoom] = useState<number>();

  const onFinish = async (values: BookingInterface) => {
    const formattedValues: BookingInterface = {
      ...values,
      CheckIn: values.CheckIn ? moment(values.CheckIn).format("YYYY-MM-DD") : "",
      CheckOut: values.CheckOut ? moment(values.CheckOut).format("YYYY-MM-DD") : "",
    };
  
    const bookingData: BookingInterface = {
      CheckIn: values.CheckIn, 
      CheckOut: values.CheckOut,
      CustomerID: formattedValues.CustomerID,
      RoomID: formattedValues.RoomID,
    };
  
    const res = await CreateBooking(bookingData);
    console.log("CreateBooking", bookingData);
    console.log(res);
  
    if (res) {
      messageApi.open({
        type: "success",
        content: "บันทึกข้อมูลสำเร็จ",
      });
      form.resetFields();
      setTimeout(() => {
        navigate("/login/room");
      }, 2000);
    } else {
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาด !",
      });
    }
  
    // Fetch the selected room and update its status
    const selectedRoom = rooms.find((room) => room.ID === selectRoom);
    if (selectedRoom) {
      const roomUpdate: RoomInterface = {
        ...selectedRoom,
        Status: "Occupied", // Ensure this matches the type definition
      };
  
      console.log("roomUpdate = ", roomUpdate);
      const roomPatch = await UpdateRoom(roomUpdate);
      console.log("๊Update Successful: ", roomPatch);
    } else {
      console.error("Selected room not found");
    }
  };
  
  const getTypeRooms = async () => {
    const res = await GetTypeRooms();
    if (res) {
      setTypeRooms(res);
    }
  };

  const getCustomers = async () => {
    const res = await GetCustomers();
    console.log("Customers:", res);
    if (Array.isArray(res)) {
      setCustomers(res);
    } else {
      console.error("API response is not an array");
    }
  };

  const getRooms = async () => {
    const res = await GetRooms();
    if (res) {
      setRooms(res);
      console.log(res);
    }
  };

  useEffect(() => {
    getTypeRooms();
    getRooms();
    getCustomers();
  }, []);

  return (
    <div>
      {contextHolder}
      <Card>
        <h2>เพิ่มข้อมูลการจองห้อง</h2>
        <Divider />
        <Form
          form={form}
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={12}>
              <Form.Item
                name="CustomerID"
                label="ชื่อลูกค้า"
                rules={[{ required: true, message: "กรุณาเลือกชื่อลูกค้า !" }]}
              >
                <Select
                  allowClear
                  onChange={(value) => form.setFieldValue("CustomerID", value)}
                >
                  {customers.map((item) => (
                    <Option value={item.ID} key={item.Name}>
                      {item.Name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={12}>
              <Form.Item
                label="วัน/เดือน/ปี ที่เข้าที่พัก"
                name="CheckIn"
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={12}>
              <Form.Item 
                label="วัน/เดือน/ปี ที่ออก"
                name="CheckOut">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={12}>
              <Form.Item
                name="TypeRoomID"
                label="ประเภทห้อง"
                rules={[{ required: true, message: "กรุณาเลือกประเภทห้อง !" }]}
              >
                <Select
                  allowClear
                  onChange={(value) => setTypeRoom(value)}
                >
                  {typerooms.map((item) => (
                    <Option value={item.ID} key={item.Name}>
                      {item.Name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={24} md={24} lg={12}>
              <Form.Item
                name="TypeRoomID"
                label="ยอดที่ต้องชำระ"
                rules={[{ required: true, message: "ยอดที่ต้องชำระ !" }]}
              >
                <Select
                  allowClear
                  onChange={(value) => setTypeRoom(value)}
                >
                  {typerooms.map((item) => (
                    <Option value={item.ID} key={item.PricePerNight}>
                      {item.PricePerNight}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={12}>
              <Form.Item
                name="RoomID"
                label="หมายเลขห้อง"
                rules={[{ required: true, message: "กรุณาเลือกห้องที่ต้องการพัก !" }]}
              >
                <Select
                  allowClear
                  onChange={(value) => setSelectRoom(value)}
                >
                  {rooms
                    .filter((room) => room.RoomTypes?.ID === typeroom && room.Status == "Guest")/*จะแสดงค่าเฉพาะ status = Guest เท่านั้น*/
                    .map((item) => (
                      <Option value={item.ID} key={item.Address}>
                        {item.Address} {item.RoomTypes?.Description}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row justify="end">
            <Col>
              <Form.Item>
                <Space>
                  <Button htmlType="button">ยกเลิก</Button>
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
