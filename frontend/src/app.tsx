import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { DesktopOutlined, PieChartOutlined, UserOutlined, TableOutlined, BookOutlined } from '@ant-design/icons';
import { Layout, Menu, MenuProps, theme } from 'antd';
import Structure from './food_service/pages/structure/Structure';
import BookingList from './food_service/pages/booking_list/BookingList';
import Edit from './food_service/pages/edit/Edit';
import Create from './food_service/pages/create/Create';
import Payment from './payment/paymentx';
import Receipt from './receipt/receipt';

const { Sider, Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link to="/">Dashboard</Link>, '1', <PieChartOutlined />),
  getItem(<Link to="/room">Room</Link>, '2', <DesktopOutlined />),
  getItem(<Link to="/meeting-room">Meeting Room</Link>, '3'),
  getItem('Food', 'sub1', undefined, [
    getItem(<Link to="/food-service">Food Service</Link>, '4', <BookOutlined />),
    getItem(<Link to="/manage-data">Manage Data</Link>, '5', <TableOutlined />),
  ]),
  getItem(<Link to="/employee">Employee</Link>, '6', <UserOutlined />),
  getItem('payment', 'sub2', undefined, [
    getItem(<Link to="/payment">payment</Link>, '7', <BookOutlined />),
    getItem(<Link to="/receipt">receipt</Link>, '8', <TableOutlined />),
  ]),
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedBookingID, setSelectedBookingID] = useState<number | null>(null);

  const handleBookingSelect = (id: number) => {
    setSelectedBookingID(id);
  };
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <BrowserRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            defaultSelectedKeys={['1']}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout>
          <Content style={{ margin: '16px', padding: '16px', height: '100%' }}>
            <div
              style={{
                height: '100%',
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Routes>
                <Route path="/" element={<h2>Dashboard Content</h2>} />
                <Route path="/room" element={<h2>Room Content</h2>} />
                <Route path="/meeting-room" element={<h2>Meeting Room Content</h2>} />
                <Route path="/food-service" element={<BookingList onBookingSelect={handleBookingSelect} />} />
                <Route path="/manage-data" element={<Edit />} />
                <Route path="/create-menu" element={<Create />} />
                <Route path="/employee" element={<h2>Employee Content</h2>} />
                <Route path="/payment" element={<Payment/>} />
                <Route path="/receipt" element={<Receipt/>} />
                <Route path="/structure/:bookingID" element={<Structure bookingID={selectedBookingID}/>} />
              </Routes>
            </div>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
