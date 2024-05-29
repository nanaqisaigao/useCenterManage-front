import {GithubOutlined} from '@ant-design/icons';
import {DefaultFooter} from '@ant-design/pro-components';
import React from 'react';
import {YUQUE_LOGO} from "@/constant/logo";

const currentYear = new Date().getFullYear();

const LoginFooter: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
        padding: '0 0 88px 0',
      }}
      copyright={"登录注册的切换在右下角哦" + currentYear}
      links={[
        {
          key: 'yuquelocate',
          title: <span style={{marginRight: 50}}>
            {YUQUE_LOGO}
            语雀个人知识库，登录后可点击跳转
          </span>,
          href: '/user/login',
          blankTarget: true,
        },
        {
          key: 'githublocate',
          title: <><GithubOutlined/>github开源项目，登录后可点击跳转</>,
          href: '/user/login',
          blankTarget: true,
        },


      ]}
    />
  );
};

export default LoginFooter;
