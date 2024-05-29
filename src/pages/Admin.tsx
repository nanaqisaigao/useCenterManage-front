import { HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import {PageContainer, PageHeader} from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Alert, Card, Typography } from 'antd';
import React from 'react';
import UserManage from "@/pages/Admin/UserManage";


const Admin: React.FC = () => {


  return (
    <PageContainer>
      <UserManage/>
    </PageContainer>
  );
};

export default Admin;
