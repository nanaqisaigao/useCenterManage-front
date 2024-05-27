import {GithubOutlined} from '@ant-design/icons';
import {DefaultFooter} from '@ant-design/pro-components';
import React from 'react';
import {YUQUE_LOGO} from "@/constant/logo";

const currentYear = new Date().getFullYear();

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
        padding: '0 0 130px 0',
      }}
      copyright={"piao的网站" + currentYear}
      links={[
        {
          key: 'yuquelocate',
          title: <span style={{marginRight: 50}}>
            {YUQUE_LOGO}
            语雀个人知识库，点击跳转
          </span>,
          href: 'https://www.yuque.com/u29061595',
          blankTarget: true,
        },
        {
          key: 'githublocate',
          title: <><GithubOutlined/>github开源项目，点击跳转</>,
          href: 'https://github.com/nanaqisaigao',
          blankTarget: true,
        },


      ]}
    />
  );
};

export default Footer;
